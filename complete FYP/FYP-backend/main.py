from fastapi import FastAPI, Depends, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from passlib.context import CryptContext
import models, schemas
from database import engine, get_db
import tensorflow as tf
import numpy as np
from PIL import Image
import io
from typing import List

# 1. Database Tables Create Karna
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Derma Final Backend")

# 2. CORS Settings (Taake Frontend asani se connect ho sakay)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Password Hashing Setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ==========================================
# 4. Load AI Model (YAHAN CHANGE KIYA HAI)
# ==========================================
print("🧠 Loading AI Model... Please wait...")
MODEL = tf.keras.models.load_model("Download_Model.h5") 
print("✅ AI Model Loaded Successfully!")

# 5. Full list of class names 
# ⚠️ ZAROORI BAAT: Yeh list bilkul usi tarteeb (A to Z) mein honi chahiye jaise Colab mein thi!
CLASS_NAMES = [
    "Acne and Rosacea Photos", 
    "Actinic Keratosis Basal Cell Carcinoma and other Malignant Lesions", 
    "Atopic Dermatitis Photos", 
    "Bullous Disease Photos", 
    "Cellulitis Impetigo and other Bacterial Infections", 
    "Eczema Photos", 
    "Exanthems and Drug Eruptions",
    "Hair Loss Photos Alopecia and other Hair Diseases", 
    "Herpes HPV and other STDs Photos", 
    "Light Diseases and Disorders of Pigmentation", 
    "Lupus and other Connective Tissue diseases", 
    "Melanoma Skin Cancer Nevi and Moles", 
    "Nail Fungus and other Nail Disease", 
    "Poison Ivy Photos and other Contact Dermatitis", 
    "Psoriasis pictures Lichen Planus and related diseases", 
    "Scabies Lyme Disease and other Infestations and Bites", 
    "Seborrheic Keratoses and other Benign Tumors", 
    "Systemic Disease", 
    "Tinea Ringworm Candidiasis and other Fungal Infections", 
    "Urticaria Hives", 
    "Vascular Tumors", 
    "Vasculitis Photos", 
    "Warts Molluscum and other Viral Infections"
]

@app.get("/")
def home():
    return {"message": "AI Derma Backend is Live and Ready! 🎉"}

# --- AUTHENTICATION ENDPOINTS ---

@app.post("/signup", response_model=schemas.UserResponse)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered!")
    
    hashed_pw = pwd_context.hash(user.password)
    new_user = models.User(name=user.name, email=user.email, password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not pwd_context.verify(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid Credentials")
    return {"message": "Login Success", "user_id": db_user.id, "user_name": db_user.name}

# --- AI SCAN & HISTORY ENDPOINTS ---

@app.post("/scan/{user_id}", response_model=schemas.AIScanResponse)
async def scan_skin(user_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    # 1. User Verification
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User ID nahi mili! Pehle signup karein.")

    try:
        # ==============================================================
        # 2. Perfect Image Processing for EfficientNetV2-S (CHANGE KIYA)
        # ==============================================================
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert('RGB').resize((224, 224))
        img_array = np.array(image) / 255.0  # Normalize (0 to 1)
        img_array = np.expand_dims(img_array, axis=0) # Add batch dimension

        # 3. AI Prediction
        predictions = MODEL.predict(img_array)
        idx = np.argmax(predictions[0])
        disease = CLASS_NAMES[idx]
        conf = float(np.max(predictions[0]) * 100)

        # 4. Save Record to Database
        new_scan = models.AIScan(
            user_id=user_id,
            prediction_result=disease,
            confidence=conf,
            image_url=file.filename # Yahan aap cloud URL bhi de sakte hain agar AWS S3 waghaira use karein
        )
        db.add(new_scan)
        db.commit()
        db.refresh(new_scan)
        return new_scan

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image process karte hue error aaya: {str(e)}")

@app.get("/history/{user_id}", response_model=List[schemas.AIScanResponse])
def get_history(user_id: int, db: Session = Depends(get_db)):
    # Check if user exists
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found!")
        
    return db.query(models.AIScan).filter(models.AIScan.user_id == user_id).all()