// app/api/city-image/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // 確保用 Node 跑（不要 edge）

const CITY_MAPPING: Record<string, string> = {
  "西安": "Xi'an",
  "杭州": "Hangzhou",
  "蘇黎世": "Zurich",
  "維也納": "Vienna",
  "京都": "Kyoto",
  "大阪": "Osaka",
  "東京": "Tokyo",
  "溫哥華": "Vancouver",
  "巴黎": "Paris",
  "倫敦": "London",
  "紐約": "New York",
  "曼谷": "Bangkok",
  "清邁": "Chiang Mai",
  "首爾": "Seoul",
  "成都": "Chengdu",
  "重慶": "Chongqing",
  "台北": "Taipei",
  "香港": "Hong Kong",
  "澳門": "Macau",
  "新加坡": "Singapore",
  "羅馬": "Rome",
  "米蘭": "Milan",
  "巴塞隆納": "Barcelona",
  "柏林": "Berlin",
  "慕尼黑": "Munich",
  "阿姆斯特丹": "Amsterdam",
  "布拉格": "Prague"
};

async function fetchCityQid(cityName: string): Promise<string | null> {
  const candidates = [cityName, CITY_MAPPING[cityName]].filter(Boolean) as string[];

  for (const term of candidates) {
    const url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(
      term
    )}&language=zh&format=json&origin=*`;

    const res = await fetch(url, {
      headers: {
        // 伺服器端可以加 UA，Wikidata/Query service 比較不會擋
        "User-Agent": "CityImageBot/1.0 (Next.js; contact: you@example.com)"
      }
    });

    if (!res.ok) continue;
    const data = await res.json();
    const first = data?.search?.[0];
    if (first?.id) return first.id; // e.g. Q34647
  }
  return null;
}

async function fetchAttractionImageUrls(cityQid: string): Promise<string[]> {
  const sparql = `
SELECT ?image WHERE {
  VALUES ?city { wd:${cityQid} }
  ?item wdt:P18 ?image .
  {
    ?item wdt:P131* ?city .
  } UNION {
    ?item wdt:P276 ?city .
  }
  {
    ?item wdt:P31/wdt:P279* wd:Q570116 .
  } UNION {
    ?item wdt:P31/wdt:P279* wd:Q33506 .
  } UNION {
    ?item wdt:P31/wdt:P279* wd:Q24398318 .
  } UNION {
    ?item wdt:P31/wdt:P279* wd:Q41176 .
  } UNION {
    ?item wdt:P31/wdt:P279* wd:Q22698 .
  } UNION {
    ?item wdt:P31/wdt:P279* wd:Q9259 .
  }
}
LIMIT 50`;

  const endpoint = `https://query.wikidata.org/sparql?format=json&query=${encodeURIComponent(sparql)}`;

  const res = await fetch(endpoint, {
    headers: {
      "Accept": "application/sparql-results+json",
      "User-Agent": "CityImageBot/1.0 (Next.js; contact: you@example.com)"
    }
  });

  if (!res.ok) return [];
  const data = await res.json();
  const bindings = data?.results?.bindings ?? [];

  const urls = bindings
    .map((b: any) => b?.image?.value)
    .filter((u: any) => typeof u === "string");

  return Array.from(new Set(urls));
}

async function commonsPickWideImage(urls: string[]): Promise<string | null> {
  const sample = urls.length > 10 ? urls.slice(0, 10) : urls;

  for (const url of sample) {
    const match = url.match(/Special:FilePath\/(.+)$/);
    if (!match) continue;

    const filename = decodeURIComponent(match[1]);
    const title = `File:${filename}`;

    const api = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(
      title
    )}&prop=imageinfo&iiprop=url|dimensions&format=json&origin=*`;

    const res = await fetch(api, {
      headers: { "User-Agent": "CityImageBot/1.0 (Next.js; contact: you@example.com)" }
    });
    if (!res.ok) continue;

    const data = await res.json();
    const pages = data?.query?.pages;
    if (!pages) continue;

    const page = Object.values(pages)[0] as any;
    const info = page?.imageinfo?.[0];
    const w = info?.width ?? 0;
    const h = info?.height ?? 0;
    const direct = info?.url as string | undefined;

    if (!direct) continue;
    if (w >= 900 && w > h * 1.25) return direct;
  }

  return urls[0] ?? null;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city")?.trim();

  if (!city) {
    return NextResponse.json({ ok: false, error: "Missing city" }, { status: 400 });
  }

  try {
    const qid = await fetchCityQid(city);
    if (!qid) {
      return NextResponse.json({ ok: false, error: "No city QID" }, { status: 404 });
    }

    const urls = await fetchAttractionImageUrls(qid);
    if (!urls.length) {
      return NextResponse.json({ ok: false, error: "No attraction images" }, { status: 404 });
    }

    const picked = await commonsPickWideImage(urls);
    if (!picked) {
      return NextResponse.json({ ok: false, error: "No usable image" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, imageUrl: picked });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: "Server error", detail: String(e?.message ?? e) },
      { status: 500 }
    );
  }
}
