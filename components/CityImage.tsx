'use client';

import { useState, useEffect } from 'react';
import { Loader2, ImageOff } from 'lucide-react';

// 📖 1. 超級字典：把所有可能的城市都對應到英文維基百科的「準確條目名」
const CITY_MAPPING: Record<string, string> = {
  // 日本
  "東京": "Tokyo", "大阪": "Osaka", "京都": "Kyoto", "北海道": "Hokkaido", "札幌": "Sapporo", "沖繩": "Okinawa",
  "福岡": "Fukuoka", "名古屋": "Nagoya", "奈良": "Nara Japan", "神戶": "Kobe", "箱根": "Hakone", "廣島": "Hiroshima", "金澤": "Kanazawa",
  // 韓國
  "首爾": "Seoul", "釜山": "Busan", "濟州": "Jeju", "仁川": "Incheon", "大邱": "Daegu", "慶州": "Gyeongju",
  // 中國
  "北京": "Beijing", "上海": "Shanghai", "成都": "Chengdu", "杭州": "Hangzhou", "西安": "Xi'an", "重慶": "Chongqing", "青島": "Qingdao",
  "廣州": "Guangzhou", "深圳": "Shenzhen", "三亞": "Sanya", "麗江": "Lijiang", "桂林": "Guilin", "廈門": "Xiamen",
  // 港澳
  "香港": "Hong Kong", "香港/銅鑼灣": "Causeway Bay Hong Kong", "香港/尖沙咀": "Tsim Sha Tsui Hong Kong", "香港/中環": "Central Hong Kong",
  "澳門": "Macau", "台北": "Taipei", "高雄": "Kaohsiung", "銅鑼灣": "Causeway Bay Hong Kong", "濱海灣區": "Marina Bay Singapore",
  // 東南亞
  "曼谷": "Bangkok", "清邁": "Chiang Mai", "普吉島": "Phuket", "芭達雅": "Pattaya", "甲米": "Krabi", "蘇梅島": "Ko Samui",
  "河內": "Hanoi", "峴港": "Da Nang", "胡志明市": "Ho Chi Minh City", "會安": "Hoi An", "芽莊": "Nha Trang", "下龍灣": "Ha Long Bay",
  "吉隆坡": "Kuala Lumpur", "檳城": "George Town Penang", "馬六甲": "Malacca", "亞庇": "Kota Kinabalu",
  "新加坡": "Singapore", "新加坡/濱海灣區": "Marina Bay Singapore", "新加坡/牛車水": "Chinatown Singapore", "新加坡/聖淘沙": "Sentosa Singapore",
  "馬尼拉": "Manila", "宿霧": "Cebu City", "長灘島": "Boracay",
  // 歐洲
  "倫敦": "London", "愛丁堡": "Edinburgh", "曼徹斯特": "Manchester",
  "巴黎": "Paris", "尼斯": "Nice France", "里昂": "Lyon", "羅馬": "Rome", "威尼斯": "Venice", "佛羅倫斯": "Florence", "米蘭": "Milan",
  "蘇黎世": "Zurich", "琉森": "Lucerne", "日內瓦": "Geneva", "因特拉肯": "Interlaken",
  "柏林": "Berlin", "慕尼黑": "Munich", "法蘭克福": "Frankfurt",
  "巴塞隆納": "Barcelona", "馬德里": "Madrid", "阿姆斯特丹": "Amsterdam", "維也納": "Vienna",
  // 美洲／澳洲
  "紐約": "New York City", "洛杉磯": "Los Angeles", "舊金山": "San Francisco",
  "拉斯維加斯": "Las Vegas", "西雅圖": "Seattle", "芝加哥": "Chicago", "奧蘭多": "Orlando", "檀香山": "Honolulu", "波士頓": "Boston",
  "溫哥華": "Vancouver", "多倫多": "Toronto", "雪梨": "Sydney", "墨爾本": "Melbourne", "黃金海岸": "Gold Coast Queensland", "布里斯本": "Brisbane",
};

// ❄️ 特定城市用固定圖片（例如維基封面是地圖時，改用更符合情境的圖）
const CUSTOM_IMAGES: Record<string, string> = {
  "北海道": "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1000&auto=format&fit=crop", // 北海道雪景
  "沖繩": "https://images.unsplash.com/photo-1590559899731-a382839e5549?q=80&w=1000&auto=format&fit=crop", // 沖繩海景
};

// 🏞️ 2. 多樣化保底圖庫 (不再只有一張紅色峽谷)
// 如果真的抓不到，會從這裡隨機挑一張，至少不會覺得重複
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1000&auto=format&fit=crop", // 城市
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop", // 旅行
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1000&auto=format&fit=crop", // 自然
  "https://images.unsplash.com/photo-1449824913929-4bdd42b00ade?q=80&w=1000&auto=format&fit=crop"  // 建築
];

export default function CityImage({ city }: { city: string }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchImage = async () => {
      try {
        setLoading(true);

        // 步驟 0: 若有指定自訂圖（如北海道雪景），直接使用
        const customUrl = CUSTOM_IMAGES[city];
        if (customUrl) {
          if (isMounted) {
            setImageUrl(customUrl);
            setLoading(false);
          }
          return;
        }
        
        // 步驟 A: 查字典，拿到準確的英文條目名
        // 如果字典沒有，就用原名碰碰運氣
        const wikiTitle = CITY_MAPPING[city] || city;
        
        // 步驟 B: 直接呼叫英文維基百科的 "PageImages" API
        // 這是最穩定的方法，直接拿條目的「封面圖」
        // titles: 條目名稱
        // pithumbsize: 圖片大小 (1000px)
        const endpoint = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(wikiTitle)}&prop=pageimages&format=json&pithumbsize=1000&origin=*`;

        const res = await fetch(endpoint);
        const data = await res.json();
        const pages = data.query?.pages;

        if (pages) {
          // Wiki API 回傳的 key 是 pageId (例如 "12345")，我們不知道是多少，所以用 Object.values 取第一個
          const page: any = Object.values(pages)[0];
          
          if (page && page.thumbnail && page.thumbnail.source) {
            if (isMounted) {
              setImageUrl(page.thumbnail.source);
              setLoading(false);
              return; // 成功！結束！
            }
          }
        }

        // 步驟 C: 如果英文維基沒找到，試試看中文維基 (針對字典裡沒有的小城市)
        const zhEndpoint = `https://zh.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(city)}&prop=pageimages&format=json&pithumbsize=1000&origin=*`;
        const zhRes = await fetch(zhEndpoint);
        const zhData = await zhRes.json();
        const zhPages = zhData.query?.pages;
        
        if (zhPages) {
           const page: any = Object.values(zhPages)[0];
           if (page && page.thumbnail && page.thumbnail.source) {
             if (isMounted) {
               setImageUrl(page.thumbnail.source);
               setLoading(false);
               return;
             }
           }
        }
        
        // 步驟 D: 真的都沒圖，隨機選一張漂亮的保底圖
        if (isMounted) {
           const randomFallback = FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)];
           setImageUrl(randomFallback);
           setLoading(false);
        }

      } catch (e) {
        // 發生錯誤，也用隨機保底
        if (isMounted) {
            const randomFallback = FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)];
            setImageUrl(randomFallback);
            setLoading(false);
        }
      }
    };

    if (city) fetchImage();

    return () => { isMounted = false; };
  }, [city]);

  return (
    <div className="w-full h-full bg-slate-800 relative overflow-hidden group">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 z-10">
          <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
        </div>
      )}
      
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={city}
          className={`w-full h-full object-cover transition-all duration-1000 ${
            loading ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
          } group-hover:scale-110`}
          onLoad={() => setLoading(false)}
          onError={(e) => {
            // 萬一圖片連結失效，立刻換成保底
            (e.target as HTMLImageElement).src = FALLBACK_IMAGES[0];
          }}
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-slate-500">
          <ImageOff className="w-8 h-8 opacity-50" />
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none" />
    </div>
  );
}