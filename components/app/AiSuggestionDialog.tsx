"use client";

import { Icon } from "../landing/Icon";
import { Modal } from "./Modal";

export function AiSuggestionDialog({
  result,
  onClose,
  onAccept,
}: {
  result: string | string[] | null;
  onClose: () => void;
  onAccept: () => void;
}) {
  if (!result) return null;
  return (
    <Modal className="suggestion-modal" onClose={onClose} title="A little help with your words">
      <div className="ai-note"><Icon name="sparkle" /><span>Here’s a starting point. Keep what feels like you.</span></div>
      {Array.isArray(result) ? <ul className="suggestion-list">{result.map((item) => <li key={item}>{item}</li>)}</ul> : <blockquote className="suggestion-quote">{result}</blockquote>}
      <div className="modal-actions">
        <button className="button-secondary" onClick={onClose} type="button">Not now</button>
        <button className="button-primary-app" onClick={onAccept} type="button">Use suggestion <Icon name="check" /></button>
      </div>
    </Modal>
  );
}