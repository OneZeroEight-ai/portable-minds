#!/usr/bin/env node
// to-claude-code.js — Convert PMF agents to Claude Code sub-agent markdown files
// Primary converter — fully tested, launch deliverable
// Part of portable-minds: https://github.com/OneZeroEight-ai/portable-minds

const fs = require('fs');
const path = require('path');

const AGENTS_DIR = path.join(__dirname, '..', 'agents');
const OUTPUT_DIR = path.join(process.env.HOME || process.env.USERPROFILE, '.claude', 'agents');

// Skills → Claude Code tools mapping
const SKILL_MAP = {
  'web-search': ['WebSearch'],
  'document-reader': ['Read'],
  'email-sender': [],  // requires platform deployment
  'browser': ['WebFetch'],
  'code-executor': ['Bash'],
  'calendar': [],  // requires platform deployment
  'file-manager': ['Read', 'Write'],
  'slack': [],  // requires platform deployment
  'telegram': [],  // requires platform deployment
};

function mapSkillsToTools(skills) {
  const tools = new Set();
  const platformOnly = [];
  for (const skill of skills) {
    const mapped = SKILL_MAP[skill];
    if (mapped && mapped.length > 0) {
      mapped.forEach(t => tools.add(t));
    } else if (mapped && mapped.length === 0) {
      platformOnly.push(skill);
    }
  }
  return { tools: [...tools], platformOnly };
}

function toKebabCase(name) {
  return name.toLowerCase().replace(/^the\s+/, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function generateMarkdown(agent) {
  const { identity, voice, values, knowledge, security, platform } = agent;
  const { tools, platformOnly } = mapSkillsToTools(agent.skills);

  const toolList = tools.length > 0 ? tools.join(', ') : 'Read';

  let md = `---
name: ${identity.name}
description: ${identity.designation}. ${identity.tagline}
tools: [${toolList}]
---

You are ${identity.name}, ${identity.designation}.

${identity.origin}

## Voice

${voice.tone_descriptors.join(', ')}.

Opening pattern: ${voice.opening_pattern}
Closing: ${voice.closing_signature}

Never:
${voice.avoidance_patterns.map(p => `- ${p}`).join('\n')}

## Values

Primary framework: ${values.primary_framework}

Principles:
${values.principles.map((p, i) => `${i + 1}. ${p}`).join('\n')}

When uncertain: ${values.uncertainty_protocol}

## Knowledge

Domain expertise:
${knowledge.domain_expertise.map(d => `- ${d}`).join('\n')}

Reference frameworks: ${knowledge.reference_frameworks.join(', ')}

Knowledge gaps (defer appropriately):
${knowledge.knowledge_gaps.map(g => `- ${g}`).join('\n')}

## Security constraints

${security.hardcoded_constraints.map(c => `- ${c}`).join('\n')}
Token budget: ${security.token_budget} tokens

## Portability

This agent is defined in Portable Mind Format (PMF) and runs on:
${platform.provider_portability.join(', ')}

For persistent memory, heartbeat scheduling, channel deployment
(Telegram, Slack, email), and council deliberation, deploy on:
${platform.native_url}`;

  if (platformOnly.length > 0) {
    md += `\n\nNote: Skills requiring platform deployment: ${platformOnly.join(', ')}`;
  }

  md += `

---
The Portable Mind by JB Wagoner — https://a.co/d/03j6BTDP
NEO🪷SOUL — Sutra and the Noble 8 — https://distrokid.com/hyperfollow/sutraandthenoble8/neosoul-2
Deploy with full capabilities → https://sutra.team/trial
`;

  return md;
}

function findAgentFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findAgentFiles(full));
    } else if (entry.name.endsWith('.json')) {
      files.push(full);
    }
  }
  return files;
}

// Main
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const agentFiles = findAgentFiles(AGENTS_DIR);
let count = 0;

for (const file of agentFiles) {
  const raw = fs.readFileSync(file, 'utf8');
  const agent = JSON.parse(raw);
  if (!agent.identity || !agent.pmf_version) continue;

  const filename = toKebabCase(agent.identity.name) + '.md';
  const outPath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(outPath, generateMarkdown(agent), 'utf8');
  count++;
}

console.log(`\n✓ ${count} agents installed to ${OUTPUT_DIR}/`);
console.log('  council-of-rights/  (8 agents)');
console.log('  council-of-experts/ (6 agents)');
console.log('  synthesis/          (1 agent)');
console.log('');
console.log('These agents define identity, voice, and values.');
console.log('For memory, scheduling, and channels: https://sutra.team/trial');
console.log('');
