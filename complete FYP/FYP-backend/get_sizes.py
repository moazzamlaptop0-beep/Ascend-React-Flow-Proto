import h5py
import json

print("\n--- 🕵️ LAYER SIZES DETECTIVE ---")
try:
    with h5py.File('DermNet_Robust_Stable_Original.h5', 'r') as f:
        model_config = json.loads(f.attrs.get('model_config'))
        layers = model_config['config']['layers']
        
        print("\n📌 Aapke Model ka Asli Structure:")
        for l in layers[-8:]:
            name = l['class_name']
            if 'Dense' in name:
                print(f"🔹 {name} -> Units: {l['config']['units']}")
            elif 'Dropout' in name:
                print(f"🔸 {name} -> Rate: {l['config']['rate']}")
                
except Exception as e:
    print(f"❌ Error: {e}")