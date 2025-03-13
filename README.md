<h1>🚗 SuperCar Virtual Sales Assistant - Frontend</h1>

<h2>📝 Overview</h2>
<p>This repository contains the frontend implementation for the <strong>SuperCar Virtual Sales Assistant</strong>, a chat-based AI system that helps car dealerships manage customer interactions. The AI assistant, named <strong>Lex</strong>, interacts with users through a chat interface and responds in real-time using <strong>Server-Sent Events (SSE)</strong>.</p>

<h2>🔥 Features</h2>
<ul>
    <li>✅ Built with <strong>Next.js 15</strong>, <strong>TypeScript</strong>, and <strong>TailwindCSS</strong></li>
    <li>✅ Real-time AI assistant with <strong>SSE streaming</strong></li>
    <li>✅ Fully responsive and user-friendly <strong>chat interface</strong></li>
    <li>✅ <strong>Custom UI components</strong> for tool outputs</li>
    <li>✅ Simple <strong>JSON file storage</strong> for session management</li>
    <li>✅ <strong>Dockerized environment</strong> for easy setup</li>
    <li>✅ Error handling</li>
</ul>

<h2>📸 UI Screenshots</h2>
<img src="https://github.com/nattyleyo/Next-Frontend-Test/blob/44bb1e6e65eef054c3754a6f7c7008bad8ea0aa4/public/screenshots/Screenshot-(421).png" alt="Chat Interface" />

<h2>🏗️ Tech Stack</h2>
<ul>
    <li><strong>Next.js 15</strong> - Modern framework for SSR & frontend development</li>
    <li><strong>TypeScript</strong> - Type-safe development</li>
    <li><strong>TailwindCSS</strong> - Utility-first styling</li>
    <li><strong>SSE (Server-Sent Events)</strong> - Real-time communication</li>
    <li><strong>JSON File Storage</strong> - Lightweight data persistence</li>
    <li><strong>Docker</strong> - Containerized development environment</li>
</ul>

<h2>🚀 Getting Started</h2>

<h3>📌 Prerequisites</h3>
<ul>
    <li><strong>Node.js 18+</strong></li>
    <li><strong>Docker (optional, for containerized setup)</strong></li>
</ul>

<h3>📦 Installation</h3>
<pre><code>
# Download the frontend code and insert it into the full-stack folder
git clone https://github.com/nattyleyo/supercar-assistant.git
cd supercar-assistant/frontend

# Install dependencies

yarn install # or npm install
</code></pre>

<h3>🏃 Running the Application</h3>
<pre><code>
# Start the development server
yarn dev # or npm run dev
</code></pre>
<p>App will be available at: <a href="http://localhost:3000">http://localhost:3000</a></p>

<h3>🐳 Running with Docker</h3>
<pre><code>
# Build and run the frontend container
docker build -t supercar-frontend .
docker run -p 3000:3000 supercar-frontend
</code></pre>

<h2>📡 Connecting to the Backend</h2>
<p>The backend API must be running on <strong>http://localhost:8000</strong>. Ensure you have the correct API key set up in <code>.env</code> before starting the backend.</p>

<h2>📜 API Endpoints</h2>

<h3>🎤 Query AI Assistant</h3>
<pre><code>
POST /query
</code></pre>
<p><strong>Description</strong>: Sends a user query and receives a streaming response from Lex.</p>
<p><strong>Request Body:</strong></p>
<pre><code>
{
  "query": "What are the latest car models?",
  "session_id": "user-123"
}
</code></pre>
<p><strong>Response Format:</strong> (SSE stream)</p>
<ul>
    <li><code>chunk</code>: AI response text</li>
    <li><code>tool_use</code>: When the AI uses a tool</li>
    <li><code>tool_output</code>: Result of the tool execution</li>
    <li><code>end</code>: Signals the end of the stream</li>
</ul>

<h2>🛠️ Custom UI Components</h2>
<p>The assistant utilizes custom UI components for better interaction:</p>
<ul>
    <li><strong>Weather Info Component 🌦️</strong> - Displays weather details</li>
    <li><strong>Dealership Address 📍</strong> - Shows location info</li>
    <li><strong>Appointment Availability 🗓️</strong> - Displays available time slots</li>
    <li><strong>Appointment Confirmation ✅</strong> - Shows scheduled test drive details</li>
</ul>

<h2>📌 Frontend Developer</h2>
<p>👤 <strong>Natnael Meseret</strong><br />
🔗 <a href="https://github.com/nattyleyo">GitHub</a></p>

<hr />

<p>✨ I hope this Frontend Test will showcase my ability for your role. Thank you 🚀</p>
