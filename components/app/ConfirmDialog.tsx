"use client";

import { Modal } from "./Modal";

export function ConfirmDialog({
  title,
  description,
  confirmLabel = "Delete",
  danger = true,
  onCancel,
  onConfirm,
}: {
  title: string;
  description: string;
  confirmLabel?: string;
  danger?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal onClose={onCancel} title={title}>
      <p className="modal-copy">{description}</p>
      <div className="modal-actions">
        <button className="button-secondary" onClick={onCancel} type="button">Keep it</button>
        <button className={danger ? "button-danger" : "button-primary-app"} onClick={onConfirm} type="button">{confirmLabel}</button>
      </div>
    </Modal>
  );
}