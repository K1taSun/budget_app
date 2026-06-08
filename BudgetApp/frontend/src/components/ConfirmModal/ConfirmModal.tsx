import React, { type ReactNode } from "react";
import styles from "./ConfirmModal.module.scss";

interface ConfirmModalProps {
  visible: boolean;
  title?: string;
  message: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  visible,
  title = "Potwierdź akcję",
  message,
  confirmLabel = "Potwierdź",
  cancelLabel = "Anuluj",
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  if (!visible) return null;

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  };

  const handleOverlayKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      onCancel();
    }
  };

  return (
    <div
      className={styles.modalOverlay}
      role="button"
      tabIndex={0}
      onClick={handleOverlayClick}
      onKeyDown={handleOverlayKeyDown}
      aria-label="Zamknij okno"
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
      >
        <h3 id="confirm-modal-title">{title}</h3>
        <p>{message}</p>
        <div className={styles.actions}>
          <button type="button" className={styles.cancel} onClick={onCancel}>
            {cancelLabel}
          </button>
          <button type="button" className={styles.confirm} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
