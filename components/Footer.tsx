import Link from 'next/link';

const footerLinks = [
  { label: '關於我們', href: '/about', en: 'About Us' },
  { label: '聯絡我們', href: '/contact', en: 'Contact Us' },
  { label: '隱私權政策', href: '/privacy', en: 'Privacy Policy' },
  { label: '服務條款', href: '/terms', en: 'Terms of Service' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80">
      <div className="container mx-auto px-4 py-8 md:py-10">
        {/* 連結區：手機垂直、桌機多欄 */}
        <div className="flex flex-col md:flex-row md:flex-wrap md:items-center md:justify-between gap-6 md:gap-8 mb-6">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start">
            {footerLinks.map((item) => (
              <Link
                key={item.en}
                href={item.href}
                className="text-sm text-slate-400 hover:text-purple-300 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* 聯盟行銷聲明：較小灰色字體 */}
        <p className="text-xs text-slate-500 max-w-3xl leading-relaxed mb-4">
          【聯盟行銷聲明】本網站包含策略合作夥伴（如 Agoda, Booking.com, Trip.com）的推廣連結。當您透過本站連結預訂時，我們可能會獲得微薄分潤以維持運作，這絕不會影響您的訂單價格。詳情請參閱<Link href="/privacy" className="text-slate-400 hover:text-purple-300 underline">隱私權政策</Link>。
        </p>

        {/* 版權宣告 */}
        <p className="text-xs text-slate-500">
          Copyright © 2026 DestinyMap. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
