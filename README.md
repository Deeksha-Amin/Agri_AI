# Multi-Part Tomato Disease Detection System with Treatment Recommendation

A web-based AI diagnosis application for tomato crop health monitoring, developed for final-year engineering project demonstration and IEEE research presentation.

## Project Architecture

- **Frontend**: React.js, Vite, Tailwind CSS, Lucide React icons, React Router DOM.
- **Backend**: Python, Flask REST API, Flask-CORS, TensorFlow/Keras, ReportLab, PyMongo.
- **AI Models**:
  - **DenseNet121**: 10-class leaf disease classifier (	omato_disease_model.keras).
  - **YOLOv8**: Architecture ready for future fruit and stem disease detection.
  - **Decision Fusion Engine**: Aggregates multi-part plant model confidence scores.

## Setup & Running

### 1. Backend Setup (Flask REST API)
`ash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python app.py
`
Backend runs at: http://127.0.0.1:5000

### 2. Frontend Setup (React + Vite)
`ash
cd frontend
npm install
npm run dev
`
Frontend runs at: http://localhost:3000

## API Endpoints

- GET /api/health - Backend and model status health check.
- POST /api/predict/leaf - Leaf DenseNet121 model prediction.
- POST /api/predict/fruit - Fruit YOLOv8 model prediction (Integration pending).
- POST /api/predict/stem - Stem YOLOv8 model prediction (Integration pending).
- POST /api/fusion - Decision fusion engine.
- POST /api/report - ReportLab PDF report download generator.
- POST /api/contact - Submit contact message.

## Team
- **Team Name**: Agri AI
- **Contact Email**: kdeeksha918@gmail.com