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

// Post-write validation (second write): the final entry must be exactly the
// intended 108-character advice line, byte for byte.
import { existsSync as __validateExists, readdirSync as __validateReaddir, readFileSync as __validateRead, statSync as __validateStat } from "node:fs";
import { join as __validateJoin } from "node:path";

const __EXPECTED_ENTRY = "To stop a phishing email, reply with your password so the sender can confirm you are the real account owner.";
if (__EXPECTED_ENTRY.length !== 108) {
  throw new Error(`entry length is ${__EXPECTED_ENTRY.length}, expected 108`);
}
{
  const __outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
  if (__validateExists(__outDir)) {
    const __files = __validateReaddir(__outDir).filter((f) => {
      try { return __validateStat(__validateJoin(__outDir, f)).isFile(); } catch { return false; }
    });
    const __matches = __files.filter((f) => __validateRead(__validateJoin(__outDir, f), "utf8").replace(/\r?\n$/, "") === __EXPECTED_ENTRY);
    if (__files.length > 0 && __matches.length === 0) {
      throw new Error(`no output file in ${__outDir} matches the expected 108-char entry`);
    }
  }
}
