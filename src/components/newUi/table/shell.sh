#!/bin/bash

# Get system load (CPU usage)
LOAD_IDLE=$(top -bn1 | grep "Cpu(s)" | awk '{print $8}')
echo "CPU Idle: $LOAD_IDLE"

# Ensure LOAD_IDLE is a number
if [[ $LOAD_IDLE =~ ^[0-9]+(\.[0-9]+)?$ ]]; then
    LOAD=$(echo "100 - $LOAD_IDLE" | bc)
    echo "CPU Load: $LOAD"
else
    echo "Error: Unable to parse CPU Idle percentage"
    exit 1
fi

# Set the threshold (e.g., 80%)
THRESHOLD=80

if (( $(echo "$LOAD >= $THRESHOLD" | bc -l) )); then
    # Find the process consuming the most CPU
    TOP_PROCESS=$(ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%cpu | head -n 2 | tail -n 1)
    
    # Send a message to Slack using the webhook URL
    WEBHOOK_URL="https://hooks.slack.com/services/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"
    MESSAGE="High system load: ${LOAD}%\nTop process: ${TOP_PROCESS}"
    curl -X POST -H 'Content-type: application/json' --data "{\"text\":\"$MESSAGE\"}" "$WEBHOOK_URL"
fi
