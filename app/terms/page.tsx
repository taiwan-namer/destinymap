import Link from 'next/link';
import { ArrowLeft, Scale, AlertTriangle } from 'lucide-react';

export default function TermsPage() {
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
          <div className="flex items-center gap-3 mb-2">
            <Scale className="w-8 h-8 text-purple-400 shrink-0" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              服務條款 (Terms of Service)
            </h1>
          </div>
          <p className="text-slate-400 text-sm">最後更新日期：2026 年 2 月 10 日</p>
        </header>

        <article className="space-y-8 text-slate-300 leading-relaxed">
          <p>
            歡迎使用 DestinyMap（以下簡稱「本服務」）。本服務由 DestinyMap 團隊（以下簡稱「我們」）運營。在使用本網站之前，請務必仔細閱讀以下條款。當您開始使用本服務，即代表您已完全同意並接受本條款之所有內容。
          </p>

          <hr className="border-slate-800" />

          {/* 1. 服務性質與免責聲明 */}
          <section>
            <h2 className="text-xl font-semibold text-purple-300 mb-4">1. 服務性質與免責聲明 (重要)</h2>
            <div className="flex gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-200 mb-1">重要免責聲明</p>
                <p className="text-slate-300">本服務僅供娛樂與參考，不構成專業建議。依賴本服務資訊所做之決策，責任由使用者自行承擔。</p>
              </div>
            </div>
            <h3 className="text-base font-medium text-slate-200 mt-4 mb-2">1.1 僅供娛樂與參考</h3>
            <p className="mb-4">
              DestinyMap 是一個結合紫微斗數與生成式 AI 技術的實驗性專案。所有的運算結果、命盤解析與旅遊建議，<strong className="text-white">僅供娛樂與參考用途</strong>。
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 mb-4">
              <li><strong className="text-slate-200">非專業建議：</strong>本服務不構成任何形式的心理諮商、醫療診斷、法律意見或財務投資建議。</li>
              <li><strong className="text-slate-200">決策責任：</strong>您應自行判斷資訊的準確性。對於因依賴本服務資訊而做出的任何決定（如：投資失利、感情決策、旅遊行程變更），我們概不負責。</li>
            </ul>
            <h3 className="text-base font-medium text-slate-200 mt-4 mb-2">1.2 AI 生成內容的不確定性</h3>
            <p>
              本服務使用大型語言模型（LLM）進行即時推算。由於生成式 AI 的特性，即使是相同的輸入資料，每次生成的文字描述可能會有所不同。我們不保證內容的絕對準確性、完整性或即時性。
            </p>
          </section>

          <hr className="border-slate-800" />

          {/* 2. 聯盟行銷與第三方連結 */}
          <section>
            <h2 className="text-xl font-semibold text-purple-300 mb-4">2. 聯盟行銷與第三方連結</h2>
            <h3 className="text-base font-medium text-slate-200 mt-4 mb-2">2.1 外部連結</h3>
            <p className="mb-4">
              本服務可能會推薦第三方旅遊平台（如 Agoda, Klook 等）的產品或服務。當您點擊這些連結並進行預訂時，我們可能會獲得少許佣金（Affiliate Commission）。
            </p>
            <h3 className="text-base font-medium text-slate-200 mt-4 mb-2">2.2 交易責任</h3>
            <p className="mb-2">
              <strong className="text-white">本服務並非旅遊代理商。</strong> 您透過本服務連結所進行的所有交易（如訂房、買機票），其契約關係僅存在於「您」與「第三方平台」之間。
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>若發生訂單糾紛（如：扣款錯誤、飯店超賣、行程取消），請直接聯繫該第三方平台客服。DestinyMap 無權也無法介入處理任何交易糾紛。</li>
            </ul>
          </section>

          <hr className="border-slate-800" />

          {/* 3. 使用者行為規範 */}
          <section>
            <h2 className="text-xl font-semibold text-purple-300 mb-4">3. 使用者行為規範</h2>
            <p className="mb-4">您同意在使用本服務時遵守以下規範：</p>
            <ol className="list-decimal list-inside space-y-2 pl-2">
              <li><strong className="text-slate-200">禁止惡意攻擊：</strong>不得對本網站進行 DDoS 攻擊、SQL 注入或任何破壞系統安全的行為。</li>
              <li><strong className="text-slate-200">禁止自動化抓取：</strong>未經授權，不得使用爬蟲 (Crawler) 或腳本大量抓取本站內容。</li>
              <li><strong className="text-slate-200">尊重智慧財產：</strong>本站的 UI 設計、Logo、AI 提示詞工程 (Prompt Engineering) 均受智慧財產權法保護。</li>
            </ol>
          </section>

          <hr className="border-slate-800" />

          {/* 4. 服務變更與終止 */}
          <section>
            <h2 className="text-xl font-semibold text-purple-300 mb-4">4. 服務變更與終止</h2>
            <p>
              我們保留隨時修改、暫停或終止本服務部分或全部功能的權利，恕不另行通知。我們不對任何因服務中斷而造成的損失負責。
            </p>
          </section>

          <hr className="border-slate-800" />

          {/* 5. 隱私權保護 */}
          <section>
            <h2 className="text-xl font-semibold text-purple-300 mb-4">5. 隱私權保護</h2>
            <p>
              您的個人資料使用方式受我們的 <Link href="/privacy" className="text-purple-300 hover:text-purple-200 underline">隱私權政策</Link> 規範。我們承諾採用「無痕運算」，不儲存您的出生資料。
            </p>
          </section>

          <hr className="border-slate-800" />

          {/* 6. 準據法與管轄權 */}
          <section>
            <h2 className="text-xl font-semibold text-purple-300 mb-4">6. 準據法與管轄權</h2>
            <p>
              本服務條款之解釋與適用，以及與本服務條款有關的爭議，均應依照 <strong className="text-white">中華民國 (台灣)</strong> 法律為準據法。若有訴訟之必要，雙方同意以台灣台北地方法院為第一審管轄法院。
            </p>
          </section>

          <hr className="border-slate-800" />

          {/* 7. 聯絡我們 */}
          <section>
            <h2 className="text-xl font-semibold text-purple-300 mb-4">7. 聯絡我們</h2>
            <p className="mb-2">若您對本服務條款有任何疑問，請聯繫我們：</p>
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
