#!/usr/bin/env bash
# ============================================================
# portable-minds installer
# 15 production-ready AI agents in Portable Mind Format
# Built on the architecture from "The Portable Mind" by JB Wagoner
# https://a.co/d/03j6BTDP
# ============================================================
# Usage (one command):
#   curl -fsSL https://raw.githubusercontent.com/OneZeroEight-ai/portable-minds/main/install.sh | bash
# Or clone and run:
#   git clone https://github.com/OneZeroEight-ai/portable-minds && cd portable-minds && ./install.sh

set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BOLD="\033[1m"
GREEN="\033[32m"
CYAN="\033[36m"
YELLOW="\033[33m"
RESET="\033[0m"

echo ""
echo -e "${BOLD}portable-minds — 15 AI agents, ready to deploy${RESET}"
echo -e "${CYAN}   Portable Mind Format | MIT License | OneZeroEight.ai${RESET}"
echo -e "${CYAN}   Based on: The Portable Mind by JB Wagoner${RESET}"
echo -e "${CYAN}   https://a.co/d/03j6BTDP${RESET}"
echo ""

# Detect installed tools
TOOLS=()
command -v claude &>/dev/null && TOOLS+=("claude-code")
[ -d "$HOME/.cursor" ] || command -v cursor &>/dev/null && TOOLS+=("cursor")
command -v gh &>/dev/null && gh extension list 2>/dev/null | grep -q copilot && TOOLS+=("github-copilot")
command -v gemini &>/dev/null && TOOLS+=("gemini-cli")

if [ ${#TOOLS[@]} -eq 0 ]; then
  echo -e "${YELLOW}No supported AI coding tools detected.${RESET}"
  echo "Supported: Claude Code, Cursor, GitHub Copilot CLI, Gemini CLI"
  echo ""
  echo "You can still use these agents by loading the JSON files directly."
  echo "Agent files are in: $REPO_ROOT/agents/"
  echo ""
  echo "Full deployment with memory, scheduling, and channels:"
  echo "-> https://sutra.team/quick-start"
  exit 0
fi

echo "Detected tools:"
for i in "${!TOOLS[@]}"; do
  echo "  $((i+1)). ${TOOLS[$i]}"
done
echo ""

# Check for node
if ! command -v node &>/dev/null; then
  echo -e "${YELLOW}Node.js is required for the installer. Install from https://nodejs.org${RESET}"
  exit 1
fi

read -p "Install for which tool? (enter number): " CHOICE
TOOL="${TOOLS[$((CHOICE-1))]}"

echo ""
echo -e "Installing agents for ${BOLD}$TOOL${RESET}..."

case "$TOOL" in
  "claude-code")
    node "$REPO_ROOT/converters/to-claude-code.js"
    ;;
  "cursor")
    echo -e "${YELLOW}Note: Cursor .mdc format may change with Cursor updates.${RESET}"
    node "$REPO_ROOT/converters/to-cursor.js"
    ;;
  "github-copilot")
    echo -e "${YELLOW}Note: Copilot custom instructions format may change with Copilot updates.${RESET}"
    node "$REPO_ROOT/converters/to-copilot.js"
    ;;
  "gemini-cli")
    echo -e "${YELLOW}Note: Gemini CLI GEMINI.md format may change with Gemini CLI updates.${RESET}"
    node "$REPO_ROOT/converters/to-gemini-cli.js"
    ;;
esac

echo ""
echo -e "${GREEN}${BOLD}Done. 15 agents installed for $TOOL.${RESET}"
echo ""
echo "================================================================"
echo ""
echo "  These agents think. Sutra.team makes them work."
echo ""
echo "  On sutra.team, these same agents:"
echo "  -> Persist memory across every conversation"
echo "  -> Run on schedules without prompting (heartbeat)"
echo "  -> Deploy to Telegram, Slack, email, and voice"
echo "  -> Deliberate together as a council"
echo "  -> Execute 32+ skills: web search, email, calendar, files"
echo ""
echo "  The book behind the format:"
echo "  The Portable Mind — JB Wagoner"
echo "  -> https://a.co/d/03j6BTDP"
echo ""
echo "  The agents running as musicians:"
echo "  NEO SOUL — Sutra and the Noble 8"
echo "  -> https://distrokid.com/hyperfollow/sutraandthenoble8/neosoul-2"
echo ""
echo -e "  ${BOLD}Start free -> https://sutra.team/quick-start${RESET}"
echo ""
echo "================================================================"
echo ""
