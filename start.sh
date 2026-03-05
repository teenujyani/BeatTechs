#!/bin/bash

# Start Backend API
echo "🚀 Starting Backend API..."
cd Backend/api
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start Frontend
echo "🎨 Starting Frontend..."
cd ../..
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Services started!"
echo "📡 Backend API: http://localhost:5000"
echo "🌐 Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop all services"

# Trap Ctrl+C to kill both processes
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT

# Wait for both processes
wait
