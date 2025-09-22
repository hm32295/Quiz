'use client';
import React, { useEffect, useRef } from 'react';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

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
  title,
  message,
  confirmLabel,
  cancelLabel,
  loading = false,
  onConfirm,
  onCancel,
  icon,
}) => {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const cancelBtnRef = useRef<HTMLButtonElement | null>(null);

  // Close on ESC + focus cancel
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', onKeyDown);
    const tTimeout = setTimeout(() => cancelBtnRef.current?.focus(), 0);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      clearTimeout(tTimeout);
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
        className="relative w-full max-w-md rounded-2xl bg-white shadow-xl overflow-hidden animate__animated animate__zoomIn"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-orange-50 border-b">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600">
              {icon ?? <FaExclamationTriangle aria-hidden />}
            </span>
            <h2 id="confirm-delete-title" className="text-base font-semibold text-gray-900">
              {title ?? t('confirmDeleteModal_unique.title')}
            </h2>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full cursor-pointer p-2 text-gray-400 hover:text-gray-600 active:scale-95 transition"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 text-sm text-gray-700" id="confirm-delete-desc">
          {message ?? t('confirmDeleteModal_unique.message')}
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end">
          <button
            ref={cancelBtnRef}
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="w-full cursor-pointer sm:w-auto rounded-xl px-4 py-2 font-medium border border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 transition active:scale-[0.98] disabled:opacity-60"
          >
            {cancelLabel ?? t('confirmDeleteModal_unique.cancel')}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="w-full cursor-pointer sm:w-auto rounded-xl px-4 py-2 font-semibold bg-orange-500 text-white hover:bg-orange-600 transition active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? t('confirmDeleteModal_unique.deleting') : (confirmLabel ?? t('confirmDeleteModal_unique.confirm'))}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
