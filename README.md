# 🩺MedCare

MedCare is a full-scale **AI + Full-Stack Web Application** that combines **intelligent symptom analysis**, **doctor recommendation**, and **digital session booking management** into a single platform.

This project integrates **Machine Learning**, **Modern Web Development**, **secure authentication**, **online payments**, and **independently deployed services**, reflecting real-world healthcare software architecture.

### Live Demo : https://medcare24.vercel.app/

---

## 1. Introduction

#### Healthcare often begins with uncertainty. Patients may experience symptoms but are unsure about:

- The seriousness of their condition  
- Which specialist to consult  
- How to proceed efficiently  

#### **MedCare bridges this gap** by offering:

- AI-assisted symptom analysis  
- Doctor and specialization recommendation  
- Online session booking  
- Secure digital payments  

#### MedCare is **not a simple CRUD application**. It is a **distributed, production-style system** combining:

- Web Development  
- Artificial Intelligence & Machine Learning  
- Cloud Deployment  
- Microservice Architecture  
- API Contract Design  
- Production-Level Debugging  

---

## 2. Project Goals

#### The primary goals of this project are:

- Build an AI-powered symptom analysis system  
- Integrate Machine Learning with a web application  
- Deploy ML as an independent microservice  
- Design stable frontend–backend–ML data contracts  
- Simulate real-world healthcare software architecture  
- Gain hands-on production debugging experience  

---

## 3. High-Level Architecture

MedCare follows a **multi-service architecture**, where each component is independently deployed and communicates via REST APIs.

User Browser → Frontend  → Backend → ML Service → Chatbot UI → MongoDB → Admin & Booking APIs → Payment Verification
          
  ---

## 4. Core Capabilities

### Patient :

- Secure registration and login
- Enter symptoms using chatbot
- View AI disease prediction
- Browse doctors and specializations
- Book consultation sessions online
- Direct Tele-Consultation with Doctors
- Pay consultation fees securely
- View booking history

### Admin :

- Add, update & remove doctors
- Handle all the bookings
- Manage platform operations completely
- Unified admin dashboard

---
## 5. Installation & Setup
Follow the steps below to run the **MedCare** project locally.

### (a) Clone the Repository

- git clone https://github.com/sai-hrushita-kolachina/MedCare.git
- cd MedCare

### (b) Backend Setup
- cd backend
- npm install
- npm start

  #### Create a .env file inside the backend

- MONGO_URL=your_mongodb_urL
- STRIPE_KEY_SECRET=your_stripe_key_secret
- JWT_SECRET=your_secret_key
- PORT=4000
- VITE_FRONTEND_URL=http://localhost:5173
- VITE_ADMIN_URL=http://localhost:5174


### (c) Frontend Setup
- cd frontend
- npm install
- npm run dev

  #### Create a .env file inside the frontend
- VITE_BACKEND_URL=http://localhost:4000
- VITE_ML_URL=http://localhost:4001


### (d) Admin Panel Setup
- cd admin
- npm install
- npm run dev

  #### Create a .env file inside the admin:
- VITE_BACKEND_URL=http://localhost:4000


### (e) Machine Learning Service Setup (Flask)
- cd ml
- pip install -r requirements.txt
- python server.py

## Service Connectivity Overview
- Frontend → http://localhost:5173
- Admin → http://localhost:5174
- Backend → http://localhost:4000
- ML Backend → http://localhost:4001

---

## 6. Frontend

### Tech Stack :

- React.js (Vite)
- JavaScript (ES6+)
- HTML / CSS
- Axios / Fetch API

### Overview :

- Deployed on Vercel
- Responsibilities
- UI rendering
- AI chatbot interaction
- Sending symptoms to ML API
- Displaying disease predictions
- Doctor browsing and filtering
- Session booking
- Secure route protection

---

## 7. Backend

### Tech Stack :

- MongoDB (Mongoose ODM)
- Node.js
- Express.js
- JWT Authentication
- Stripe API & Webhooks

### Overview :

- User authentication & authorization
- Role-based access control
- Doctor management
- Tele-Consulation booking system
- Secure REST APIs
- Payment verification
- Admin dashboard support
#### The backend is fully decoupled from ML logic.

--- 

## 8. Admin Panel

### Tech Stack :

- React.js (Vite)
- JavaScript (ES6+)
- HTML / CSS
- Axios / Fetch API

### Overview :

- Admin authentication
- Dashboard access control
- Add / edit / delete doctors
- Manage doctor details
- View and update booking status
- Monitor user bookings
- Secure admin-only routes

---

## 9. ML

### Tech Stack :
- Python
- Flask
- Scikit-learn
- TF-IDF Vectorizer
- Random Forest Classifier

### Dataset Description :

The dataset includes structured medical data  

- Symptom (text)
- Disease category
- Description
- Severity level
- Precautions
  
Each record supports prediction and explanation.

### ML Preprocessing :

Steps involved 

- Lowercasing text
- Removing extra whitespace
- Normalizing symptom strings
- Vectorizing text using TF-IDF
- TF-IDF was chosen for Multi-word symptom support, Better NLP understanding & Scalability
  
### ML Model :

- Algorithm: RandomForestClassifier
- Number of estimators: 300
- Trained on TF-IDF vectors
- Chosen for Non-linear relationship handling, Robust performance & Stability on textual data

### ML API Design:

#### Endpoint : POST /analyze
- Request Format :
{
  "symptoms": "headache"
}

- Response Format :
{
  "success": true, 
  "predictedDisease": "Neurological Issue", 
  "specialization": "Neurologist" , 
  "descriptions": ["Headache may be caused by stress or fatigue."] , 
  "severity": ["Mild"] , 
  "precautions": ["Drink fluids", "Take adequate rest"]
}

A strict response schema prevents frontend runtime errors.

### Data Contract Enforcement :

- To ensure stability between ML and frontend:
- Always return arrays from ML
- Prevent undefined values
- Safe frontend .join() handling
- Backend normalization logic

---

## 10. Chatbot (Healio)

### Healio is an AI-powered chatbot that:

- Accepts natural language symptom input
- Extracts known symptoms from user text
- Sends structured data to the ML API
- Displays disease explanations, severity, and precautions
- The chatbot improves usability by making medical interaction conversational rather than form-based.

---

## 11. Payment Gateway Integration (Stripe)

MedCare integrates Stripe for secure online payments.

### Payment Features
- Stripe checkout on frontend
- Backend order creation
- Payment verification after success
- Booking confirmation only after payment
- Supports UPI, Cards, Net Banking, Wallets
##### No card or UPI data is stored on the server.

--- 

## 12. CORS & Deployment Challenges

### Services are deployed on different platforms:

- Frontend → Vercel
- Backend → Render
- ML Backend → Railway
  
### CORS configuration handled in:
- Express backend
- Flask ML service

### Proper handling of:
- Allowed origins
- Headers
- Preflight requests

---
  
## 13. Production Debugging Experience

### Key real-world issues solved:
- JSON payload structure errors
- Runtime crashes
- ML retraining inconsistencies
- ML Redeploy issues

--- 

## 14. Security Measures
- JWT-based authentication
- Protected admin routes
- Role-based access control
- Input sanitization
- Restricted CORS origins

--- 

## 15. Deployment

- Frontend → Vercel
- Backend → Render
- ML Backend → Railway
- Admin → Vercel

---

## 16. Machine Learning Service (Separate Deployment)

### Why Separate ML Deployment?
The ML system is deployed as a standalone Flask API to simulate real-world AI systems.

### Benefits :
- Independent scaling
- Easy model updates
- Clean separation of concerns
- Real production ML deployment experience

---

## 17. Learning Outcomes

### This project strengthened understanding of:
- AI + Web integration
- ML deployment strategies
- Secure API design
- Distributed systems
- Production deployment workflows

---

## 18. Future Enhancements

- Multi-Factor Authentication (MFA)
- Doctor ratings & review
- Email / SMS notifications
- Booking cancellation refunds

--- 

## 19. Final Notes
- MedCare demonstrates how AI systems and web platforms can be responsibly integrated in healthcare
- It emphasizes clean architecture, stable contracts, and real-world engineering discipline.
- © 2025 – MedCare

--- 

## 20. Author
- Sai Hrushita Kolachina

---
