import io
from PIL import Image
from torchvision import transforms

# Same stats as training
mean = [0.485, 0.456, 0.406]
std = [0.229, 0.224, 0.225]

def transform_image(image_bytes):
    # 1. Define the transformation pipeline
    my_transforms = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean, std)
    ])
    
    # 2. Open the image file
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    
    # 3. Transform it and add a "Batch Dimension"
    # The model expects [Batch_Size, Channels, Height, Width] -> [1, 3, 224, 224]
    return my_transforms(image).unsqueeze(0)