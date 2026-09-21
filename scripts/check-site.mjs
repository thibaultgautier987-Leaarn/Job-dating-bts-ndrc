import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const contentSource = fs.readFileSync(path.join(root, "content.js"), "utf8");
const errors = [];

const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
if (duplicateIds.length) errors.push(`Identifiants dupliqués : ${[...new Set(duplicateIds)].join(", ")}`);

for (const match of html.matchAll(/\shref="#([^"]+)"/g)) {
  if (!ids.includes(match[1])) errors.push(`Ancre introuvable : #${match[1]}`);
}

for (const match of html.matchAll(/\s(?:src|href)="([^"]+)"/g)) {
  const target = match[1];
  if (/^(?:https?:|mailto:|tel:|data:|#)/.test(target)) continue;
  const cleanTarget = target.split(/[?#]/)[0];
  if (cleanTarget && !fs.existsSync(path.join(root, cleanTarget))) {
    errors.push(`Fichier local introuvable : ${cleanTarget}`);
  }
}

const sandbox = { window: {} };
vm.runInNewContext(contentSource, sandbox);
const content = sandbox.window.SITE_CONTENT || {};
for (const match of html.matchAll(/data-field="([^"]+)"/g)) {
  if (!(match[1] in content)) errors.push(`Champ absent de content.js : ${match[1]}`);
}

if (!html.includes('lang="fr"')) errors.push("La langue française n’est pas déclarée.");
if (!html.includes('name="viewport"')) errors.push("La balise viewport est absente.");
if (!html.includes('class="skip-link"')) errors.push("Le lien d’évitement est absent.");

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Site vérifié : ${ids.length} identifiants, liens locaux et champs de contenu valides.`);
