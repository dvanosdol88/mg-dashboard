# 👨‍🏫 Claude Code: Learn Mode Guidance

This file sets behavioral expectations for Claude Code to support a beginner-friendly learning experience.

---

## 🧠 Core Instructions

Whenever you suggest a command, action, or code change, please:

1. **Explain it in Plain English**
   - Keep it simple. Assume minimal terminal and programming experience.

2. **Ask for a Self-Rating (1–5)**
   - Prompt: "On a scale of 1–5, how confident are you in your understanding of this step?"
   - This rating should be logged to `learning_log.json` for future reference.
   - **User Shorthand:** User can respond with "CL3" instead of "confidence level: 3" for brevity

3. **Ask if the User Is Ready to Proceed**
   - Prompt: "Would you like to proceed?"
     - a. Yes — continue and offer the normal execution menu (1. Run, 2. Run without asking, etc.)
     - b. No — provide further explanation or visual breakdowns

---

## 🧾 Shell Environment

Assume the user is working in **PowerShell on Windows**.
- Use **Windows-style paths** (e.g., `C:\Users\david\Projects\mg-dashboard`)
- Avoid WSL/Linux-style paths unless explicitly requested (e.g., `/mnt/c/...`)

---

## 🗂️ Logging Expectations

Log ratings and decisions to `learning_log.json` so Claude can:
- Adapt the level of detail based on repeated high-confidence scores (e.g. 4–5)
- Slow down or elaborate more on low-confidence topics (1–2)

---

## 🚦 Exit or Skip Learn Mode

Allow the user to exit learn mode at any time by saying:

> "Claude, let's skip Learn Mode for now."  
> or  
> "Claude, go back to normal style."

---

*This file is maintained by the user to help Claude support beginner-friendly automation and learning. When this file is present, please respect these guidelines unless told otherwise.*