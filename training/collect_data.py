import os
import sys
from types import ModuleType

# ==========================================
# 🔧 THE HOTFIX (Monkey Patching)
# Python 3.13 removed 'imghdr', so we create a fake one
# to stop bing_image_downloader from crashing.
# ==========================================
fake_imghdr = ModuleType("imghdr")

def what(file, h=None):
    # The library uses this to check if a file is an image.
    # We just blindly return 'jpeg' to let everything pass.
    return 'jpeg' 

fake_imghdr.what = what
sys.modules["imghdr"] = fake_imghdr
# ==========================================

# NOW we can import the library safely
from bing_image_downloader import downloader

# 1. Define your aesthetics
aesthetics = {
    "old_money": "old money aesthetic outfit men women",
    "streetwear": "streetwear aesthetic outfit men women",
    "y2k": "y2k fashion aesthetic outfit",
    "goth": "goth fashion aesthetic outfit",
    "gym_rat": "gym aesthetic outfit men women"
}

# 2. Define output path
# This will save to: drip-detector/training/dataset/
output_dir = os.path.join(os.getcwd(), "training", "dataset")

# 3. Run the heist
if __name__ == "__main__":
    for style, query in aesthetics.items():
        print(f"⬇️  Downloading images for: {style}...")
        
        try:
            downloader.download(
                query, 
                limit=60, 
                output_dir=output_dir, 
                adult_filter_off=True, 
                force_replace=False, 
                timeout=60, 
                verbose=False
            )
            print(f"✅ Finished {style}")
            
        except Exception as e:
            print(f"❌ Error downloading {style}: {e}")

    print("\n🎉 Download complete! Now go to 'training/dataset' and organize your folders.")