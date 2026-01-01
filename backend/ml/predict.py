import pandas as pd
import sys
import json
import pickle
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load dataset
df = pd.read_csv(os.path.join(BASE_DIR, "medical_data.csv"))

df['symptom'] = df['symptom'].astype(str).str.strip().str.lower()

# Load ML model and encoder
model = pickle.load(open(os.path.join(BASE_DIR, "model.pkl"), "rb"))
encoder = pickle.load(open(os.path.join(BASE_DIR, "encoder.pkl"), "rb"))


def doctor_for(disease):
    mapping = {
        "Respiratory / Chest Issue": "Pulmonologist",
        "Gastrointestinal Issue": "Gastroenterologist",
        "Neurological Issue": "Neurologist",
        "Musculoskeletal Issue": "Orthopedic Specialist",
        "Cardiac Issue": "Cardiologist",
        "Urinary / Kidney Issue": "Urologist",
        "Skin / Dermatology Issue": "Dermatologist",
        "Eye / Vision Issue": "Ophthalmologist",
        "ENT Issue": "ENT Specialist",
        "Hormonal / Temperature Issue": "Endocrinologist",
        "Psychological Issue": "Psychiatrist",
        "General Systemic Issue": "General Physician"
    }
    return mapping.get(disease, "General Physician")

# main function
def analyze(symptoms):
    symptoms = [s.strip().lower() for s in symptoms]
    
    # Model prediction for each symptom
    predicted_diseases = []
    for s in symptoms:
        try:
            encoded = encoder.transform([s])
            pred = model.predict([[encoded[0]]])[0]
            predicted_diseases.append(pred)
        except:
            predicted_diseases.append("General Systemic Issue")

    # Most frequent predicted disease = final predicted disease
    if len(predicted_diseases) == 0:
        final_disease = "General Systemic Issue"
    else:
        final_disease = max(set(predicted_diseases), key=predicted_diseases.count)

    # Match symptoms in data set
    matched_rows = df[df['symptom'].isin(symptoms)]

    # If nothing matched from CSV
    if matched_rows.empty:
        return {
            "success": True,
            "predictedDisease": final_disease,
            "descriptions": [],
            "severity": [],
            "precautions": []
        }

    # now merge descriptions, severities, precautions
    descriptions = matched_rows['description'].unique().tolist()

    severities = matched_rows['severityLevel'].unique().tolist()

    precautions = []
    for p in matched_rows['precautions'].dropna():
        for x in p.split('.'):
            px = x.strip()
            if px:
                precautions.append(px)

    precautions = list(set(precautions))

    # Final one
    return {
        "success": True,
        "symptoms": symptoms,
        "predictedDisease": final_disease,
        "specialization": doctor_for(final_disease),
        "descriptions": descriptions,
        "severity": severities,
        "precautions": precautions
    }


# node (python communication)
if __name__ == "__main__":
    try:
        data = json.loads(sys.stdin.read())
        result = analyze(data.get("symptoms", []))
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))
