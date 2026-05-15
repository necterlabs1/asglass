'use client';
import { useState } from 'react';
import Modal from '../../components/ui/Modal';
import InquiryForm from '../../components/listings/InquiryForm';

interface Props {
  listingId: string;
  listingTitle: string;
}

export default function DetailActions({ listingId, listingTitle }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-[#ff4b2b] hover:bg-[#e03e24] text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
      >
        Reserve Now
      </button>
      <button
        onClick={() => setOpen(true)}
        className="border border-[#ff4b2b] text-[#ff4b2b] hover:bg-[#ff4b2b] hover:text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
      >
        Contact Expert
      </button>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Book This Experience" size="sm">
        <InquiryForm listingId={listingId} listingTitle={listingTitle} />
      </Modal>
    </>
  );
}
