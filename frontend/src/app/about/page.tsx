export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-extrabold mb-4">About <span className="text-[#ff6b6b]">necterlabs</span></h1>
      <p className="text-[#9a9a9a] text-lg leading-relaxed mb-8">
        necterlabs is India&apos;s premier adventure and luxury travel booking platform, helping thrill-seekers and leisure travellers discover the best experiences in Goa and beyond.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {[
          { icon: '🎯', title: 'Our Mission', desc: 'To make premium travel experiences accessible to everyone, with transparent pricing and zero hidden fees.' },
          { icon: '🌍', title: 'Our Vision', desc: 'Become India\'s most trusted go-out platform, connecting adventurers with verified, high-quality experiences.' },
          { icon: '🤝', title: 'Our Partners', desc: 'We work with verified, licensed operators who maintain the highest safety standards for all activities.' },
          { icon: '📍', title: 'Where We Operate', desc: 'Currently available across Goa — North Goa, South Goa, Mandovi River, and surrounding areas.' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="glass rounded-2xl p-6">
            <div className="text-3xl mb-3">{icon}</div>
            <h3 className="font-bold text-base mb-2">{title}</h3>
            <p className="text-[#9a9a9a] text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to explore?</h2>
        <p className="text-[#9a9a9a] mb-5">Browse our collection of premium experiences in Goa.</p>
        <a href="/listings" className="inline-block bg-[#ff6b6b] hover:bg-[#ff4757] text-white font-semibold px-8 py-3 rounded-xl transition-colors">
          View All Activities
        </a>
      </div>
    </div>
  );
}
