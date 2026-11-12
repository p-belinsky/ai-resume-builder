import type { ResumeContent } from "./types";

function pdfText(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, "-")
    .replace(/[^\x20-\x7e]/g, "")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function wrap(value: string, width = 84) {
  const words = value.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    if (line && `${line} ${word}`.length > width) {
      lines.push(line);
      line = word;
    } else line = line ? `${line} ${word}` : word;
  }
  if (line) lines.push(line);
  return lines;
}

export function createResumePdf(content: ResumeContent) {
  const lines = [
    content.contact.fullName || "Resume",
    [content.contact.email, content.contact.phone, content.contact.location].filter(Boolean).join(" | "),
    [content.contact.linkedin, content.contact.website].filter(Boolean).join(" | "),
    "",
    ...(content.summary ? ["SUMMARY", ...wrap(content.summary), ""] : []),
    ...(content.experience.length ? ["EXPERIENCE", ...content.experience.flatMap((item) => [
      `${item.jobTitle} | ${item.company}`,
      `${item.startDate}${item.current ? " - Present" : item.endDate ? ` - ${item.endDate}` : ""}${item.location ? ` | ${item.location}` : ""}`,
      ...item.bullets.flatMap((bullet) => wrap(`• ${bullet}`)),
      "",
    ])] : []),
    ...(content.education.length ? ["EDUCATION", ...content.education.flatMap((item) => [
      `${item.degree} ${item.field} | ${item.school}`,
      `${item.startDate}${item.endDate ? ` - ${item.endDate}` : ""}`,
      "",
    ])] : []),
    ...(content.skills.length ? ["SKILLS", ...wrap(content.skills.join("  ·  "))] : []),
  ].flatMap((line) => wrap(line));

  const pages: string[][] = [];
  for (let index = 0; index < lines.length; index += 48) pages.push(lines.slice(index, index + 48));
  if (!pages.length) pages.push(["Resume"]);

  const objects: string[] = [];
  const pageIds = pages.map((_, index) => 4 + index * 2);
  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[2] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pages.length} >>`;
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
  pages.forEach((pageLines, index) => {
    const pageId = pageIds[index];
    const contentId = pageId + 1;
    const commands = ["BT", "/F1 10 Tf", "50 790 Td", "14 TL", ...pageLines.map((line, lineIndex) => `${lineIndex ? "T* " : ""}(${pdfText(line)}) Tj`), "ET"].join("\n");
    objects[pageId] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 3 0 R >> >> /Contents ${contentId} 0 R >>`;
    objects[contentId] = `<< /Length ${new TextEncoder().encode(commands).length} >>\nstream\n${commands}\nendstream`;
  });

  let document = "%PDF-1.4\n";
  const offsets = [0];
  for (let id = 1; id < objects.length; id += 1) {
    offsets[id] = new TextEncoder().encode(document).length;
    document += `${id} 0 obj\n${objects[id]}\nendobj\n`;
  }
  const xrefOffset = new TextEncoder().encode(document).length;
  document += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
  for (let id = 1; id < objects.length; id += 1) document += `${String(offsets[id]).padStart(10, "0")} 00000 n \n`;
  document += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return new Blob([document], { type: "application/pdf" });
}

export function downloadResumePdf(content: ResumeContent, title: string) {
  const url = URL.createObjectURL(createResumePdf(content));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "resume"}.pdf`;
  anchor.click();
  URL.revokeObjectURL(url);
}