import Link from 'next/link';
import { ArrowLeft, MessageSquare, Bug, Briefcase, HelpCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
        <header className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-300 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            返回首頁
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            聯絡我們 (Contact Us)
          </h1>
          <p className="mt-3 text-lg text-slate-300 leading-relaxed">
            我們聆聽您的聲音，無論是星辰的指引或是系統的建議。
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左欄：聯絡管道 */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-purple-300 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              聯絡管道
            </h2>

            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6">
              <div className="flex gap-3 mb-3">
                <span className="shrink-0 w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-purple-400" />
                </span>
                <div>
                  <h3 className="font-semibold text-white">使用者支援 & 建議</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mt-2">
                    如果您在使用 DestinyMap 時遇到問題，或者有希望增加的新功能（例如：想算流月運勢？），歡迎告訴我們。
                  </p>
                  <p className="text-slate-400 text-sm mt-3">
                    <span className="text-slate-500">Email:</span>{' '}
                    <a href="mailto:t26647250@gmail.com" className="text-purple-300 hover:text-purple-200 underline">
                      service@destinymap.com
                    </a>
                  </p>
                  <p className="text-slate-400 text-xs mt-1">主旨格式：[反饋] 您的問題簡述</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6">
              <div className="flex gap-3 mb-3">
                <span className="shrink-0 w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                  <Bug className="w-5 h-5 text-purple-400" />
                </span>
                <div>
                  <h3 className="font-semibold text-white">錯誤回報</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mt-2">
                    如果您發現 AI 產生了奇怪的結果，或是網頁發生錯誤，請截圖並寄給我們，這將幫助我們訓練更強大的模型。
                  </p>
                  <p className="text-slate-400 text-sm mt-3">
                    <span className="text-slate-500">Email:</span>{' '}
                    <a href="mailto:t26647250@gmail.com" className="text-purple-300 hover:text-purple-200 underline">
                      service@destinymap.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6">
              <div className="flex gap-3 mb-3">
                <span className="shrink-0 w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-purple-400" />
                </span>
                <div>
                  <h3 className="font-semibold text-white">商業合作</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mt-2">
                    DestinyMap 歡迎旅遊平台、旅宿業者或命理師進行跨界合作。
                  </p>
                  <p className="text-slate-400 text-sm mt-3">
                    <span className="text-slate-500">Email:</span>{' '}
                    <a href="mailto:t26647250@gmail.com" className="text-purple-300 hover:text-purple-200 underline">
                      service@destinymap.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 右欄：常見問題 */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-purple-300 flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              常見問題 (FAQ)
            </h2>

            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6 space-y-6">
              <div>
                <p className="font-medium text-white mb-2">
                  Q: 我的運算結果沒有儲存，還找得回來嗎？
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  A: 為了保護您的隱私，我們採用「無痕運算」。一旦您離開或重新整理頁面，所有的個人資料與運算結果都會被永久刪除。請務必在當下截圖保存。
                </p>
              </div>
              <div className="border-t border-slate-700/80 pt-5">
                <p className="font-medium text-white mb-2">
                  Q: 為什麼每次算的結果不太一樣？
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  A: 這正是生成式 AI (Generative AI) 的特性。雖然紫微斗數的星盤結構是固定的，但 AI 對於「運勢解讀」的文字生成會有微小的創意變化，這能提供您不同角度的啟發。
                </p>
              </div>
              <div className="border-t border-slate-700/80 pt-5">
                <p className="font-medium text-white mb-2">
                  Q: 推薦的地點是廣告嗎？
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  A: 我們的地點推薦是完全基於您的「紫微命盤方位」與「五行屬性」運算出來的。在您點擊訂房連結之前，我們不會進行任何商業導流，請放心參考。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
