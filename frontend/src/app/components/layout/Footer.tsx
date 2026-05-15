import Link from 'next/link';

const quickLinks = [
  ['About Us', '/about'],
  ['Contact Us', '/contact'],
  ['Blogs', '#'],
  ['Offers', '/listings'],
  ['Privacy Policy', '#'],
  ['Terms of Use', '#'],
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a] mt-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">

        {/* Brand column */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex flex-col leading-none mb-3">
            <span className="text-[#ff4b2b] font-black text-3xl leading-none">
              <em className="not-italic font-black">n</em>
              <span className="text-white">ecterlabs</span>
            </span>
            <span className="text-[#9a9a9a] text-xs mt-0.5">India's Go Out App</span>
          </div>
          <p className="text-[#9a9a9a] text-sm leading-relaxed mb-4">Your gateway to unforgettable experiences.</p>
          <div className="flex items-center gap-3">
            {/* WhatsApp */}
            <a href="https://wa.me/917744836155" target="_blank" rel="noopener noreferrer" title="WhatsApp"
              className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center hover:opacity-90 transition-opacity">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88a9.9 9.9 0 0 1-4.721-1.204l-3.392.892.91-3.32A9.9 9.9 0 0 1 2.1 12C2.1 6.59 6.59 2.1 12 2.1c5.41 0 9.9 4.49 9.9 9.9s-4.49 9.9-9.9 9.9z"/>
              </svg>
            </a>
            {/* Gmail */}
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=necterlabs@gmail.com" target="_blank" rel="noopener noreferrer" title="Email"
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:opacity-90 transition-opacity">
              <svg width="17" height="13" viewBox="0 0 24 18" fill="none">
                <path d="M0 2.25C0 1.009 1.009 0 2.25 0h19.5C22.991 0 24 1.009 24 2.25v13.5C24 16.991 22.991 18 21.75 18H2.25C1.009 18 0 16.991 0 15.75V2.25z" fill="#fff"/>
                <path d="M0 2.25L12 11.25 24 2.25" stroke="#EA4335" strokeWidth="1.5" fill="none"/>
                <path d="M0 2.25v13.5L7.5 9 0 2.25z" fill="#4285F4"/>
                <path d="M24 2.25v13.5L16.5 9 24 2.25z" fill="#34A853"/>
                <path d="M0 15.75L7.5 9l4.5 3.375L16.5 9l7.5 6.75H0z" fill="#FBBC05"/>
                <path d="M0 2.25L12 11.25 24 2.25" stroke="#EA4335" strokeWidth="1.5" fill="none"/>
              </svg>
            </a>
            {/* Phone */}
            <a href="tel:+917744836155" title="Call Us"
              className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center hover:border-[#ff4b2b] transition-colors">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#9a9a9a">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-sm text-white mb-4">Quick Links</h4>
          <ul className="space-y-2.5">
            {quickLinks.map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="text-[#9a9a9a] text-sm hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Get the App + We Accept */}
        <div>
          <h4 className="font-bold text-sm text-white mb-4">Get the App</h4>
          <div className="flex flex-col gap-2 mb-6">
            {[
              { label: 'GET IT ON', sub: 'Google Play', icon: '▶' },
              { label: 'DOWNLOAD ON THE', sub: 'App Store', icon: '' },
            ].map(({ label, sub, icon }) => (
              <a key={sub} href="#"
                className="flex items-center gap-2 border border-[#2a2a2a] rounded-lg px-3 py-2 hover:border-[#ff4b2b] transition-colors w-fit">
                <span className="text-white text-lg">{icon || ''}</span>
                <div>
                  <div className="text-[9px] text-[#9a9a9a] uppercase tracking-wider">{label}</div>
                  <div className="text-white text-xs font-semibold">{sub}</div>
                </div>
              </a>
            ))}
          </div>
          <h4 className="font-bold text-sm text-white mb-3">We accept</h4>
          <div className="flex flex-wrap gap-2 items-center">
            {/* VISA */}
            <div className="bg-white rounded px-2 py-1 flex items-center">
              <svg height="12" viewBox="0 0 78 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="20" fontFamily="Arial" fontWeight="900" fontStyle="italic" fontSize="22" fill="#1A1F71">VISA</text>
              </svg>
            </div>
            {/* Mastercard */}
            <div className="flex items-center gap-0.5">
              <div className="w-6 h-6 rounded-full bg-[#EB001B] opacity-90" />
              <div className="w-6 h-6 rounded-full bg-[#F79E1B] opacity-90 -ml-3" />
            </div>
            {/* RuPay */}
            <div className="bg-[#1a3a8f] rounded px-2 py-1">
              <span className="text-white font-bold text-[10px] tracking-wide">RuPay</span>
            </div>
            {/* UPI */}
            <div className="bg-white rounded px-2 py-1 flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-[#097939]" />
              <span className="text-[#097939] font-black text-[10px] tracking-wide">UPI</span>
            </div>
          </div>
        </div>

        {/* Follow Us */}
        <div>
          <h4 className="font-bold text-sm text-white mb-4">Follow Us</h4>
          <div className="flex flex-wrap gap-2">
            {/* Instagram */}
            <a href="https://www.instagram.com/necter__labs?igsh=MTM5eGVqdXpubjlzNA==" target="_blank" rel="noopener noreferrer" title="Instagram"
              className="w-9 h-9 rounded-full flex items-center justify-center hover:opacity-85 transition-opacity"
              style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a href="https://www.facebook.com/share/1Hyoa8Kw6R/" target="_blank" rel="noopener noreferrer" title="Facebook"
              className="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center hover:opacity-85 transition-opacity">
              <svg width="10" height="18" viewBox="0 0 10 18" fill="white">
                <path d="M6.5 3H9V0H6.5C4.567 0 3 1.567 3 3.5V5H0V8H3v10h3V8h2.5L9 5H6V3.5C6 3.224 6.224 3 6.5 3z"/>
              </svg>
            </a>
            {/* YouTube */}
            <a href="#" title="YouTube"
              className="w-9 h-9 rounded-full bg-[#FF0000] flex items-center justify-center hover:opacity-85 transition-opacity">
              <svg width="18" height="13" viewBox="0 0 18 13" fill="white">
                <path d="M17.64 2.04A2.26 2.26 0 0 0 16.05.44C14.65 0 9 0 9 0S3.35 0 1.95.44A2.26 2.26 0 0 0 .36 2.04 23.66 23.66 0 0 0 0 6.5a23.66 23.66 0 0 0 .36 4.46 2.26 2.26 0 0 0 1.59 1.6C3.35 13 9 13 9 13s5.65 0 7.05-.44a2.26 2.26 0 0 0 1.59-1.6A23.66 23.66 0 0 0 18 6.5a23.66 23.66 0 0 0-.36-4.46zM7.2 9.25V3.75L11.88 6.5 7.2 9.25z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" title="LinkedIn"
              className="w-9 h-9 rounded-full bg-[#0A66C2] flex items-center justify-center hover:opacity-85 transition-opacity">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#1a1a1a] py-4 text-center text-xs text-[#9a9a9a]">
        © {new Date().getFullYear()} Necterlabs. All rights reserved.
      </div>
    </footer>
  );
}
