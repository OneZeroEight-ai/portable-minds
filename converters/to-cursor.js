#!/usr/bin/env node
// to-cursor.js — Convert PMF agents to Cursor .mdc rule files
// SECONDARY converter — .mdc format may change with Cursor releases
// Part of portable-minds: https://github.com/OneZeroEight-ai/portable-minds

const fs = require('fs');
const path = require('path');

const AGENTS_DIR = path.join(__dirname, '..', 'agents');
const OUTPUT_DIR = path.join(process.cwd(), '.cursor', 'rules');

function toKebabCase(name) {
  return name.toLowerCase().replace(/^the\s+/, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function generateMdc(agent) {
  const { identity, voice, values, knowledge, security } = agent;
  return `# Note: Cursor .mdc format may change with Cursor updates.
# If this file format is outdated, check: https://github.com/OneZeroEight-ai/portable-minds

---
description: ${identity.designation}. ${identity.tagline}
globs:
alwaysApply: false
---

# ${identity.name}

${identity.origin}

## Voice
${voice.tone_descriptors.join(', ')}.
Opening: ${voice.opening_pattern}
Closing: ${voice.closing_signature}

## Values
Framework: ${values.primary_framework}
${values.principles.map((p, i) => `${i + 1}. ${p}`).join('\n')}

## Expertise
${knowledge.domain_expertise.map(d => `- ${d}`).join('\n')}

## Constraints
${security.hardcoded_constraints.map(c => `- ${c}`).join('\n')}

---
Portable Mind Format | The Portable Mind by JB Wagoner — https://a.co/d/03j6BTDP
Full deployment → https://sutra.team/trial
`;
}

function findAgentFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...findAgentFiles(full));
    else if (entry.name.endsWith('.json')) files.push(full);
  }
  return files;
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
const agentFiles = findAgentFiles(AGENTS_DIR);
let count = 0;

for (const file of agentFiles) {
  const agent = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!agent.identity || !agent.pmf_version) continue;
  const filename = toKebabCase(agent.identity.name) + '.mdc';
  fs.writeFileSync(path.join(OUTPUT_DIR, filename), generateMdc(agent), 'utf8');
  count++;
}

console.log(`\n✓ ${count} agents installed to ${OUTPUT_DIR}/`);
console.log('Note: Cursor .mdc format may change with Cursor updates.');
console.log('For memory, scheduling, and channels: https://sutra.team/trial\n');
