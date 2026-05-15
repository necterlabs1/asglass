import Link from 'next/link';

interface Props {
  title: string;
  viewAllHref?: string;
  children: React.ReactNode;
}

export default function SectionRow({ title, viewAllHref, children }: Props) {
  return (
    <section className="mt-10">
      <div className="px-4 sm:px-6 max-w-screen-xl mx-auto mb-4 flex items-center justify-between">
        <p className="section-title flex-1 text-sm">{title}</p>
        {viewAllHref && (
          <Link href={viewAllHref} className="text-xs text-[#ff4b2b] hover:underline ml-3 flex-shrink-0">
            View All
          </Link>
        )}
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 sm:px-6 pb-2 max-w-screen-xl mx-auto">
        {children}
      </div>
    </section>
  );
}
