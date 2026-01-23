import torch
import os
from app.model import get_model
from app.utils import transform_image

# 1. Define Classes (Must be in same alphabetical order as training folders!)
CLASSES = ["goth", "gym_rat", "old_money", "streetwear", "y2k"]

# 2. Load the model ONCE when this file runs
# (We don't want to reload it for every single user request, that's slow)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
WEIGHTS_PATH = os.path.join(BASE_DIR, "..", "weights", "drip_model.pth")

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model = get_model(num_classes=len(CLASSES))

# Load your trained weights
if os.path.exists(WEIGHTS_PATH):
    model.load_state_dict(torch.load(WEIGHTS_PATH, map_location=device))
    model.to(device)
    model.eval() # Set to evaluation mode (No learning, just predicting)
    print("✅ Model loaded successfully!")
else:
    print("⚠️ WARNING: Model weights not found at:", WEIGHTS_PATH)

def predict_drip(image_bytes):
    # 1. Preprocess
    tensor = transform_image(image_bytes).to(device)
    
    # 2. Predict
    with torch.no_grad():
        outputs = model(tensor)
        
        # Get probabilities (Softmax)
        probabilities = torch.nn.functional.softmax(outputs, dim=1)
        
        # Get the winner
        confidence, predicted_idx = torch.max(probabilities, 1)
        
        predicted_class = CLASSES[predicted_idx.item()]
        confidence_score = confidence.item()

    return {
        "style": predicted_class,
        "confidence": f"{confidence_score:.2%}",
        "raw_scores": {class_name: f"{prob:.2%}" for class_name, prob in zip(CLASSES, probabilities[0])}
    }