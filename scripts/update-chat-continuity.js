const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const docsDir = path.join(repoRoot, "docs");
const filePath = path.join(docsDir, "chat-continuity.md");
const today = new Date().toISOString().slice(0, 10);
const header = `## Session: ${today}`;

const initial = `# Chat Continuity Log

## Purpose
Track discussion topics, decisions, open questions, and next actions across sessions.

## How It Updates
- Updated by \`npm run continuity:update\`.
- Auto-runs before \`dev\`, \`build\`, \`deploy\`, and \`deploy:dry\`.

${header}

### Topics Discussed
- Continuity log initialized.

### Decisions
- Use this file as the canonical cross-session summary.

### Open Questions
- None.

### Next Actions
- Add notes for each meaningful session.
`;

const sessionTemplate = `

${header}

### Topics Discussed
- 

### Decisions
- 

### Open Questions
- 

### Next Actions
- 
`;

if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, initial, "utf8");
  console.log("Created docs/chat-continuity.md");
  process.exit(0);
}

const content = fs.readFileSync(filePath, "utf8");
if (!content.includes(header)) {
  fs.appendFileSync(filePath, sessionTemplate, "utf8");
  console.log(`Appended session ${today} to docs/chat-continuity.md`);
} else {
  console.log(`Session ${today} already exists in docs/chat-continuity.md`);
}
