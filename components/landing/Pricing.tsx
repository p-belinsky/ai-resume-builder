"use client";

import Link from "next/link";
import { useState } from "react";
import { PLANS } from "../../lib/plans";
import { Icon } from "./Icon";

const proBenefits = [PLANS.pro.resumes, PLANS.pro.pdfDownloads, PLANS.pro.aiActions, PLANS.pro.jobMatches];
const freeBenefits = [PLANS.free.resumes, PLANS.free.pdfDownloads, PLANS.free.aiActions, PLANS.free.jobMatches];

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  const price = annual ? PLANS.pro.priceAnnual : PLANS.pro.priceMonthly;

  return (
    <div className="pricing-wrap">
      <div className="pricing-toggle-wrap">
        <span className={!annual ? "pricing-toggle-active-label" : ""}>Monthly</span>
        <button
          aria-label="Toggle annual billing"
          aria-pressed={annual}
          className={`pricing-toggle${annual ? " pricing-toggle-annual" : ""}`}
          onClick={() => setAnnual((value) => !value)}
          type="button"
        >
          <span />
        </button>
        <span className={annual ? "pricing-toggle-active-label" : ""}>Yearly</span>
        <span className="pricing-save-tag">Save 33%</span>
      </div>

      <div className="pricing-cards">
        <article className="plan-card plan-card-free">
          <div className="plan-card-heading"><div><p className="plan-eyebrow">A good place to begin</p><h3>{PLANS.free.name}</h3></div><span className="plan-star-mark"><Icon name="sparkle" /></span></div>
          <p className="plan-description">Everything you need to make your first move.</p>
          <p className="plan-price"><span className="plan-currency">$</span>0 <span className="plan-period">/ forever</span></p>
          <Link className="button button-outline" href="/auth/sign-up">Start for free <Icon name="arrow-right" /></Link>
          <ul className="plan-benefits">
            {freeBenefits.map((benefit) => <li key={benefit}><Icon name="check" /> {benefit}</li>)}
          </ul>
        </article>

        <article className="plan-card plan-card-pro">
          <div className="plan-popular"><Icon name="sparkle" /> YOUR NEXT-CHAPTER PLAN</div>
          <div className="plan-card-heading"><div><p className="plan-eyebrow">For the bigger leap</p><h3>{PLANS.pro.name}</h3></div><span className="plan-star-mark"><Icon name="sparkle" /></span></div>
          <p className="plan-description">A little more help, all the way to your yes.</p>
          <p className="plan-price"><span className="plan-currency">$</span>{price}<span className="plan-period">/ {annual ? "year" : "month"}</span></p>
          {annual && <p className="plan-billing-note">That’s just $10 per month, billed yearly.</p>}
          <Link className="button button-primary plan-primary-button" href="/auth/sign-up">Choose Pro <Icon name="arrow-up-right" /></Link>
          <ul className="plan-benefits">
            {proBenefits.map((benefit) => <li key={benefit}><Icon name="check" /> {benefit}</li>)}
          </ul>
          <p className="plan-fine-print">No trial. Cancel anytime from your account.</p>
        </article>
      </div>
      <p className="pricing-footnote"><Icon name="shield" /> Nothing to pay until you’re ready. 30-day money-back guarantee on Pro.</p>
    </div>
  );
}