import { readFileSync, existsSync } from "node:fs";

const requiredFiles = [
  "index.html",
  "about/index.html",
  "contact/index.html",
  "skillup-plus/index.html",
  "tech-trybe/index.html",
  "tech-tribe/index.html",
  "tech-trybe-plus/index.html",
  "assets/css/styles.css",
  "assets/js/main.js",
  "assets/js/config.js",
  "public/images/skillup-plus-popup-flyer.jpg",
  "scripts/static-server.mjs",
];

const missing = requiredFiles.filter((file) => !existsSync(file));
if (missing.length) {
  throw new Error(`Missing static files: ${missing.join(", ")}`);
}

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const deps = {
  ...packageJson.dependencies,
  ...packageJson.devDependencies,
};
const forbidden = ["next", "react", "react-dom", "eslint-config-next"].filter((name) => deps[name]);
if (forbidden.length) {
  throw new Error(`Framework dependencies still present: ${forbidden.join(", ")}`);
}

const html = requiredFiles
  .filter((file) => file.endsWith(".html"))
  .map((file) => readFileSync(file, "utf8"))
  .join("\n");

if (html.includes("/_next") || html.includes("next/script")) {
  throw new Error("Next.js runtime references found in HTML.");
}

console.log("Static SkillUp site validation passed.");
