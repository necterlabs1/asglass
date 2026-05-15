import InquiryForm from '../components/listings/InquiryForm';

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-extrabold mb-2">Get in <span className="text-[#ff6b6b]">Touch</span></h1>
      <p className="text-[#9a9a9a] mb-8">Have a question or need help planning your trip? We&apos;re here to help.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: '📧', label: 'Email', value: 'necterlabs@gmail.com' },
          { icon: '📞', label: 'Phone', value: '+91 77448 36155' },
          { icon: '📍', label: 'Location', value: 'Panaji, Goa' },
        ].map(({ icon, label, value }) => (
          <div key={label} className="glass rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">{icon}</div>
            <div className="text-xs text-[#9a9a9a]">{label}</div>
            <div className="text-sm font-medium mt-0.5">{value}</div>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="font-bold text-lg mb-5">Send us a Message</h2>
        <InquiryForm />
      </div>
    </div>
  );
}
