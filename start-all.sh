#!/bin/bash

echo "Starting AlphaPulse backend..."
cd backend
source .venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

echo "Starting AlphaPulse frontend..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo "AlphaPulse is running."
echo "Frontend: http://127.0.0.1:8080"
echo "Backend docs: http://127.0.0.1:8000/docs"

wait