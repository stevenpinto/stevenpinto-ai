const WIDGET_CSS = `:host {
  --steve-primary: #2563eb;
  --steve-primary-hover: #1d4ed8;
  --steve-bg: #ffffff;
  --steve-bg-secondary: #f8fafc;
  --steve-text: #1e293b;
  --steve-text-light: #64748b;
  --steve-border: #e2e8f0;
  --steve-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  --steve-radius: 16px;
  --steve-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  font-family: var(--steve-font);
  font-size: 14px;
  line-height: 1.5;
  color: var(--steve-text);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Floating toggle button */
.steve-ai-toggle {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--steve-primary);
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(37, 99, 235, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, box-shadow 0.2s;
  z-index: 10000;
}

.steve-ai-toggle:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 28px rgba(37, 99, 235, 0.5);
}

.steve-ai-toggle svg {
  width: 28px;
  height: 28px;
  fill: white;
}

.steve-ai-toggle .close-icon {
  display: none;
}

.steve-ai-toggle.open .chat-icon {
  display: none;
}

.steve-ai-toggle.open .close-icon {
  display: block;
}

/* Chat window */
.steve-ai-window {
  position: fixed;
  bottom: 100px;
  right: 24px;
  width: 400px;
  max-width: calc(100vw - 48px);
  height: 560px;
  max-height: calc(100vh - 140px);
  background: var(--steve-bg);
  border-radius: var(--steve-radius);
  box-shadow: var(--steve-shadow);
  display: none;
  flex-direction: column;
  overflow: hidden;
  z-index: 9999;
  border: 1px solid var(--steve-border);
  animation: steve-ai-slide-up 0.25s ease-out;
}

.steve-ai-window.open {
  display: flex;
}

@keyframes steve-ai-slide-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Header */
.steve-ai-header {
  background: var(--steve-primary);
  color: white;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.steve-ai-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  flex-shrink: 0;
}

.steve-ai-header-text h3 {
  font-size: 15px;
  font-weight: 600;
  margin: 0;
}

.steve-ai-header-text p {
  font-size: 12px;
  opacity: 0.85;
  margin: 0;
}

/* Messages area */
.steve-ai-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.steve-ai-messages::-webkit-scrollbar {
  width: 4px;
}

.steve-ai-messages::-webkit-scrollbar-thumb {
  background: var(--steve-border);
  border-radius: 2px;
}

/* Message bubbles */
.steve-ai-msg {
  max-width: 85%;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
}

.steve-ai-msg.bot {
  background: var(--steve-bg-secondary);
  color: var(--steve-text);
  align-self: flex-start;
  border-bottom-left-radius: 4px;
}

/* Markdown content inside bot messages */
.steve-ai-msg.bot p {
  margin: 0 0 8px 0;
}

.steve-ai-msg.bot p:last-child {
  margin-bottom: 0;
}

.steve-ai-msg.bot h3,
.steve-ai-msg.bot h4 {
  margin: 10px 0 4px 0;
  font-size: 14px;
  font-weight: 700;
}

.steve-ai-msg.bot h3:first-child,
.steve-ai-msg.bot h4:first-child {
  margin-top: 0;
}

.steve-ai-msg.bot ul {
  margin: 4px 0 8px 0;
  padding-left: 18px;
}

.steve-ai-msg.bot li {
  margin-bottom: 2px;
}

.steve-ai-msg.bot code {
  background: rgba(0, 0, 0, 0.06);
  padding: 1px 4px;
  border-radius: 3px;
  font-size: 13px;
}

.steve-ai-msg.bot pre {
  background: #1e293b;
  color: #e2e8f0;
  padding: 10px;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 12px;
  margin: 6px 0;
}

.steve-ai-msg.bot pre code {
  background: none;
  padding: 0;
  color: inherit;
}

.steve-ai-msg.bot strong {
  font-weight: 600;
}

.steve-ai-msg.bot a {
  color: var(--steve-primary);
  text-decoration: underline;
  word-break: break-all;
}

.steve-ai-msg.bot a:hover {
  color: var(--steve-primary-hover);
}

/* Feedback buttons */
.steve-ai-feedback {
  margin-top: 8px;
  padding-top: 6px;
  border-top: 1px solid var(--steve-border);
}

.steve-ai-fb-row {
  display: flex;
  gap: 4px;
}

.steve-ai-fb-btn {
  background: none;
  border: 1px solid var(--steve-border);
  border-radius: 6px;
  padding: 4px 8px;
  cursor: pointer;
  color: var(--steve-text-light);
  display: flex;
  align-items: center;
  transition: all 0.15s;
}

.steve-ai-fb-btn:hover {
  border-color: var(--steve-text-light);
  color: var(--steve-text);
}

.steve-ai-fb-btn.active[data-rating="up"] {
  border-color: #22c55e;
  color: #22c55e;
  background: rgba(34, 197, 94, 0.08);
}

.steve-ai-fb-btn.active[data-rating="down"] {
  border-color: #ef4444;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.08);
}

.steve-ai-fb-comment {
  margin-top: 8px;
}

.steve-ai-fb-input {
  width: 100%;
  border: 1px solid var(--steve-border);
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 12px;
  font-family: var(--steve-font);
  resize: none;
  outline: none;
  line-height: 1.4;
}

.steve-ai-fb-input:focus {
  border-color: var(--steve-primary);
}

.steve-ai-fb-submit {
  margin-top: 6px;
  padding: 5px 14px;
  border-radius: 6px;
  border: none;
  background: var(--steve-primary);
  color: white;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.15s;
}

.steve-ai-fb-submit:hover {
  background: var(--steve-primary-hover);
}

.steve-ai-fb-thanks {
  font-size: 12px;
  color: var(--steve-text-light);
  font-style: italic;
}

.steve-ai-msg.user {
  background: var(--steve-primary);
  color: white;
  align-self: flex-end;
  border-bottom-right-radius: 4px;
}

.steve-ai-msg.typing {
  display: flex;
  gap: 4px;
  padding: 14px 18px;
}

.steve-ai-msg.typing span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--steve-text-light);
  animation: steve-ai-bounce 1.4s ease-in-out infinite;
}

.steve-ai-msg.typing span:nth-child(2) {
  animation-delay: 0.2s;
}

.steve-ai-msg.typing span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes steve-ai-bounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-6px); }
}

/* Input area */
.steve-ai-input-area {
  padding: 12px 16px;
  border-top: 1px solid var(--steve-border);
  display: flex;
  gap: 8px;
  align-items: flex-end;
  flex-shrink: 0;
}

.steve-ai-input {
  flex: 1;
  border: 1px solid var(--steve-border);
  border-radius: 12px;
  padding: 10px 14px;
  font-size: 14px;
  font-family: var(--steve-font);
  resize: none;
  outline: none;
  max-height: 100px;
  line-height: 1.4;
  transition: border-color 0.15s;
}

.steve-ai-input:focus {
  border-color: var(--steve-primary);
}

.steve-ai-input::placeholder {
  color: var(--steve-text-light);
}

.steve-ai-send {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--steve-primary);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s;
}

.steve-ai-send:hover {
  background: var(--steve-primary-hover);
}

.steve-ai-send:disabled {
  background: var(--steve-border);
  cursor: not-allowed;
}

.steve-ai-send svg {
  width: 18px;
  height: 18px;
  fill: white;
}

/* Powered by footer */
.steve-ai-footer {
  text-align: center;
  padding: 6px;
  font-size: 11px;
  color: var(--steve-text-light);
  flex-shrink: 0;
}

/* Mobile responsive */
@media (max-width: 480px) {
  .steve-ai-window {
    bottom: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
  }

  .steve-ai-toggle {
    bottom: 16px;
    right: 16px;
  }
}
`; // Replaced at build time, or inlined below

class SteveAIWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isOpen = false;
    this.isLoading = false;
    this.sessionId = this._generateSessionId();
    this.mode = this.getAttribute("mode") || "public";
    this.apiUrl =
      this.getAttribute("api-url") || "http://localhost:3001";
  }

  connectedCallback() {
    this._render();
    this._attachEvents();
  }

  _generateSessionId() {
    return "sess_" + Math.random().toString(36).substring(2, 15);
  }

  _render() {
    const isPrivate = this.mode === "private";
    const title = isPrivate ? "Ask Steve AI (Private)" : "Ask Steve AI";
    const subtitle = isPrivate
      ? "Authenticated access"
      : "Learn about Steve's experience";
    const greeting = isPrivate
      ? "Hey! You have full access. Ask me anything about Steve's work, projects, or strategy."
      : "Hi there! I'm Steve's AI assistant. Ask me about his experience, skills, leadership philosophy, or anything else you'd like to know.";

    this.shadowRoot.innerHTML = `
      <style>${WIDGET_CSS}</style>

      <button class="steve-ai-toggle" aria-label="Open chat">
        <svg class="chat-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
        </svg>
        <svg class="close-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>

      <div class="steve-ai-window">
        <div class="steve-ai-header">
          <div class="steve-ai-avatar">S</div>
          <div class="steve-ai-header-text">
            <h3>${title}</h3>
            <p>${subtitle}</p>
          </div>
        </div>

        <div class="steve-ai-messages">
          <div class="steve-ai-msg bot">${greeting}</div>
        </div>

        <div class="steve-ai-input-area">
          <textarea
            class="steve-ai-input"
            placeholder="Type your question..."
            rows="1"
          ></textarea>
          <button class="steve-ai-send" aria-label="Send message">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>

        <div class="steve-ai-footer">
          Powered by Steve AI
        </div>
      </div>
    `;
  }

  _attachEvents() {
    const toggle = this.shadowRoot.querySelector(".steve-ai-toggle");
    const window_ = this.shadowRoot.querySelector(".steve-ai-window");
    const input = this.shadowRoot.querySelector(".steve-ai-input");
    const sendBtn = this.shadowRoot.querySelector(".steve-ai-send");

    toggle.addEventListener("click", () => {
      this.isOpen = !this.isOpen;
      toggle.classList.toggle("open", this.isOpen);
      window_.classList.toggle("open", this.isOpen);
      if (this.isOpen) {
        setTimeout(() => input.focus(), 100);
      }
    });

    sendBtn.addEventListener("click", () => this._sendMessage());

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this._sendMessage();
      }
    });

    // Auto-resize textarea
    input.addEventListener("input", () => {
      input.style.height = "auto";
      input.style.height = Math.min(input.scrollHeight, 100) + "px";
    });
  }

  async _sendMessage() {
    const input = this.shadowRoot.querySelector(".steve-ai-input");
    const message = input.value.trim();

    if (!message || this.isLoading) return;

    this.isLoading = true;
    input.value = "";
    input.style.height = "auto";

    const sendBtn = this.shadowRoot.querySelector(".steve-ai-send");
    sendBtn.disabled = true;

    // Add user message
    this._addMessage(message, "user");

    // Show typing indicator
    const typingEl = this._addTypingIndicator();

    try {
      const endpoint =
        this.mode === "private" ? "/api/chat/private" : "/api/chat/public";

      const headers = { "Content-Type": "application/json" };
      const authToken = this.getAttribute("auth-token");
      if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
      }

      const res = await fetch(`${this.apiUrl}${endpoint}`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          message,
          sessionId: this.sessionId,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      // Remove typing indicator and create the bot message bubble
      typingEl.remove();
      const messages = this.shadowRoot.querySelector(".steve-ai-messages");
      const msg = document.createElement("div");
      msg.className = "steve-ai-msg bot";
      messages.appendChild(msg);

      // Read the SSE stream
      let fullText = "";
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Parse SSE lines from the buffer
        const lines = buffer.split("\n");
        buffer = lines.pop(); // keep incomplete line in buffer

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.substring(6));
            if (data.token) {
              fullText += data.token;
              msg.innerHTML = this._renderMarkdown(fullText);
              messages.scrollTop = messages.scrollHeight;
            }
            if (data.error) {
              throw new Error(data.error);
            }
          } catch (parseErr) {
            if (parseErr.message === "Something went wrong.") throw parseErr;
          }
        }
      }

      // Add feedback buttons after stream completes
      this._addFeedbackButtons(msg, fullText, message);

    } catch (err) {
      console.error("Steve AI error:", err);
      if (typingEl.parentNode) typingEl.remove();
      this._addMessage(
        "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        "bot"
      );
    } finally {
      this.isLoading = false;
      sendBtn.disabled = false;
      input.focus();
    }
  }

  _addMessage(text, sender) {
    const messages = this.shadowRoot.querySelector(".steve-ai-messages");
    const msg = document.createElement("div");
    msg.className = `steve-ai-msg ${sender}`;

    if (sender === "bot") {
      msg.innerHTML = this._renderMarkdown(text);
    } else {
      msg.textContent = text;
    }

    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
    return msg;
  }

  _addFeedbackButtons(msgEl, responseText, questionText) {
    const feedback = document.createElement("div");
    feedback.className = "steve-ai-feedback";
    feedback.innerHTML = `
      <div class="steve-ai-fb-row">
        <button class="steve-ai-fb-btn" data-rating="up" aria-label="Thumbs up">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2v11zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66a4.8 4.8 0 0 0-.88-1.22L14 2 7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.84A2.33 2.33 0 0 0 9.34 20h8.11c.7 0 1.36-.37 1.72-.97l2.66-6.15z"/></svg>
        </button>
        <button class="steve-ai-fb-btn" data-rating="down" aria-label="Thumbs down">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M22 4h-2c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h2V4zM2.17 11.12c-.11.25-.17.52-.17.8V13c0 1.1.9 2 2 2h5.5l-.92 4.65c-.05.22-.02.46.08.66.23.4.52.77.88 1.22L10 22l6.41-6.41c.38-.38.59-.89.59-1.42V6.34A2.33 2.33 0 0 0 14.66 4H6.56c-.71 0-1.37.37-1.72.97L2.17 11.12z"/></svg>
        </button>
      </div>
      <div class="steve-ai-fb-comment" style="display:none;">
        <textarea class="steve-ai-fb-input" placeholder="What was wrong with this response?" rows="2"></textarea>
        <button class="steve-ai-fb-submit">Send feedback</button>
      </div>
    `;

    const commentSection = feedback.querySelector(".steve-ai-fb-comment");
    const commentInput = feedback.querySelector(".steve-ai-fb-input");
    const submitBtn = feedback.querySelector(".steve-ai-fb-submit");
    let submitted = false;

    const sendFeedback = async (rating, comment) => {
      try {
        await fetch(`${this.apiUrl}/api/feedback`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: questionText,
            response: responseText,
            rating,
            comment: comment || "",
            sessionId: this.sessionId,
          }),
        });
      } catch (err) {
        console.error("Feedback error:", err);
      }
    };

    feedback.querySelectorAll(".steve-ai-fb-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        if (submitted) return;

        const rating = btn.dataset.rating;
        feedback.querySelectorAll(".steve-ai-fb-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        if (rating === "up") {
          // Thumbs up — send immediately, no comment needed
          submitted = true;
          commentSection.style.display = "none";
          await sendFeedback("up", "");
        } else {
          // Thumbs down — show comment box
          commentSection.style.display = "block";
          commentInput.focus();
        }
      });
    });

    submitBtn.addEventListener("click", async () => {
      if (submitted) return;
      submitted = true;
      const comment = commentInput.value.trim();
      commentSection.innerHTML = '<span class="steve-ai-fb-thanks">Thanks for your feedback!</span>';
      await sendFeedback("down", comment);
    });

    // Allow Enter to submit comment (Shift+Enter for newline)
    commentInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        submitBtn.click();
      }
    });

    msgEl.appendChild(feedback);
  }

  _renderMarkdown(text) {
    // Sanitize HTML entities first to prevent XSS
    let html = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Code blocks (```...```)
    html = html.replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre><code>$2</code></pre>');

    // Inline code (`...`)
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Bold (**...** or __...__)
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

    // Italic (*...* or _..._) — avoid matching list items
    html = html.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');

    // Markdown links [text](url)
    html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

    // Bare URLs (https://... or http://...) — but not already inside an href
    html = html.replace(/(?<!href="|">)(https?:\/\/[^\s<,)]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');

    // Email addresses
    html = html.replace(/(?<!href="mailto:)([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '<a href="mailto:$1">$1</a>');

    // Phone numbers — formats like (303) 709-9623
    html = html.replace(/(\(\d{3}\)\s?\d{3}[-.]?\d{4})/g, '<a href="tel:$1">$1</a>');

    // Headers (## ... )
    html = html.replace(/^### (.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^## (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^# (.+)$/gm, '<h3>$1</h3>');

    // Unordered list items (- item)
    html = html.replace(/^[-*] (.+)$/gm, '<li>$1</li>');
    html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');

    // Paragraphs — split on double newlines
    html = html
      .split(/\n\n+/)
      .map((block) => {
        block = block.trim();
        if (!block) return "";
        // Don't wrap blocks that are already HTML elements
        if (/^<(h[1-6]|ul|ol|pre|li|blockquote)/.test(block)) return block;
        return `<p>${block.replace(/\n/g, "<br>")}</p>`;
      })
      .join("");

    return html;
  }

  _addTypingIndicator() {
    const messages = this.shadowRoot.querySelector(".steve-ai-messages");
    const typing = document.createElement("div");
    typing.className = "steve-ai-msg bot typing";
    typing.innerHTML = "<span></span><span></span><span></span>";
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
    return typing;
  }
}

customElements.define("steve-ai-widget", SteveAIWidget);
