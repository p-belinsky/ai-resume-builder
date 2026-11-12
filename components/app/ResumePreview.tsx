import type { ResumeContent } from "../../lib/resume/types";

function displayDate(value: string) {
  if (!value) return "";
  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month || 1) - 1);
  return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date);
}

export function ResumePreview({ content }: { content: ResumeContent }) {
  const contact = content.contact;
  return (
    <article aria-label="Live resume preview" className="resume-paper">
      <header className="paper-header">
        <h1>{contact.fullName || "Your Name"}</h1>
        {content.experience[0]?.jobTitle && <p className="paper-role">{content.experience[0].jobTitle}</p>}
        <div className="paper-contact">
          {[contact.email, contact.phone, contact.location, contact.linkedin, contact.website].filter(Boolean).map((value) => <span key={value}>{value}</span>)}
        </div>
      </header>
      {content.summary && <section className="paper-section"><h2>Profile</h2><p>{content.summary}</p></section>}
      {!!content.experience.length && <section className="paper-section"><h2>Experience</h2>
        {content.experience.map((item) => (
          <div className="paper-entry" key={item.id}>
            <div className="paper-entry-heading"><div><strong>{item.jobTitle || "Job title"}</strong><span>{item.company}</span></div><small>{displayDate(item.startDate)}{item.current ? " — Present" : item.endDate ? ` — ${displayDate(item.endDate)}` : ""}</small></div>
            {item.location && <p className="paper-location">{item.location}</p>}
            {item.bullets.length > 0 && <ul>{item.bullets.map((bullet, index) => <li key={`${item.id}-${index}`}>{bullet}</li>)}</ul>}
          </div>
        ))}
      </section>}
      {!!content.education.length && <section className="paper-section"><h2>Education</h2>
        {content.education.map((item) => <div className="paper-entry paper-education" key={item.id}><div className="paper-entry-heading"><div><strong>{[item.degree, item.field].filter(Boolean).join(" ") || "Degree"}</strong><span>{item.school}</span></div><small>{displayDate(item.startDate)}{item.endDate ? ` — ${displayDate(item.endDate)}` : ""}</small></div></div>)}
      </section>}
      {!!content.skills.length && <section className="paper-section"><h2>Skills</h2><p className="paper-skills">{content.skills.join(" · ")}</p></section>}
      {!contact.fullName && !content.summary && !content.experience.length && !content.education.length && !content.skills.length && <p className="paper-empty">Your resume will take shape as you add your details.</p>}
    </article>
  );
}