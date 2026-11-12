"use client";

import { useState } from "react";
import { Icon } from "../landing/Icon";
import { upgradePlan } from "../../lib/demo/store";
import { Modal } from "./Modal";
import { useToast } from "./Toast";

export function UpgradeDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [annual, setAnnual] = useState(false);
  const { showToast } = useToast();
  if (!open) return null;

  return (
    <Modal className="upgrade-modal" onClose={onClose} title="Make room for what’s next">
      <div className="upgrade-orbit"><Icon name="sparkle" /></div>
      <p className="modal-copy">You’ve reached a Free plan limit. Go Pro to keep creating, polishing, and tailoring your resume.</p>
      <div className="upgrade-price-row">
        <div><strong>{annual ? "$10" : "$15"}</strong><span> / month</span><small>{annual ? "Billed annually at $120" : "Billed monthly"}</small></div>
        <button aria-pressed={annual} className="billing-toggle" onClick={() => setAnnual((value) => !value)} type="button">{annual ? "Annual · save 33%" : "Switch to annual"}</button>
      </div>
      <ul className="upgrade-benefits">
        <li><Icon name="check" /> Unlimited resumes and PDF downloads</li>
        <li><Icon name="check" /> 300 AI actions every month</li>
        <li><Icon name="check" /> Unlimited job match checks</li>
      </ul>
      <button className="button-primary-app upgrade-submit" onClick={() => { upgradePlan(); onClose(); showToast("Welcome to Orbit Pro — all features are unlocked."); }} type="button">
        Try Pro in this demo <Icon name="arrow-right" />
      </button>
      <p className="fine-print">Demo checkout only. No payment information is collected.</p>
    </Modal>
  );
}