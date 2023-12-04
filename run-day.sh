#!/bin/bash

DAY=$1

if [ -z "$DAY" ]; then
    echo "Usage: $0 <day>"
    exit 1
fi

exec npx ts-node src/$DAY/index.ts

