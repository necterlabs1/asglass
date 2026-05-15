const REASONS = [
  {
    label: 'Secure Checkout',
    svg: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ff4b2b" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: 'Zero Convenience Fees',
    svg: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ff4b2b" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M6 12h12M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2 .9 2 2-.9 2-2 2"/>
        <line x1="4" y1="4" x2="20" y2="20"/>
      </svg>
    ),
  },
  {
    label: 'Official Ticket Seller',
    svg: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ff4b2b" strokeWidth="1.5">
        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"/>
        <path d="M13 5v14"/>
      </svg>
    ),
  },
  {
    label: '24/7 Customer Service',
    svg: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ff4b2b" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 5.91 5.91l.82-.82a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        <text x="11" y="8" fontSize="5" fill="#ff4b2b" stroke="none" fontWeight="bold">24</text>
      </svg>
    ),
  },
  {
    label: 'Hassle-Free QR Entry',
    svg: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ff4b2b" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
        <path d="M14 14h.01M14 17h.01M17 14h.01M17 17h.01M20 14h.01M20 17h.01M20 20h.01"/>
      </svg>
    ),
  },
];

export default function WhyBurraa() {
  return (
    <section className="mt-12 mb-6 max-w-screen-xl mx-auto px-4 sm:px-6">
      <h2 className="text-center text-xl sm:text-2xl font-bold text-white mb-8">Why Necterlabs?</h2>
      <div className="flex justify-center gap-6 sm:gap-10 flex-wrap">
        {REASONS.map(({ label, svg }) => (
          <div key={label} className="flex flex-col items-center gap-2 w-16 sm:w-20">
            {svg}
            <p className="text-[#9a9a9a] text-xs text-center leading-tight">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
