# 🚗 SuperCar Virtual Sales Assistant - Frontend

## 📝 Overview

This repository contains the frontend implementation for the **SuperCar Virtual Sales Assistant**, a chat-based AI system that helps car dealerships manage customer interactions. The AI assistant, named **Lex**, interacts with users through a chat interface and responds in real-time using **Server-Sent Events (SSE)**.

## 🔥 Features

✅ Built with **Next.js 15**, **TypeScript**, and **TailwindCSS**  
✅ Real-time AI assistant with **SSE streaming**  
✅ Fully responsive and user-friendly **chat interface**  
✅ **Custom UI components** for tool outputs  
✅ Simple **JSON file storage** for session management  
✅ **Dockerized environment** for easy setup  
✅ Error handling

## 📸 UI Screenshots

![Chat Interface](screenshots/chat-ui.png)  
_Main chat interface with real-time streaming responses._

![Appointment Booking](screenshots/appointment-ui.png)  
_Custom component for scheduling an appointment._

## 🏗️ Tech Stack

- **Next.js 15** - Modern framework for SSR & frontend development
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first styling
- **SSE (Server-Sent Events)** - Real-time communication
- **JSON File Storage** - Lightweight data persistence
- **Docker** - Containerized development environment

## 🚀 Getting Started

### 📌 Prerequisites

- **Node.js 18+**
- **Docker (optional, for containerized setup)**

### 📦 Installation

```bash
# Clone the repository
git clone https://github.com/nattyleyo/supercar-assistant.git
cd supercar-assistant/frontend

# Install dependencies
yarn install  # or npm install
```

### 🏃 Running the Application

```bash
# Start the development server
yarn dev  # or npm run dev
```

App will be available at: `http://localhost:3000`

### 🐳 Running with Docker

```bash
# Build and run the frontend container
docker build -t supercar-frontend .
docker run -p 3000:3000 supercar-frontend
```

## 📡 Connecting to the Backend

The backend API must be running on `http://localhost:8000`. Ensure you have the correct API key set up in `.env` before starting the backend.

## 📜 API Endpoints

### 🎤 Query AI Assistant

```http
POST /query
```

**Description**: Sends a user query and receives a streaming response from Lex.

**Request Body:**

```json
{
  "query": "What are the latest car models?",
  "session_id": "user-123"
}
```

**Response Format:** (SSE stream)

- `chunk`: AI response text
- `tool_use`: When the AI uses a tool
- `tool_output`: Result of the tool execution
- `end`: Signals the end of the stream

## 🛠️ Custom UI Components

The assistant utilizes custom UI components for better interaction:

- **Weather Info Component 🌦️** - Displays weather details
- **Dealership Address 📍** - Shows location info
- **Appointment Availability 🗓️** - Displays available time slots
- **Appointment Confirmation ✅** - Shows scheduled test drive details

## 🔎 Evaluation Criteria

Your solution will be judged based on:

1. **Functionality** - Meets all the requirements
2. **Code Quality** - Clean, maintainable, and readable
3. **UI/UX Design** - Responsive, intuitive, and well-structured
4. **Component Design** - Modular and reusable
5. **Error Handling** - Robust handling of failures
6. **Performance** - Optimized for efficiency

## 📩 Submission

When submitting your solution:

1. Ensure all code is **committed** and **pushed** to your GitHub repository.
2. Provide a detailed **README** (like this one!).
3. Include **screenshots** of your UI.

## 📜 License

This project is licensed under the **MIT License**.

## 📌 Frontend Developer

👤 **Natnael Meseret**  
🔗 [GitHub](https://github.com/nattyleyo)

---

✨ I hope this Frontent Test will showcase my ability for you Role,Thank-You 🚀\_

