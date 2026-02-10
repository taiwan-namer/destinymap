import Link from 'next/link';
import { ArrowLeft, BookOpen, Calendar } from 'lucide-react';

const posts = [
  {
    slug: '2026-travel-fortune',
    title: '2026 紫微斗數全指南：選對方位讓您旺整年',
    excerpt: '從流年命宮到財帛宮，解析丙午年開運方位與旅行建議，搭配實用訂房平台讓旅程更順心。',
    date: '2026-01-15',
  },
  {
    slug: 'travel-tips',
    title: '如何結合星象與現代 AI，打造一場靈魂充電之旅？',
    excerpt: '當傳統紫微斗數遇上生成式 AI，如何用科技選對目的地、善用 Agoda 與 Booking.com 規劃開運旅行。',
    date: '2026-01-08',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
        <header className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-300 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            返回首頁
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight flex items-center gap-3">
            <BookOpen className="w-9 h-9 text-purple-400" />
            命理專欄
          </h1>
          <p className="mt-3 text-lg text-slate-300 leading-relaxed">
            紫微斗數 × 旅行開運的專業解析與實用建議
          </p>
        </header>

        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6 hover:border-purple-500/40 transition-colors group"
              >
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </div>
                <h2 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
