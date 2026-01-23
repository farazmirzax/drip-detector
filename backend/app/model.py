import torch
import torch.nn as nn
from torchvision import models

def get_model(num_classes=5):
    # 1. Load the empty skeleton of ResNet18
    # We use weights=None because we are about to load YOUR trained weights
    model = models.resnet18(weights=None)

    # 2. Re-do the surgery (Replace the head)
    # We must match exactly what we did in the notebook
    num_ftrs = model.fc.in_features
    model.fc = nn.Linear(num_ftrs, num_classes)

    return model