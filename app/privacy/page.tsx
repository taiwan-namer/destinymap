import Link from 'next/link';
import { ArrowLeft, Shield, Lock } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
        <header className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-300 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            返回首頁
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            隱私權政策 (Privacy Policy)
          </h1>
          <p className="mt-2 text-slate-400 text-sm">最後更新日期：2026 年 2 月 10 日</p>
        </header>

        <article className="space-y-8 text-slate-300 leading-relaxed">
          <p>
            歡迎使用 DestinyMap（以下簡稱「本網站」）。我們非常重視您的隱私權。本隱私權政策旨在說明我們如何收集、使用及保護您的個人資訊。請您詳細閱讀以下內容。
          </p>

          <hr className="border-slate-800" />

          {/* 1. 核心承諾 */}
          <section>
            <h2 className="text-xl font-semibold text-purple-300 mb-4">1. 核心承諾：無痕運算與資料不落地</h2>
            <div className="flex gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 mb-4">
              <Lock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-emerald-200 mb-1">重點聲明</p>
                <p className="text-slate-300">我們不建立任何資料庫儲存您的命理資料；運算完成後輸入與結果自伺服器永久刪除。</p>
              </div>
            </div>
            <p className="mb-4">
              我們深知「生辰八字」屬於高度敏感的個人資訊。因此，本網站採用 <strong className="text-white">「無痕運算 (Stateless Computing)」</strong> 架構。
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong className="text-slate-200">即時分析：</strong>當您輸入姓名、出生日期與時間後，這些資料僅會暫存於伺服器的隨機存取記憶體 (RAM) 中，用於當下的 AI 命盤推算。</li>
              <li><strong className="text-slate-200">算後即焚：</strong>一旦運算完成並將結果回傳給您的瀏覽器，或者是您關閉/重新整理了網頁，您的所有輸入資料與運算結果將從我們的伺服器中<strong className="text-white">永久刪除</strong>。</li>
              <li><strong className="text-slate-200">零資料庫：</strong>我們<strong className="text-white">沒有</strong>建立任何資料庫來儲存您的個人命理資料。</li>
            </ul>
          </section>

          <hr className="border-slate-800" />

          {/* 2. 我們收集的資訊 */}
          <section>
            <h2 className="text-xl font-semibold text-purple-300 mb-4">2. 我們收集的資訊</h2>
            <p className="mb-4">
              雖然我們不儲存您的命理資料，但在網站運作過程中，我們可能會收集以下非識別性資訊：
            </p>
            <h3 className="text-base font-medium text-slate-200 mt-4 mb-2">2.1 主動提供的資訊 (暫時性)</h3>
            <ul className="list-disc list-inside space-y-1 pl-2 mb-4">
              <li>出生年、月、日、時</li>
              <li>性別</li>
              <li>姓名（僅用於報告顯示，您可以使用暱稱）</li>
            </ul>
            <h3 className="text-base font-medium text-slate-200 mt-4 mb-2">2.2 自動收集的技術資訊</h3>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li><strong className="text-slate-200">Log 紀錄：</strong>包含 IP 位址、瀏覽器類型、造訪時間等（用於網站安全防護與流量分析）。</li>
              <li><strong className="text-slate-200">Cookies：</strong>用於記住您的偏好設定（如顯示語言），以及聯盟行銷追蹤。</li>
            </ul>
          </section>

          <hr className="border-slate-800" />

          {/* 3. 資料的使用方式 */}
          <section>
            <h2 className="text-xl font-semibold text-purple-300 mb-4">3. 資料的使用方式 (AI 與第三方)</h2>
            <h3 className="text-base font-medium text-slate-200 mt-4 mb-2">3.1 AI 運算模型</h3>
            <p className="mb-4">
              為了提供精準的紫微斗數分析，我們會將您輸入的「生辰數據」經過去識別化處理後，透過加密通道傳輸至我們的 AI 合作夥伴（DeepSeek LLM）進行推算。
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 mb-4">
              <li>我們僅傳送「生成報告」所需的必要參數。</li>
              <li>AI 模型僅負責運算，不會將您的個人資料用於模型訓練或其他用途。</li>
            </ul>
            <h3 className="text-base font-medium text-slate-200 mt-4 mb-2">3.2 聯盟行銷 (Affiliate Disclosure)</h3>
            <p className="mb-2">
              本網站參與了多個旅遊平台的聯盟行銷計畫（包括但不限於 Agoda, Klook, Trip.com）。
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li><strong className="text-slate-200">追蹤連結：</strong>當您點擊本網站的推薦連結前往第三方平台時，會在您的瀏覽器中置入一個追蹤 Cookie。</li>
              <li><strong className="text-slate-200">用途：</strong>此 Cookie 僅用於確認該筆訂單來自 DestinyMap 的推薦，以便合作平台向我們支付微薄的介紹費。這<strong className="text-white">不會</strong>增加您的訂單金額，也不會洩露您的個人個資給第三方。</li>
            </ul>
          </section>

          <hr className="border-slate-800" />

          {/* 4. Cookie 政策 */}
          <section>
            <h2 className="text-xl font-semibold text-purple-300 mb-4">4. Cookie 政策</h2>
            <p>
              我們使用 Cookies 來提升您的瀏覽體驗。您可以透過瀏覽器設定拒絕 Cookies，但這可能會導致部分功能（如聯盟連結追蹤或偏好設定）無法正常運作。
            </p>
          </section>

          <hr className="border-slate-800" />

          {/* 5. 資訊安全 */}
          <section>
            <h2 className="text-xl font-semibold text-purple-300 mb-4">5. 資訊安全</h2>
            <div className="flex gap-3 p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
              <Shield className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <p>
                本網站全站採用 <strong className="text-white">SSL (Secure Socket Layer)</strong> 加密技術傳輸資料。即使資料在傳輸過程中被攔截，駭客也無法解讀您的輸入內容。
              </p>
            </div>
          </section>

          <hr className="border-slate-800" />

          {/* 6. 政策修訂 */}
          <section>
            <h2 className="text-xl font-semibold text-purple-300 mb-4">6. 政策修訂</h2>
            <p>
              本網站保留隨時修改本隱私權政策的權利。修改後的條款將刊登於本網站上，不另行個別通知。建議您定期查看本頁面以確保了解最新的隱私保護措施。
            </p>
          </section>

          <hr className="border-slate-800" />

          {/* 7. 聯絡我們 */}
          <section>
            <h2 className="text-xl font-semibold text-purple-300 mb-4">7. 聯絡我們</h2>
            <p className="mb-2">
              若您對本隱私權政策有任何疑問，或對您的資料處理方式有任何顧慮，請透過以下方式聯繫我們：
            </p>
            <p>
              <strong className="text-slate-200">Email:</strong>{' '}
              <a href="mailto:t26647250@gmail.com" className="text-purple-300 hover:text-purple-200 underline">
                t26647250@gmail.com
              </a>
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
