import os
import numpy as np
from PIL import Image
import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.applications import EfficientNetV2S
from tensorflow.keras.applications.efficientnet_v2 import preprocess_input

# Faltu warnings band
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 

print("\n--- 🩺 SKIN DISEASE AI TESTER (API READY MODE) ---")

CLASS_NAMES = [
    "Acne and Rosacea Photos", "Actinic Keratosis Basal Cell Carcinoma and other Malignant Lesions", 
    "Atopic Dermatitis Photos", "Bullous Disease Photos", 
    "Cellulitis Impetigo and other Bacterial Infections", "Eczema Photos", 
    "Exanthems and Drug Eruptions", "Hair Loss Photos Alopecia and other Hair Diseases", 
    "Herpes HPV and other STDs Photos", "Light Diseases and Disorders of Pigmentation", 
    "Lupus and other Connective Tissue diseases", "Melanoma Skin Cancer Nevi and Moles", 
    "Nail Fungus and other Nail Disease", "Poison Ivy Photos and other Contact Dermatitis", 
    "Psoriasis pictures Lichen Planus and related diseases", "Scabies Lyme Disease and other Infestations and Bites", 
    "Seborrheic Keratoses and other Benign Tumors", "Systemic Disease", 
    "Tinea Ringworm Candidiasis and other Fungal Infections", "Urticaria Hives", 
    "Vascular Tumors", "Vasculitis Photos", "Warts Molluscum and other Viral Infections"
]

# 1. AI Ka Jism (Architecture) Tayyar Karna
print("⏳ Model ka Architecture tayyar ho raha hai...")
base_model = EfficientNetV2S(include_top=False, weights=None, input_shape=(224, 224, 3))

model = models.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.BatchNormalization(),
    layers.Dropout(0.5),
    layers.Dense(1024, activation='relu'),
    layers.Dropout(0.4),
    layers.Dense(512, activation='relu'),
    layers.Dense(23, activation='softmax')
])

# 2. AI Ka Dimagh (Weights) Inject Karna
try:
    print("🧠 Original file se Weights load kar rahe hain...")
    model.load_weights('DermNet_Robust_Stable_Original.h5')
    print("✅ Weights Successfully Loaded! Model 100% tayyar hai.")
except Exception as e:
    print(f"❌ Error loading weights: {e}")

def predict_skin_disease(img_path):
    if not os.path.exists(img_path):
        print(f"❌ Error: '{img_path}' nahi mili!")
        return "Error: Image not found", 0.0
        
    try:
        # Standardize Image Shape
        image = Image.open(img_path).convert('RGB').resize((224, 224))
        
        # Tasveer ko RAW array mein convert karein (Bina kisi division ke)
        img_array = np.array(image).astype('float32')
        img_array = np.expand_dims(img_array, axis=0)
        
        # Keras Official Preprocessor
        img_array = preprocess_input(img_array)
        
        # AI prediction kar raha hai (print hata diya taake API fast chale)
        predictions = model.predict(img_array, verbose=0) 
        
        result_index = np.argmax(predictions)
        confidence = np.max(predictions) * 100
        
        disease_name = CLASS_NAMES[result_index]
        confidence_value = round(float(confidence), 2)
        
        # --- MAIN CHANGE: DATA RETURN HO RAHA HAI ---
        return disease_name, confidence_value
        
    except Exception as e:
        print(f"❌ Prediction Error: {e}")
        return "Error: Prediction failed", 0.0

if __name__ == "__main__":
    # Agar aap direct is file ko terminal mein chalayenge toh yeh test run karega
    disease, conf = predict_skin_disease('test.jpg')
    print("="*50)
    print(f"🎯 AI RESULT: {disease}")
    print(f"📈 CONFIDENCE: {conf}%")
    print("="*50)