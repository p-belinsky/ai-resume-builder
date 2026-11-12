"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Icon } from "../landing/Icon";

export function Modal({ title, children, onClose, className = "" }: { title: string; children: ReactNode; onClose: () => void; className?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);

  return (
    <dialog aria-label={title} className={`modal-backdrop ${className}`} onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} ref={dialogRef}>
      <section className="modal-card">
        <div className="modal-heading">
          <h2>{title}</h2>
          <button aria-label="Close dialog" className="icon-button" onClick={onClose} type="button"><Icon name="close" /></button>
        </div>
        {children}
      </section>
    </dialog>
  );
}