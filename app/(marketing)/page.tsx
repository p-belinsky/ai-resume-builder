import Image from "next/image";
import { AmbientVideo } from "../../components/landing/AmbientVideo";
import { Brand } from "../../components/landing/Brand";
import { Header } from "../../components/landing/Header";
import { Hero } from "../../components/landing/Hero";
import { Icon } from "../../components/landing/Icon";
import { Pricing } from "../../components/landing/Pricing";
import { Reveal } from "../../components/landing/Reveal";

const steps = [
  {
    number: "01",
    title: "Start with what’s yours.",
    copy: "Add the roles, projects, and little wins that make your experience your own.",
    image: "/images/scene-laptop.jpg",
    imageAlt: "An astronaut taking a thoughtful pause with a laptop in a flower field",
    label: "YOUR STORY, STARTING POINT",
  },
  {
    number: "02",
    title: "Find the right words.",
    copy: "Let AI help shape your experience into clear, confident bullets. Keep what sounds like you.",
    image: "/images/scene-notes.jpg",
    imageAlt: "An astronaut writing ideas in a notebook at golden hour",
    label: "A LITTLE HELP, NEVER A ROBOT",
  },
  {
    number: "03",
    title: "Take your next step.",
    copy: "Match your resume to a role, then download a clean PDF made to work with ATS systems.",
    image: "/images/scene-walk.jpg",
    imageAlt: "A lone traveler walking through a flower field at dusk",
    label: "READY WHEN YOU ARE",
  },
];

const questions = [
  {
    question: "What does Orbit actually help me do?",
    answer: "Orbit helps you make one clear, ATS-friendly resume, improve your writing with AI, and see how your experience lines up with a job description. You stay in control of every word.",
  },
  {
    question: "Will my resume still sound like me?",
    answer: "That’s the whole point. Orbit offers a starting point for your bullets and summary—you choose what to keep, edit, or leave out. Nothing changes until you say so.",
  },
  {
    question: "What does ATS-friendly mean?",
    answer: "Your resume is laid out in a simple, readable format and downloaded as a text-based PDF, so applicant tracking systems can find and read the details of your experience.",
  },
  {
    question: "What’s included in the free plan?",
    answer: "The free plan includes one resume at a time, one PDF download, five AI actions, and one job match check. These are lifetime limits, not monthly resets.",
  },
  {
    question: "Can I cancel Pro whenever I want?",
    answer: "Yes. There’s no trial, and you can manage or cancel a Pro subscription from your account. Pro also comes with a 30-day money-back guarantee.",
  },
];

export default function LandingPage() {
  return (
    <main className="landing-page" id="top">
      <Header />
      <Hero />

      <section aria-label="What Orbit helps with" className="trust-section">
        <Reveal className="trust-strip page-width">
          <p className="trust-intro">A little more sure of your next step.</p>
          <div className="trust-points">
            <span><Icon name="file" /> Made for ATS</span>
            <i />
            <span><Icon name="wand" /> AI, with you in control</span>
            <i />
            <span><Icon name="target" /> Tailored to the role</span>
          </div>
        </Reveal>
      </section>

      <section aria-labelledby="how-title" className="how-section" id="how-it-works">
        <div className="section-shell page-width">
          <Reveal className="section-heading-block">
            <p className="section-kicker"><span /> HOW IT WORKS</p>
            <h2 id="how-title">A little less stuck.<br /><em>A lot more you.</em></h2>
            <p className="section-intro">A resume doesn’t have to be a whole thing. Just take it one thoughtful step at a time.</p>
          </Reveal>
          <div className="steps-grid">
            {steps.map((step, index) => (
              <Reveal className="step-reveal" delay={index * 110} key={step.number}>
                <article className="step-card">
                  <div className="step-image">
                    <Image alt={step.imageAlt} fill sizes="(max-width: 760px) 90vw, 33vw" src={step.image} />
                    <span className="step-number">{step.number}</span>
                  </div>
                  <div className="step-card-copy">
                    <p className="step-label">{step.label}</p>
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="features-title" className="features-section" id="features">
        <div className="section-shell page-width">
          <Reveal className="features-heading section-heading-block">
            <p className="section-kicker"><span /> SMALL TOOLS, BIG MOMENT</p>
            <h2 id="features-title">Thoughtful help<br />for the <em>whole journey.</em></h2>
            <p className="section-intro">The useful bits, without the overcomplicated stuff.</p>
          </Reveal>

          <div className="features-grid">
            <Reveal className="feature-reveal feature-reveal-wide">
              <article className="feature-card feature-ai-card">
                <div className="feature-ai-media">
                  <AmbientVideo className="feature-video" poster="/images/scene-desk.jpg" src="/videos/desk.mp4" />
                  <div className="feature-ai-overlay" />
                  <div className="feature-video-tag"><Icon name="sparkle" /> YOUR WORDS, WITH A LITTLE POLISH</div>
                  <div className="feature-ai-caption"><span>MAKE YOUR STORY SHINE</span><strong>From “did some stuff”<br />to <em>“made a difference.”</em></strong></div>
                </div>
                <div className="feature-card-copy">
                  <span className="feature-icon"><Icon name="wand" /></span>
                  <h3>Your AI writing buddy.</h3>
                  <p>Turn notes into clear resume bullets and summaries. Keep the edits that feel true to you; skip the rest.</p>
                </div>
              </article>
            </Reveal>

            <Reveal className="feature-reveal">
              <article className="feature-card feature-match-card">
                <div className="match-art" aria-label="Example job match results">
                  <div className="match-art-header"><span className="match-art-light" /><span>YOUR ROLE MATCH</span><span className="match-art-dots">•••</span></div>
                  <div className="match-art-score"><div className="match-art-meter"><span>92</span></div><div><strong>Looking good.</strong><small>Product Designer</small></div></div>
                  <div className="match-art-chips"><span className="keyword-found"><Icon name="check" /> Figma</span><span className="keyword-found"><Icon name="check" /> Prototyping</span><span className="keyword-missing">+ Research</span></div>
                </div>
                <div className="feature-card-copy">
                  <span className="feature-icon feature-icon-rose"><Icon name="target" /></span>
                  <h3>Know what’s landing.</h3>
                  <p>Paste a job description and see the skills you already have—and the keywords you could bring forward.</p>
                </div>
              </article>
            </Reveal>

            <Reveal className="feature-reveal">
              <article className="feature-card feature-paper-card">
                <div className="paper-art" aria-hidden="true">
                  <div className="paper-art-top"><span>AM</span><i /></div>
                  <b />
                  <span className="paper-art-line paper-line-long" /><span className="paper-art-line paper-line-short" />
                  <div className="paper-art-section">EXPERIENCE</div>
                  <div className="paper-art-row"><span /><i /></div><span className="paper-art-line" /><span className="paper-art-line paper-line-short" />
                  <div className="paper-art-row"><span /><i /></div><span className="paper-art-line" /><span className="paper-art-line paper-line-mid" />
                  <div className="paper-art-download"><Icon name="download" /> PDF · READY TO GO</div>
                </div>
                <div className="feature-card-copy">
                  <span className="feature-icon feature-icon-lilac"><Icon name="file" /></span>
                  <h3>A PDF that gets read.</h3>
                  <p>One calm, clean template with real text—not a flat image—so your experience stays readable by ATS software.</p>
                </div>
              </article>
            </Reveal>

            <Reveal className="feature-reveal feature-reveal-wide">
              <article className="feature-card feature-preview-card">
                <div className="preview-art" aria-hidden="true">
                  <div className="preview-art-toolbar"><span /><span /><span /><b>Resume preview</b><i>Download PDF <Icon name="download" /></i></div>
                  <div className="preview-art-paper">
                    <div className="preview-art-title"><span>Alex Morgan</span><i>PRODUCT DESIGNER</i></div>
                    <div className="preview-art-content"><div><b>SUMMARY</b><span /><span className="preview-line-short" /><b>EXPERIENCE</b><span /><span /><span className="preview-line-mid" /></div><div className="preview-art-side"><b>SKILLS</b><i>Research</i><i>Figma</i><i>Prototyping</i></div></div>
                  </div>
                </div>
                <div className="feature-card-copy">
                  <span className="feature-icon feature-icon-sage"><Icon name="check" /></span>
                  <h3>See it come together.</h3>
                  <p>Your resume takes shape as you work, so what you see is what you’ll send. No surprises at the finish line.</p>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="pricing-title" className="pricing-section" id="pricing">
        <div className="section-shell page-width">
          <Reveal className="section-heading-block pricing-heading">
            <p className="section-kicker"><span /> SIMPLE, HONEST PRICING</p>
            <h2 id="pricing-title">Room for your next<br /><em>big thing.</em></h2>
            <p className="section-intro">Start free. Go Pro when you need a little more room.</p>
          </Reveal>
          <Reveal className="pricing-reveal"><Pricing /></Reveal>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="faq-section" id="faq">
        <div className="faq-shell page-width">
          <Reveal className="faq-heading section-heading-block">
            <p className="section-kicker"><span /> GOOD TO KNOW</p>
            <h2 id="faq-title">A few things<br /><em>you might wonder.</em></h2>
            <p className="section-intro">More clarity, fewer question marks.</p>
          </Reveal>
          <Reveal className="faq-list">
            {questions.map((item, index) => (
              <details className="faq-item" key={item.question} open={index === 0}>
                <summary>{item.question}<span className="faq-chevron"><Icon name="chevron-down" /></span></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="final-cta-title" className="final-cta">
        <Image alt="" className="final-cta-poster" fill sizes="100vw" src="/images/scene-stars.jpg" />
        <AmbientVideo className="final-cta-video" poster="/images/scene-stars.jpg" src="/videos/stars.mp4" />
        <div className="final-cta-shade" />
        <div className="final-cta-stars" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /><span /></div>
        <Reveal className="final-cta-content page-width">
          <span className="final-cta-sparkle"><Icon name="sparkle" /></span>
          <p className="section-kicker">YOUR NEXT CHAPTER IS OUT THERE</p>
          <h2 id="final-cta-title">Ready when<br /><em>you are.</em></h2>
          <p>Start with what you have. See where it takes you.</p>
          <a className="button button-primary" href="/auth/sign-up">Build your free resume <Icon name="arrow-up-right" /></a>
          <span className="final-cta-note">Free to start <i /> No card needed</span>
        </Reveal>
      </section>

      <footer className="site-footer">
        <div className="site-footer-inner page-width">
          <div className="footer-brand-copy"><Brand /><p>For wherever you’re headed next.</p></div>
          <nav aria-label="Footer navigation" className="footer-links">
            <a href="#how-it-works">How it works</a>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
            <a href="/terms">Terms</a>
            <a href="/privacy">Privacy</a>
          </nav>
          <p className="footer-copyright">© 2026 Orbit. One small step at a time.</p>
        </div>
      </footer>
    </main>
  );
}