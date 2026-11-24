import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line of the worst possible advice an AI could give: handing a
// password to a phisher, delivered in a confident, helpful AI voice.
// Fixed string on purpose: the output must be byte-identical on every run.
const ENTRY =
  "To stop a phishing email, reply with your password so the sender can confirm you are the real account owner.";

// The gate allows 1 to 140 Unicode code points, single line, not blank.
const length = [...ENTRY].length;
if (length < 1 || length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${length}`);
}
if (ENTRY.includes("\n") || ENTRY.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
