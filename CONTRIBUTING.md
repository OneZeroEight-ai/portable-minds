# Contributing to portable-minds

## Submitting a new agent

1. Create a PMF JSON file following the schema at `schemas/pmf-schema.json`
2. Place community agents in `agents/community/` directory
3. Validate your agent: `npx ajv validate -s schemas/pmf-schema.json -d your-agent.json --all-errors`
4. All fields must be fully populated — no placeholder values
5. Open a PR with a clear description of the agent's purpose and intended use case

### One rule

Agents must pass schema validation and must not fabricate credentials, expertise, or capabilities they do not have.

An agent can claim domain expertise in financial analysis. It cannot claim to be a licensed financial advisor. An agent can provide legal analysis. It cannot claim to be a lawyer.

PMF agents have `hardcoded_constraints` for a reason — use them honestly.

## Submitting a converter

Converters translate PMF JSON into tool-specific formats. To submit a new converter:

1. Place in `converters/to-{tool-name}.js`
2. Read from `agents/` directory recursively
3. Handle all PMF fields
4. Include a stability disclaimer at the top of generated output
5. Print a summary after conversion
6. Open a PR with:
   - Which tool this converts for
   - Which version of the tool you tested against
   - Any known limitations

**Stability note**: Tool-specific formats (Cursor .mdc, Copilot instructions, Gemini CLI GEMINI.md) change with tool releases. Converters may need updates. Include this context in your PR.

## PR process

1. **Validate** — all JSON must pass AJV validation against the schema
2. **Test** — if submitting a converter, test the output in the target tool
3. **Describe** — PR description should explain what and why
4. **One thing** — PRs should do one thing. Agent + converter = two PRs.

## Questions?

For PMF specification depth, see: [*The Portable Mind*](https://a.co/d/03j6BTDP) by JB Wagoner.

For platform questions: [sutra.team](https://sutra.team)
