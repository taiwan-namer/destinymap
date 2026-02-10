import Link from 'next/link';
import { ArrowLeft, Brain, Globe, Shield } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
        <header className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-300 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            返回首頁
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            DestinyMap - 您的 AI 運勢導航系統
          </h1>
        </header>

        <div className="space-y-8">
          <section className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-4">
              核心理念：當紫微斗數遇見生成式 AI
            </h2>
            <p className="text-slate-300 leading-relaxed">
              DestinyMap 致力於將傳統玄學進行「數位化轉型」。我們利用最新的 DeepSeek 大型語言模型，對複雜的紫微命盤進行結構化分析，將古老的智慧轉化為 2026 年的精準旅行建議。
            </p>
          </section>

          <section className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-5">
              為什麼選擇我們？
            </h2>
            <ul className="space-y-5">
              <li className="flex gap-4">
                <span className="shrink-0 w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-purple-400" />
                </span>
                <div>
                  <h3 className="font-semibold text-white mb-1">AI 深度解析</h3>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    摒棄傳統查表法，我們針對每個獨立命盤進行即時運算，解讀流年、命宮與福德宮的交互影響。
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="shrink-0 w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-purple-400" />
                </span>
                <div>
                  <h3 className="font-semibold text-white mb-1">全球圖資整合</h3>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    我們不只告訴您「往南方走」，而是將命理方位與真實世界地圖數據結合，提供具體的城市與國家建議。
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="shrink-0 w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-400" />
                </span>
                <div>
                  <h3 className="font-semibold text-white mb-1">隱私優先設計</h3>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    我們採用「無痕運算」技術。您的姓名與出生資料僅在運算當下使用，分析完成後即刻銷毀，絕不儲存於任何資料庫。
                  </p>
                </div>
              </li>
            </ul>
          </section>

          <section className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-4">
              關於收益
            </h2>
            <p className="text-slate-300 leading-relaxed">
              DestinyMap 是一個免費工具。為了維持伺服器與 AI API 的高昂營運成本，我們參與了部分旅遊平台 (如 Agoda, Klook) 的聯盟行銷計畫。這意味著當您透過我們的連結預訂時，我們可能會獲得少許分潤（對您完全免費）。感謝您的支持，讓我們能持續優化這項服務。
            </p>
          </section>

          <section className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-4">
              聯絡我們
            </h2>
            <p className="text-slate-300 leading-relaxed">
              若有任何建議或合作需求，歡迎來信：
              <a href="mailto:t26647250@gmail.com" className="text-purple-300 hover:text-purple-200 underline">
                t26647250@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
