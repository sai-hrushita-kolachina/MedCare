import pandas as pd
import sys
import json
import pickle
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load dataset
df = pd.read_csv(os.path.join(BASE_DIR, "medical_data.csv"))
df['symptom'] = df['symptom'].astype(str).str.strip().str.lower()

# Load model + encoder
model = pickle.load(open(os.path.join(BASE_DIR, "model.pkl"), "rb"))
encoder = pickle.load(open(os.path.join(BASE_DIR, "encoder.pkl"), "rb"))

# Doctor mapping
def doctor_for(disease):
    mapping = {
        "Cardiac Issue": "Cardiologist",
        "Skin Issue": "Dermatologist",
        "Women’s Health Issue": "Gynecologist",
        "Neurological Issue": "Neurologist",
        "Child Health Issue": "Pediatrician",
        "Bone / Muscle / Joint Issue": "Orthopedic",
        "ENT Issue": "ENT Specialist",
        "Gastrointestinal Issue": "Gastroenterologist",
        "Respiratory / Chest Issue": "Pulmonologist",
        "Dental / Oral Issue": "Dentist",
        "General Systemic Issue": "General Physician"
    }
    return mapping.get(disease, "General Physician")

def analyze(symptoms):
    symptoms = symptoms.lower().strip()

    try:
        encoded = encoder.transform([symptoms])
        predicted_disease = model.predict(encoded)[0]
    except:
        predicted_disease = "General Systemic Issue"

    row = df[df['symptom'] == symptoms]

    if row.empty:
        return {
            "success": True,
            "predictedDisease": predicted_disease,
            "specialization": doctor_for(predicted_disease),
            "descriptions": [""],
            "severity": ["Not specified"],
            "precautions": ["No precautions available"]
        }

    row = row.iloc[0]

    return {
        "success": True,
        "predictedDisease": predicted_disease,
        "specialization": doctor_for(predicted_disease),
        "descriptions": [str(row["description"])],
        "severity": [str(row["severityLevel"])],
        "precautions": [str(row["precautions"])]
    }

if __name__ == "__main__":
    try:
        data = json.loads(sys.stdin.read())
        result = analyze(data.get("symptoms", ""))
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))
