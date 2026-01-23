from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from app.inference import predict_drip

app = FastAPI()

# 1. Enable CORS (Allow the frontend to talk to this backend)
# In production, you would list specific domains instead of "*"
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "DripDetector API is running! 💧"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # 1. Read the uploaded file
    image_bytes = await file.read()
    
    # 2. Pass it to the Brain
    try:
        result = predict_drip(image_bytes)
        return result
    except Exception as e:
        return {"error": str(e)}