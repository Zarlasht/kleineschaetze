'use client';

import { motion } from 'framer-motion';
import React from 'react';

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
  return (
    <div className="fixed inset-0 z-50 bg-opacity-30 backdrop-blur-md flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="bg-[var(--color-card-bg)] rounded-2xl p-6 max-w-xl w-full shadow-lg border-2 border-[var(--color-border)]"
      >
        <div className="relative">
         

          {memory.image_url && (
            <img
              src={memory.image_url}
              alt={memory.title}
              className="w-full h-full object-cover rounded-xl mb-4"
            />
          )}

          <h2 className="text-2xl font-bold text-[var(--color-headings)] mb-2">
            {memory.title}
          </h2>
          <p className="text-sm text-[var(--color-texts)] mb-4">
            📅 {new Date(memory.date).toLocaleDateString()}
          </p>
          <p className="text-[var(--color-text)] whitespace-pre-wrap">
            {memory.description}
          </p>

          <div className="mt-6 text-right">
            <button
              onClick={onClose}
              className="bg-[var(--color-bg-button)] hover:bg-[var(--color-bg-btn-hover)] text-white font-medium py-2 px-6 rounded-xl transition"
            >
              Schließen
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MemoryModal;
