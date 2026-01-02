from flask import Flask, request, jsonify
from flask_cors import CORS
from predict import analyze
import os

app = Flask(__name__)

CORS(app, resources={
    r"/*": {
        "origins": [
            "https://medcare24.vercel.app",
            "https://med-care-admin.vercel.app",
            "http://localhost:5173",
            "http://localhost:5174"
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": True
    }
})

@app.route("/analyze", methods=["POST"])
def analyze_route():
    try:
        symptoms = request.json.get("symptoms", [])

        if isinstance(symptoms, list):
            symptoms = " ".join(symptoms)

        result = analyze(symptoms)
        return jsonify(result)
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
