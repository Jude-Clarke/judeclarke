#!/bin/bash

# Check if a file path was provided
if [ -z "$1" ]; then
  echo "Usage: ./optimize-video.sh path/to/video.mp4"
  exit 1
fi

INPUT_FILE=$1
# Create a temporary filename
TEMP_FILE="${INPUT_FILE%.*}-tmp.mp4"

echo "🚀 Optimizing $INPUT_FILE..."

# Run the FFmpeg command
ffmpeg -i "$INPUT_FILE" \
  -vf "scale=800:800:force_original_aspect_ratio=increase,crop=800:800" \
  -vcodec libx264 -crf 28 -pix_fmt yuv420p -an -movflags +faststart \
  "$TEMP_FILE"

# Overwrite the original file with the optimized one
mv "$TEMP_FILE" "$INPUT_FILE"

echo "✅ Optimization complete! $INPUT_FILE is now web-ready."