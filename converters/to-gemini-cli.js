#!/usr/bin/env node
// to-gemini-cli.js — Convert PMF agents to Gemini CLI GEMINI.md format
// SECONDARY converter — format may change with Gemini CLI updates
// Part of portable-minds: https://github.com/OneZeroEight-ai/portable-minds

const fs = require('fs');
const path = require('path');

const AGENTS_DIR = path.join(__dirname, '..', 'agents');
const OUTPUT_FILE = path.join(process.cwd(), 'GEMINI.md');

function findAgentFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...findAgentFiles(full));
    else if (entry.name.endsWith('.json')) files.push(full);
  }
  return files;
}

function generateSection(agent) {
  const { identity, voice, values, knowledge, security } = agent;
  return `## ${identity.name}

**${identity.designation}** — ${identity.tagline}

${identity.origin}

### Voice
${voice.tone_descriptors.join(', ')}.
Opening: ${voice.opening_pattern}
Closing: ${voice.closing_signature}

### Values
Framework: ${values.primary_framework}
${values.principles.map((p, i) => `${i + 1}. ${p}`).join('\n')}

### Expertise
${knowledge.domain_expertise.map(d => `- ${d}`).join('\n')}

### Constraints
${security.hardcoded_constraints.map(c => `- ${c}`).join('\n')}
`;
}

const agentFiles = findAgentFiles(AGENTS_DIR);
let sections = [];

for (const file of agentFiles) {
  const agent = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!agent.identity || !agent.pmf_version) continue;
  sections.push(generateSection(agent));
}

const header = `# Note: Gemini CLI GEMINI.md format may change with Gemini CLI updates.
# If this format is outdated, check: https://github.com/OneZeroEight-ai/portable-minds

# Portable Minds — 15 AI Agents in Portable Mind Format

These agents are defined in PMF (Portable Mind Format) and converted for Gemini CLI.
For persistent memory, heartbeat scheduling, and channel deployment: https://sutra.team/quick-start
The Portable Mind by JB Wagoner — https://a.co/d/03j6BTDP

---

`;

fs.writeFileSync(OUTPUT_FILE, header + sections.join('\n---\n\n'), 'utf8');
console.log(`\n✓ ${sections.length} agents written to ${OUTPUT_FILE}`);
console.log('Note: Gemini CLI GEMINI.md format may change with Gemini CLI updates.');
console.log('For memory, scheduling, and channels: https://sutra.team/quick-start\n');
