#!/bin/bash
# Script to replace tokens in git history
# Uses pattern matching to find and replace Figma tokens

TOKEN1_PATTERN="figd_[A-Za-z0-9_-]\{40,\}"
TOKEN2_PATTERN="figd_[A-Za-z0-9_-]\{40,\}"
REPLACEMENT="\\\$env:FIGMA_TOKEN"

if [ -f scripts/download-all-contacts-images.ps1 ]; then
    sed -i "s/$TOKEN1_PATTERN/$REPLACEMENT/g" scripts/download-all-contacts-images.ps1
fi

if [ -f scripts/download-contacts-assets-from-figma.ps1 ]; then
    sed -i "s/$TOKEN1_PATTERN/$REPLACEMENT/g" scripts/download-contacts-assets-from-figma.ps1
fi

if [ -f scripts/get-figma-file-structure.ps1 ]; then
    sed -i "s/$TOKEN1_PATTERN/$REPLACEMENT/g" scripts/get-figma-file-structure.ps1
fi

if [ -f scripts/download-contacts-images.ps1 ]; then
    sed -i "s/$TOKEN2_PATTERN/$REPLACEMENT/g" scripts/download-contacts-images.ps1
fi
