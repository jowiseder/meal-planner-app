# Gemini Interaction Guidelines

This document provides guidelinesOnly used it for a day, but agentic mode worked great for interacting with the Gemini AI to maintain and develop this project.

## Project Overview

This project is a Meal Planner application built with React and Vite.

Meal Planner AI App – Requirements
1. Overview
Platform: Browser‑based React SPA, fully responsive for smartphones.
Primary Functionality: Capture / upload food photos → AI analysis → Meal‑plan generation.
Target Users: Individuals who want quick meal planning support on their mobile devices.
Key Value Proposition: AI‑powered, photo‑driven meal suggestions that respect dietary restrictions and style preferences.
2. Functional Requirements
2.1 Photo Capture & Upload
• Accept image via device camera or file picker.
• Supported formats: JPEG, PNG (others optional).
• Client‑side validation of size/format.
• Image preview before submission.
• Optional “remove / replace” action.
2.2 Settings & Preferences
• Meals per day: 1–5 (numeric) – Default: 3.
• Weeks to generate: 1–4 (numeric) – Default: 2.
• Food style preferences: e.g., Italian, Mexican, Asian, etc. (multi‑select) – Default: None.
• Dietary restrictions / allergies: e.g., nuts, dairy, gluten, shellfish (multi‑select) – Default: None.
• Vegan/Vegetarian toggle: Yes / No – Default: No.
Settings are persisted locally (see Persistence below).
2.3 Prompt Construction & AI Call
• Build a dynamic prompt string that incorporates user settings and any additional instructions.
• Send the image(s) + prompt to the AI API via HTTPS POST.
• Handle authentication per provider’s best practices.
• Display loading indicator while waiting for response.
2.4 Result Presentation
• Parse AI text response into structured meal objects.
• Render a list of meals with name, ingredients (optional), suggested preparation time, etc.
• Allow users to scroll and tap on items for details if available.
2.5 Export & Share
Export & Share:
• PDF: Client‑side generation with jsPDF or similar.
• CSV: Client‑side export via PapaParse or manual string construction.
• Share: Use Web Share API for mobile browsers; fallback to copy link / email form.
• Social Media: Buttons for Facebook, Twitter/X, Instagram (if allowed) – open share dialogs with pre‑filled text.
2.6 Persistence
• Store user settings and last generated plan in localStorage or IndexedDB.
• Provide an option to clear all data.
2.7 API Key Handling
• TODO: Decide on the exact strategy (environment variable, proxy server, etc.) – see clarifying questions below.
3. Non‑Functional Requirements
Performance: AI call latency < 10 s; UI responsive at all times.
Security: Follow best practices for API key storage; use HTTPS everywhere.
Scalability: Single user, local deployment – no scaling concerns.
Accessibility: WCAG 2.1 AA compliance (keyboard navigation, ARIA labels).
Internationalization: Optional – see clarifying questions.
Testing: ≥ 80 % unit test coverage; integration tests covering end‑to‑end flow.
Build & Deployment: Vite/CRA with TypeScript; static assets served locally (no backend).
4. Architecture & Technology Stack
Frontend:
• React v18+ + TypeScript.
• State Management: React Context + useReducer or Zustand (lightweight).
• Styling: TailwindCSS or CSS Modules.
• HTTP Client: Fetch API or Axios.
• Image handling: FileReader API for preview; base64/Blob upload.
Export:
• PDF – jsPDF / pdfmake.
• CSV – PapaParse.
Testing:
• Unit: Jest + React Testing Library.
• Integration/E2E: Cypress or Playwright.
Build: Vite (fast dev server) or CRA.
5. Data Flow Diagram (Textual)
[User] → [Capture/Upload Photo] → [Validate & Preview Image] → [Collect Settings] → [Build Prompt + Prepare Payload] → [POST → AI API (Google Gemini / other)] → [Receive Text Response] → [Parse into Meal Objects] → [Render Meal Plan UI]
→ Export to PDF/CSV | Share via Social, Email, Text.
6. Testing Strategy
Unit Tests: Components (PhotoUploader, SettingsForm), hooks (usePromptBuilder), utilities (apiClient).
Integration Tests: Full flow – upload → AI call → display result → export/share actions.
Coverage Goal: ≥ 80 % overall; critical paths > 90 %.
TODO: Confirm preferred testing framework and coverage thresholds.
7. Future Enhancements (Optional)
• User authentication & cloud sync (e.g., Firebase).
• Offline caching of meal plans.
• Support for additional AI providers (OpenAI, Anthropic).
• Multi‑language UI support.
• Advanced dietary filters (keto, paleo, etc.).
Voice commands / hands‑free operation.

## Development

To start the development server, run:

```bash
npm run dev
```

## Building

To build the project for production, run:

```bash
npm run build
```

## Linting

To lint the project files, run:

```bash
npm run lint
```
