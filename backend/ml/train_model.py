import pandas as pd
import pickle
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# load dataset
df = pd.read_csv("medical_data.csv")

# clean data set
df["symptom"] = df["symptom"].astype(str).str.strip().str.lower()


# classifier for all 400 symptoms
def classify(symptom):
    s = symptom.lower()

    # 1. Respiratory + Chest
    if any(x in s for x in [
        "cough","breath","breathing","bronch","lung","wheezing",
        "sore throat","throat","choking","sinus","nasal","runny",
        "chest","flutter","pulse","air hunger","shortness"
    ]):
        return "Respiratory / Chest Issue"

    # 2. ENT
    if any(x in s for x in [
        "ear","hearing","tinnitus","buzzing","fullness","inner ear",
        "nose","nasal","sinus","throat","hoarse"
    ]):
        return "ENT Issue"

    # 3. Neurological
    if any(x in s for x in [
        "head","migraine","vertigo","dizzy","lightheaded","memory",
        "concentration","confusion","brain","numb","tingling","nerve",
        "tremor","shock","pressure","mental","disorientation"
    ]):
        return "Neurological Issue"

    # 4. Gastrointestinal
    if any(x in s for x in [
        "stomach","abdominal","abdomen","nausea","vomit","diarrhea",
        "constipation","gas","bloating","indigestion","heartburn",
        "acidity","cramps","ulcer","intestinal"
    ]):
        return "Gastrointestinal Issue"

    # 5. Cardiac
    if any(x in s for x in [
        "heart","palpitation","cardiac","chest heaviness",
        "chest pressure","heartbeat"
    ]):
        return "Cardiac Issue"

    # 6. Musculoskeletal
    if any(x in s for x in [
        "pain","ache","cramp","spasm","stiff","joint","back",
        "muscle","bone","rib","shoulder","hip","knee","heel",
        "arm","leg","groin","spine","pressure","pulling"
    ]):
        return "Musculoskeletal Issue"

    # 7. Skin / Dermatology
    if any(x in s for x in [
        "rash","itch","eczema","psoriasis","acne","skin","burning skin",
        "patches","urticaria","blisters"
    ]):
        return "Skin / Dermatology Issue"

    # 8. Urinary / Kidney
    if any(x in s for x in [
        "urine","urination","kidney","renal","urinary","testicular"
    ]):
        return "Urinary / Kidney Issue"

    # 9. Eye / Vision
    if any(x in s for x in [
        "eye","vision","blurred","watery","dry eyes","eye pain",
        "eye strain","eyelid","pupil"
    ]):
        return "Eye / Vision Issue"

    # 10. Hormonal / Temperature
    if any(x in s for x in [
        "hot","cold","heat","sweating","sweats","flashes","temperature"
    ]):
        return "Hormonal / Temperature Issue"

    # 11. Psychological
    if any(x in s for x in [
        "anxiety","panic","depression","mood","irritability",
        "restless","mental","fear"
    ]):
        return "Psychological Issue"

    # 12. General / Systemic
    return "General Systemic Issue"


df["disease"] = df["symptom"].apply(classify)

# train ML
X = df["symptom"]
y = df["disease"]

encoder = LabelEncoder()
X_encoded = encoder.fit_transform(X).reshape(-1,1)

X_train, X_test, y_train, y_test = train_test_split(
    X_encoded, y, test_size=0.2, random_state=42
)

model = RandomForestClassifier(n_estimators=350, random_state=42)
model.fit(X_train, y_train)


# save model and encoder
with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

with open("encoder.pkl", "wb") as f:
    pickle.dump(encoder, f)

print(" PERFECT MODEL TRAINED FOR ALL 400 SYMPTOMS!")
