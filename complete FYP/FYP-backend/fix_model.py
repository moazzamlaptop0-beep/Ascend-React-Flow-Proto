import h5py
import json

filename = 'Download_Model.h5'

print("🔧 Model ki file fix hona shuru ho gayi hai...")
try:
    with h5py.File(filename, 'r+') as f:
        # File ke andar se configuration nikal rahe hain
        model_config = json.loads(f.attrs['model_config'])
        
        # Keras 3 ke naye naam ko Keras 2 ke purane naam se badal rahe hain
        for layer in model_config['config']['layers']:
            if 'batch_shape' in layer['config']:
                layer['config']['batch_input_shape'] = layer['config'].pop('batch_shape')
        
        # Theek ki hui configuration wapis file mein save kar rahe hain
        f.attrs['model_config'] = json.dumps(model_config).encode('utf-8')
        print("✅ Zabardast! Model successfully fix ho gaya hai. Ab Keras 2 isey asani se parh lega.")
        
except Exception as e:
    print(f"❌ Kuch masla hua: {e}")