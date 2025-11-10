// ===== Bond007-AI Frontend Logic =====

// --- AI Job Search Mock Logic ---
function searchJobs() {
  const query = document.getElementById("jobInput").value.trim();
  const resultsDiv = document.querySelector(".search-results");
  
  if (!query) {
    resultsDiv.innerHTML = "<p class='placeholder'>Please enter a job or internship role.</p>";
    return;
  }

  // Mocked AI results
  const sampleJobs = [
    { title: "Frontend Developer", company: "Google", location: "Remote" },
    { title: "Machine Learning Intern", company: "Amazon", location: "Hyderabad" },
    { title: "Cloud Engineer", company: "Microsoft", location: "Bangalore" },
    { title: "Data Analyst Intern", company: "TCS", location: "Chennai" },
  ];

  const filtered = sampleJobs.filter(job =>
    job.title.toLowerCase().includes(query.toLowerCase())
  );

  if (filtered.length === 0) {
    resultsDiv.innerHTML = `<p>No results found for <strong>${query}</strong>.</p>`;
  } else {
    resultsDiv.innerHTML = filtered.map(job => `
      <div class="job-card">
        <h3>${job.title}</h3>
        <p>${job.company} — <span>${job.location}</span></p>
      </div>
    `).join('');
  }
}

// --- AI Chat Assistant Logic ---
const chatWindow = document.querySelector(".chat-window");
const chatInput = document.querySelector(".chat-input input");
const sendBtn = document.querySelector(".chat-input button");

sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  appendMessage("user", message);
  chatInput.value = "";

  // Simulated AI response
  setTimeout(() => {
    const response = generateAIResponse(message);
    appendMessage("bot", response);
  }, 800);
}
// Wait until the page is ready
document.addEventListener("DOMContentLoaded", () => {

  // ----- Search Button -----
  const searchBtn = document.querySelector(".search-btn");
  const jobInput  = document.getElementById("jobInput");
  const results   = document.querySelector(".search-results");

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const query = jobInput.value.trim();
      if (query === "") {
        results.innerHTML = "<p>Please enter a job role or internship.</p>";
      } else {
        results.innerHTML = `<p>🔍 Searching for <b>${query}</b> opportunities...</p>`;
      }
    });
  }

  // ----- Chat Section -----
  const sendBtn   = document.querySelector(".chat-input button");
  const chatInput = document.querySelector(".chat-input input");
  const chatWindow = document.querySelector(".chat-window");

  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      const message = chatInput.value.trim();
      if (message === "") return;

      // User message
      const userMsg = document.createElement("div");
      userMsg.className = "chat-message user";
      userMsg.textContent = message;
      chatWindow.appendChild(userMsg);

      chatInput.value = "";

      // Bot reply after short delay
      setTimeout(() => {
        const botMsg = document.createElement("div");
        botMsg.className = "chat-message bot";
        botMsg.textContent = "🤖 Organise.AI is processing your request...";
        chatWindow.appendChild(botMsg);
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }, 800);
    });
  }
});

function appendMessage(sender, text) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("chat-message", sender);
  msgDiv.textContent = text;
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight; // Auto scroll
}

function generateAIResponse(input) {
  input = input.toLowerCase();

  if (input.includes("job")) return "Sure! Searching for job listings related to your query 🔍";
  if (input.includes("intern")) return "Let’s find internships that match your skills 🚀";
  if (input.includes("resume")) return "Upload your resume soon — our AI will analyze it for improvements 📄";
  if (input.includes("hello")) return "Hey there 👋! How can I assist you today?";
  return "I’m learning new things every day 🤖 — try asking about jobs, internships, or resume help!";
}
