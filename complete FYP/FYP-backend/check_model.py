import h5py
import json

print("\n--- 🕵️ MODEL DETECTIVE ---")
try:
    # Apni original file ka naam likhein
    with h5py.File('DermNet_Robust_Stable_Original.h5', 'r') as f:
        model_config = json.loads(f.attrs.get('model_config'))
        
        print(f"Model Type: {model_config['class_name']}")
        
        layers = model_config['config']['layers']
        print(f"Total Layers: {len(layers)}")
        
        print("\n📌 Start ke Layers (Base Model Check):")
        for l in layers[:10]:
            print(f"  - {l['config']['name']} ({l['class_name']})")
            
        print("\n📌 Aakhri Layers (Classifier Check):")
        for l in layers[-8:]:
            print(f"  - {l['config']['name']} ({l['class_name']})")
            
except Exception as e:
    print(f"❌ Error: {e}")