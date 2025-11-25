# Coinexa VisionAI Backend

This is the backend API for Coinexa's chart analysis AI.

## 🟦 Features
- Accepts chart uploads
- Sends chart to OpenAI Vision
- Returns analysis (trend, BOS/CHoCH, liquidity, SL/TP levels)
- Fully compatible with GitHub Pages frontend

---

## 🚀 Deployment Guide (Render)

### 1. Upload these files to your `coinexa-backend` GitHub repo

### 2. Go to Render.com → New → Web Service

### 3. Select:
- Repository: `coinexa-backend`
- Runtime: Node
- Build Command: `npm install`
- Start Command: `npm start`

### 4. Add your environment variable:
