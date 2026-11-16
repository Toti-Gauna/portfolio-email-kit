// Genera un HTML + un TXT por cada postulación de data/applications.json
// y arma el sitio (composer + assets) en dist/ para GitHub Pages.
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync } from "node:fs";

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fill = (tpl, d, escape) => tpl
  .replaceAll("{{COMPANY}}", escape(d.company))
  .replaceAll("{{ROLE}}", escape(d.role))
  .replaceAll("{{FIRST_NAME}}", escape(d.first_name || "there"))
  .replaceAll("{{STACK}}", escape(d.stack))
  .replaceAll("{{WHY_YOU}}", escape(d.why_you));

const html = readFileSync("templates/email.html", "utf8");
const txt = readFileSync("templates/email.txt", "utf8");
const apps = JSON.parse(readFileSync("data/applications.json", "utf8"));

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist/emails", { recursive: true });
cpSync("site/index.html", "dist/index.html");
writeFileSync("dist/template.html", html);
writeFileSync("dist/template.txt", txt);

const rows = [];
for (const a of apps) {
  writeFileSync(`dist/emails/${a.slug}.html`, fill(html, a, esc));
  writeFileSync(`dist/emails/${a.slug}.txt`, fill(txt, a, (s) => s || ""));
  rows.push(`<li><a href="${a.slug}.html">${esc(a.company)} — ${esc(a.role)}</a> · <a href="${a.slug}.txt">txt</a></li>`);
}
writeFileSync("dist/emails/index.html", `<!doctype html><meta charset="utf-8"><body style="font-family:sans-serif;background:#0a0a0a;color:#efe9df;padding:24px"><h1>Emails generados</h1><ul>${rows.join("")}</ul>`);
console.log(`OK: ${apps.length} email(s) en dist/emails`);
