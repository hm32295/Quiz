'use client';
import React, { useEffect, useRef } from 'react';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

type ConfirmDeleteModalProps = {
  isOpen: boolean;
  title?: string;
  message?: string | React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  
  icon?: React.ReactNode;
};

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  title = 'Confirm Delete',
  message = 'Are you sure you want to delete this item? This action cannot be undone.',
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  loading = false,
  onConfirm,
  onCancel,
  icon,
}) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const cancelBtnRef = useRef<HTMLButtonElement | null>(null);

  // Close on ESC + focus first actionable element
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', onKeyDown);
    // ركّز على زر الإلغاء أول ما يفتح
    const t = setTimeout(() => cancelBtnRef.current?.focus(), 0);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      clearTimeout(t);
    };
  }, [isOpen, onCancel]);

  // Close on click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
      onCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="confirm-delete-title"
      aria-describedby="confirm-delete-desc"
      onMouseDown={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className="relative w-full max-w-md rounded-2xl shadow-xl overflow-hidden"
        
        style={{ border: '2px solid #C5D86D', background: 'white' }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ background: '#FFEDDF', color: '#000' }}
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ background: '#FB7C19', color: 'white' }}>
              {icon ?? <FaExclamationTriangle aria-hidden />}
            </span>
            <h2 id="confirm-delete-title" className="text-base font-semibold">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full cursor-pointer p-2 hover:bg-black/5 active:scale-95 transition"
            aria-label="Close"
            title="Close"
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 text-sm text-black" id="confirm-delete-desc">
          {message}
        </div>

        {/* Footer / Actions */}
        <div className="px-5 pb-5 flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end">
          <button
            ref={cancelBtnRef}
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="w-full cursor-pointer sm:w-auto rounded-xl px-4 py-2 font-medium border transition hover:opacity-90 active:scale-[0.98]"
            style={{ background: '#C5D86D', color: '#000', borderColor: '#C5D86D' }}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="w-full cursor-pointer sm:w-auto rounded-xl px-4 py-2 font-semibold text-white transition hover:opacity-95 active:scale-[0.98] disabled:opacity-60"
            style={{ background: '#FB7C19' }}
          >
            {loading ? 'Deleting…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
