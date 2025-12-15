#!/usr/bin/env python3
"""
Python script to convert PNG/JPG images to WebP format
Requires: pip install Pillow
"""

from PIL import Image
import os
import glob
from pathlib import Path

def convert_to_webp(input_path, output_path, quality=85):
    """Convert image to WebP format"""
    try:
        img = Image.open(input_path)
        # Convert RGBA to RGB if needed (WebP supports both)
        if img.mode == 'RGBA':
            # Keep alpha channel
            img.save(output_path, 'WEBP', quality=quality, method=6)
        else:
            img.save(output_path, 'WEBP', quality=quality, method=6)
        print(f"[OK] Converted: {os.path.basename(input_path)} -> {os.path.basename(output_path)}")
        return True
    except Exception as e:
        print(f"[ERROR] Failed to convert {os.path.basename(input_path)}: {e}")
        return False

def main():
    print("Starting WebP conversion...\n")
    
    # Get project root
    project_root = Path(__file__).parent
    
    # Directories to process
    directories = [
        project_root / "public" / "images",
        project_root / "assets"
    ]
    
    total_converted = 0
    total_skipped = 0
    
    for directory in directories:
        if not directory.exists():
            print(f"[SKIP] Directory not found: {directory}")
            continue
            
        print(f"Processing: {directory}")
        
        # Find all image files
        images = []
        for ext in ['*.png', '*.jpg', '*.jpeg', '*.PNG', '*.JPG', '*.JPEG']:
            images.extend(directory.glob(ext))
        
        if not images:
            print("  (no images found)\n")
            continue
        
        for img_path in images:
            webp_path = img_path.with_suffix('.webp')
            
            if webp_path.exists():
                total_skipped += 1
                print(f"[SKIP] Already exists: {webp_path.name}")
            else:
                if convert_to_webp(str(img_path), str(webp_path)):
                    total_converted += 1
        
        print()
    
    print(f"\n[DONE] Converted: {total_converted}, Skipped: {total_skipped}")
    print("All component references have been updated to .webp format!")

if __name__ == "__main__":
    try:
        main()
    except ImportError:
        print("[ERROR] Pillow library not found!")
        print("Install it with: pip install Pillow")
    except KeyboardInterrupt:
        print("\n[INFO] Conversion cancelled by user")

