#!/bin/bash

# 1. Check if input exists
if [ -z "$1" ]; then
  echo "Usage: ./convert-video.sh path/to/video.mov"
  exit 1
fi

INPUT_FILE=$1
# 2. Extract the directory and filename without extension
DIR=$(dirname "$INPUT_FILE")
FILENAME=$(basename -- "$INPUT_FILE")
EXTENSION="${FILENAME##*.}"
FILENAME_NO_EXT="${FILENAME%.*}"

# 3. Define the output path (always .mp4)
OUTPUT_FILE="$DIR/$FILENAME_NO_EXT.mp4"

echo "🔄 Converting and Optimizing: $FILENAME to $FILENAME_NO_EXT.mp4..."

# 4. The FFmpeg Magic
ffmpeg -i "$INPUT_FILE" \
  -vf "scale=800:800:force_original_aspect_ratio=increase,crop=800:800" \
  -vcodec libx264 \
  -crf 28 \
  -pix_fmt yuv420p \
  -an \
  -movflags +faststart \
  -y "$OUTPUT_FILE" # -y overwrites if it exists

# 5. Optional: Remove original if it was a .mov (to keep folder clean)
if [ "$EXTENSION" == "mov" ]; then
  echo "🗑️  Removing original .mov file..."
  rm "$INPUT_FILE"
fi

echo "✅ Success! Created: $OUTPUT_FILE"

# Run in terminal with: ./convert-video.sh public/videos/hero/[file].MOV 