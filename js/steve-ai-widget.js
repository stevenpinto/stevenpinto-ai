const WIDGET_CSS = `:host {
  /* Design tokens — light theme defaults.
     CSS custom properties inherit through Shadow DOM, so the parent page's
     [data-theme="dark"] overrides flow in automatically. */
  --paper: #f7f4ee;
  --paper-2: #efeae0;
  --ink: #14161a;
  --ink-2: #4a4e57;
  --ink-3: #8a8e97;
  --rule-soft: rgba(20, 22, 26, 0.14);
  --accent: #8a3a1a;
  --sans: 'Inter', -apple-system, system-ui, sans-serif;
  --serif: 'Fraunces', Georgia, serif;

  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 10000;
  font-family: var(--sans);
  font-size: 14px;
  line-height: 1.5;
  color: var(--ink);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ── Toggle pill ────────────────────────────── */

.steve-ai-toggle {
  background: var(--ink);
  color: var(--paper);
  padding: 10px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  font-family: var(--sans);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
  transition: background 0.15s, transform 0.15s;
  white-space: nowrap;
}

.steve-ai-toggle:hover {
  background: var(--accent);
  transform: translateY(-1px);
}

.ask-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #6ec36b;
  box-shadow: 0 0 0 3px rgba(110, 195, 107, 0.25);
  flex-shrink: 0;
}

/* ── Chat window ────────────────────────────── */

.steve-ai-window {
  position: absolute;
  bottom: calc(100% + 8px);
  right: 0;
  width: min(380px, calc(100vw - 48px));
  max-height: calc(100vh - 100px);
  background: var(--paper);
  color: var(--ink);
  border: 1px solid var(--rule-soft);
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  display: none;
  flex-direction: column;
  overflow: hidden;
  animation: steve-ai-slide-up 0.2s ease-out;
}

.steve-ai-window.open {
  display: flex;
}

@keyframes steve-ai-slide-up {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Header ─────────────────────────────────── */

.steve-ai-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-bottom: 1px solid var(--rule-soft);
  flex-shrink: 0;
}

.steve-ai-header-text h3 {
  font-family: var(--serif);
  font-weight: 500;
  font-size: 15px;
  color: var(--ink);
  margin: 0;
}

.steve-ai-header-text p {
  font-size: 11px;
  color: var(--ink-3);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin: 2px 0 0 0;
}

.steve-ai-close {
  font-size: 18px;
  color: var(--ink-2);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 4px;
  line-height: 1;
  transition: color 0.15s;
}

.steve-ai-close:hover {
  color: var(--ink);
}

/* ── Messages ───────────────────────────────── */

.steve-ai-messages {
  flex: 1;
  overflow-y: auto;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 320px;
}

.steve-ai-messages::-webkit-scrollbar {
  width: 3px;
}

.steve-ai-messages::-webkit-scrollbar-thumb {
  background: var(--rule-soft);
  border-radius: 2px;
}

.steve-ai-msg {
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
}

.steve-ai-by {
  font-size: 10px;
  color: var(--ink-3);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 3px;
}

.steve-ai-msg.user .steve-ai-by {
  color: var(--accent);
}

/* Markdown content inside bot messages */
.steve-ai-msg-content p {
  margin: 0 0 8px 0;
}

.steve-ai-msg-content p:last-child {
  margin-bottom: 0;
}

.steve-ai-msg-content h3,
.steve-ai-msg-content h4 {
  margin: 10px 0 4px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--ink);
}

.steve-ai-msg-content h3:first-child,
.steve-ai-msg-content h4:first-child {
  margin-top: 0;
}

.steve-ai-msg-content ul {
  margin: 4px 0 8px 0;
  padding-left: 18px;
}

.steve-ai-msg-content li {
  margin-bottom: 2px;
}

.steve-ai-msg-content code {
  background: var(--paper-2);
  padding: 1px 4px;
  border-radius: 3px;
  font-size: 13px;
}

.steve-ai-msg-content pre {
  background: var(--ink);
  color: var(--paper);
  padding: 10px;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 12px;
  margin: 6px 0;
}

.steve-ai-msg-content pre code {
  background: none;
  padding: 0;
  color: inherit;
}

.steve-ai-msg-content strong {
  font-weight: 600;
}

.steve-ai-msg-content a {
  color: var(--accent);
  text-decoration: underline;
  word-break: break-all;
}

.steve-ai-msg-content a:hover {
  opacity: 0.75;
}

/* ── Typing indicator ───────────────────────── */

.steve-ai-msg.typing {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 0;
}

.steve-ai-msg.typing span {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--ink-3);
  animation: steve-ai-bounce 1.4s ease-in-out infinite;
}

.steve-ai-msg.typing span:nth-child(2) { animation-delay: 0.2s; }
.steve-ai-msg.typing span:nth-child(3) { animation-delay: 0.4s; }

@keyframes steve-ai-bounce {
  0%, 60%, 100% { transform: translateY(0); }
  30%           { transform: translateY(-5px); }
}

/* ── Feedback ───────────────────────────────── */

.steve-ai-feedback {
  margin-top: 8px;
  padding-top: 6px;
  border-top: 1px solid var(--rule-soft);
}

.steve-ai-fb-row {
  display: flex;
  gap: 4px;
}

.steve-ai-fb-btn {
  background: none;
  border: 1px solid var(--rule-soft);
  border-radius: 6px;
  padding: 4px 8px;
  cursor: pointer;
  color: var(--ink-3);
  display: flex;
  align-items: center;
  transition: all 0.15s;
}

.steve-ai-fb-btn:hover {
  border-color: var(--ink-2);
  color: var(--ink);
}

.steve-ai-fb-btn.active[data-rating="up"] {
  border-color: #22c55e;
  color: #22c55e;
  background: rgba(34, 197, 94, 0.08);
}

.steve-ai-fb-btn.active[data-rating="down"] {
  border-color: var(--accent);
  color: var(--accent);
  background: rgba(138, 58, 26, 0.08);
}

.steve-ai-fb-comment {
  margin-top: 8px;
}

.steve-ai-fb-input {
  width: 100%;
  border: 1px solid var(--rule-soft);
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 12px;
  font-family: var(--sans);
  background: var(--paper-2);
  color: var(--ink);
  resize: none;
  outline: none;
  line-height: 1.4;
}

.steve-ai-fb-input:focus {
  border-color: var(--ink-2);
}

.steve-ai-fb-submit {
  margin-top: 6px;
  padding: 5px 14px;
  border-radius: 999px;
  border: none;
  background: var(--ink);
  color: var(--paper);
  font-size: 12px;
  font-family: var(--sans);
  cursor: pointer;
  transition: background 0.15s;
}

.steve-ai-fb-submit:hover {
  background: var(--accent);
}

.steve-ai-fb-thanks {
  font-size: 12px;
  color: var(--ink-3);
  font-style: italic;
}

/* ── Input area ─────────────────────────────── */

.steve-ai-input-area {
  display: flex;
  gap: 8px;
  border-top: 1px solid var(--rule-soft);
  padding: 10px 12px;
  background: var(--paper-2);
  align-items: flex-end;
  flex-shrink: 0;
}

.steve-ai-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: var(--sans);
  font-size: 14px;
  color: var(--ink);
  resize: none;
  max-height: 100px;
  line-height: 1.4;
}

.steve-ai-input::placeholder {
  color: var(--ink-3);
}

.steve-ai-send {
  font-size: 12px;
  color: var(--accent);
  letter-spacing: 0.08em;
  font-weight: 500;
  font-family: var(--sans);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  transition: opacity 0.15s;
}

.steve-ai-send:hover {
  opacity: 0.7;
}

.steve-ai-send:disabled {
  color: var(--ink-3);
  cursor: not-allowed;
  opacity: 1;
}

/* ── Mobile ─────────────────────────────────── */

@media (max-width: 480px) {
  :host {
    bottom: 16px;
    right: 16px;
  }

  .steve-ai-window {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    max-height: 70vh;
    border-radius: 12px 12px 0 0;
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
  }

  connectedCallback() {
    this.mode = this.getAttribute("mode") || "public";
    this.apiUrl =
      this.getAttribute("api-url") || "http://localhost:3001";
    this._render();
    this._attachEvents();
  }

  _generateSessionId() {
    return "sess_" + Math.random().toString(36).substring(2, 15);
  }

  _render() {
    const isPrivate = this.mode === "private";
    const title = isPrivate ? "Ask Steve AI (Private)" : "Ask Steve";
    const subtitle = isPrivate ? "Authenticated Access" : "AI · Live";
    const greeting = isPrivate
      ? "Hey! You have full access. Ask me anything about Steve's work, projects, or strategy."
      : "Hi — I'm Steve's AI assistant, trained on his background. Ask me anything about his experience, leadership style, or projects.";

    this.shadowRoot.innerHTML = `
      <style>${WIDGET_CSS}</style>

      <button class="steve-ai-toggle">
        <span class="ask-dot"></span>
        Ask Steve
      </button>

      <div class="steve-ai-window">
        <div class="steve-ai-header">
          <div class="steve-ai-header-text">
            <h3>${title}</h3>
            <p>${subtitle}</p>
          </div>
          <button class="steve-ai-close" aria-label="Close">×</button>
        </div>

        <div class="steve-ai-messages">
          <div class="steve-ai-msg bot">
            <span class="steve-ai-by">Steve</span>
            <div class="steve-ai-msg-content">${greeting}</div>
          </div>
        </div>

        <div class="steve-ai-input-area">
          <textarea
            class="steve-ai-input"
            placeholder="Ask a question…"
            rows="1"
          ></textarea>
          <button class="steve-ai-send">Send</button>
        </div>
      </div>
    `;
  }

  _attachEvents() {
    const toggle = this.shadowRoot.querySelector(".steve-ai-toggle");
    const window_ = this.shadowRoot.querySelector(".steve-ai-window");
    const closeBtn = this.shadowRoot.querySelector(".steve-ai-close");
    const input = this.shadowRoot.querySelector(".steve-ai-input");
    const sendBtn = this.shadowRoot.querySelector(".steve-ai-send");

    toggle.addEventListener("click", () => {
      this.isOpen = !this.isOpen;
      window_.classList.toggle("open", this.isOpen);
      if (this.isOpen) {
        setTimeout(() => input.focus(), 100);
      }
    });

    closeBtn.addEventListener("click", () => {
      this.isOpen = false;
      window_.classList.remove("open");
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
      const streamByEl = document.createElement("span");
      streamByEl.className = "steve-ai-by";
      streamByEl.textContent = "Steve";
      msg.appendChild(streamByEl);
      const streamContent = document.createElement("div");
      streamContent.className = "steve-ai-msg-content";
      msg.appendChild(streamContent);
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
              streamContent.innerHTML = this._renderMarkdown(fullText);
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

    const byEl = document.createElement("span");
    byEl.className = "steve-ai-by";
    byEl.textContent = sender === "bot" ? "Steve" : "You";
    msg.appendChild(byEl);

    const content = document.createElement("div");
    content.className = "steve-ai-msg-content";
    if (sender === "bot") {
      content.innerHTML = this._renderMarkdown(text);
    } else {
      content.textContent = text;
    }
    msg.appendChild(content);

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
