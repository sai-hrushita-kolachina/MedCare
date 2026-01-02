import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer

# Load dataset
df = pd.read_csv("medical_data.csv")

# Clean text
df['symptom'] = df['symptom'].astype(str).str.lower().str.strip()

X = df["symptom"]
y = df["disease"]

# TF-IDF vectorizer
vectorizer = TfidfVectorizer()
X_vectorized = vectorizer.fit_transform(X)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X_vectorized, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestClassifier(n_estimators=300, random_state=42)
model.fit(X_train, y_train)

# Save model + vectorizer
pickle.dump(model, open("model.pkl", "wb"))
pickle.dump(vectorizer, open("encoder.pkl", "wb"))

print("MODEL TRAINED SUCCESSFULLY")
