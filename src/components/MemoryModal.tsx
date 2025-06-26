'use client';

import { motion } from 'framer-motion';
import React, { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteMemory } from '@/app/dashboard/action';

interface MemoryModalProps {
  memory: {
    id: number;
    title: string;
    image_url: string;
    description: string;
    date: string;
    childid: number;
  };
  onClose: () => void;
}

const MemoryModal: React.FC<MemoryModalProps> = ({ memory, onClose }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const confirmed = confirm("Möchtest du diese Erinnerung wirklich löschen?");
    if (confirmed) {
      startTransition(async () => {
        await deleteMemory(memory.id);
        onClose(); // close the modal
      });
    }
  };



  return (
    <div className="fixed inset-0 z-50 bg-opacity-30 backdrop-blur-md flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-[var(--color-card-bg)] rounded-2xl p-6 max-w-xl w-full shadow-xl border-2 border-[var(--color-border)]"
      >
        <div className="relative">
          {memory.image_url && (
            <img
              src={memory.image_url}
              alt={memory.title}
              className="w-full h-60 object-cover rounded-xl mb-4"
            />
          )}

          <h2 className="text-2xl font-bold text-[var(--color-headings)] mb-1">
            {memory.title}
          </h2>
          <p className="text-sm text-[var(--color-texts)] mb-4">
            📅 {new Date(memory.date).toLocaleDateString()}
          </p>
          <p className="text-[var(--color-text)] whitespace-pre-wrap">
            {memory.description}
          </p>

          <div className="mt-6 flex justify-end gap-3 flex-wrap text-sm">
           
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="bg-[var(--color-headings)] hover:bg-red-400 text-white font-medium py-1 px-3 rounded-lg transition"
            >
              🗑️ Löschen
            </button>
            <button
              onClick={onClose}
              className="bg-[var(--color-primary)] hover:bg-[var(--color-bg-btn-hover)] text-[var(--color-texts)] font-medium py-1 px-3 rounded-lg transition"
            >
              ❌ Schließen
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default MemoryModal;
