#!/usr/bin/env bash

# Reads the PreToolUse payload on stdin and blocks dangerous git commands.
# Matches patterns against the raw JSON so it works without jq installed.
INPUT=$(cat)

# Prefer jq when available for a precise read of the command; otherwise fall
# back to scanning the raw payload.
if command -v jq >/dev/null 2>&1; then
  COMMAND=$(printf '%s' "$INPUT" | jq -r '.tool_input.command // empty')
else
  COMMAND=$INPUT
fi

DANGEROUS_PATTERNS=(
  "git push"
  "git reset --hard"
  "git clean -fd"
  "git clean -f"
  "git branch -D"
  "git checkout \."
  "git restore \."
  "push --force"
  "reset --hard"
)

for pattern in "${DANGEROUS_PATTERNS[@]}"; do
  if printf '%s' "$COMMAND" | grep -qE "$pattern"; then
    echo "BLOCKED: command matches dangerous pattern '$pattern'. The user has prevented you from doing this." >&2
    exit 2
  fi
done

exit 0
