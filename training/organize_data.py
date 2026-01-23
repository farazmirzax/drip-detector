import os
import shutil

# 1. Define the mapping (Same as before)
# Key = Where we WANT them (Clean)
# Value = Where they ARE now (Ugly)
aesthetics = {
    "old_money": "old money aesthetic outfit men women",
    "streetwear": "streetwear aesthetic outfit men women",
    "y2k": "y2k fashion aesthetic outfit",
    "goth": "goth fashion aesthetic outfit",
    "gym_rat": "gym aesthetic outfit men women"
}

# 2. Paths
base_dir = os.path.join(os.getcwd(), "training", "dataset")

# 3. The Cleanup Loop
print("🧹 Starting cleanup...")

for clean_name, ugly_query in aesthetics.items():
    clean_path = os.path.join(base_dir, clean_name)
    ugly_path = os.path.join(base_dir, ugly_query)

    # Only proceed if the ugly folder actually exists
    if os.path.exists(ugly_path):
        print(f"📦 Moving files from '{ugly_query}' -> '{clean_name}'...")
        
        # Move every file
        for filename in os.listdir(ugly_path):
            src = os.path.join(ugly_path, filename)
            dst = os.path.join(clean_path, filename)
            
            # Avoid overwriting if file exists
            if os.path.exists(dst):
                # Rename it slightly to avoid collision
                name, ext = os.path.splitext(filename)
                dst = os.path.join(clean_path, f"{name}_new{ext}")
            
            shutil.move(src, dst)
        
        # Delete the now empty ugly folder
        os.rmdir(ugly_path)
        print("   ✅ Moved and deleted source folder.")
    else:
        print(f"   ⚠️ Could not find folder: {ugly_query} (Maybe already cleaned?)")

print("\n✨ All done! Your folders should now be perfect.")