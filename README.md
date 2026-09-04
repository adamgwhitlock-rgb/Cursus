# Cursus

A guided, AI-coached route through super-curricular work, built for students
applying through UCAS and the Common App. Next.js 14 (App Router) + Tailwind
+ TypeScript, ready to deploy on Vercel.

## What's built

- Premium dark UI (slate background, gold "achievement" accent, azure "AI"
  accent, Fraunces + Space Grotesk type)
- Interactive four-week "sprint" roadmap for Law, Medicine and Economics,
  with a live progress tracker
- An AI interview simulator: a 90-second timed question, then real feedback
  from Claude via a server-side API route (`app/api/interview-feedback`)
- A UCAS / Common App toggle showing how the same work gets tracked
  differently for each system
- A comparison section and two illustrative pricing tiers

## Run it locally

```bash
npm install
cp .env.example .env.local   # then add your own key
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: **Add New Project** → import the repo → it will auto-detect
   Next.js, no config needed.
3. In **Settings → Environment Variables**, add:
   - `ANTHROPIC_API_KEY` — get one at https://console.anthropic.com/settings/keys
4. Deploy.

The interview simulator calls `/api/interview-feedback`, a server route
that holds the Anthropic key — the key is never exposed to the browser.
Check https://docs.claude.com for the current model name before you launch;
model identifiers get updated over time, and `claude-sonnet-5` in
`app/api/interview-feedback/route.ts` may need bumping.

## What this is, and isn't, yet

This is the front end and one working AI feature. For a real subscription
product you'll still need to add:

- **Auth** — student accounts (e.g. Clerk, Auth.js/NextAuth, or Supabase Auth)
- **A database** — to persist sprint progress, saved interview answers, and
  personal statement drafts per student (e.g. Supabase/Postgres, or Neon)
- **Billing** — Stripe Checkout + a webhook to gate access by subscription
  status; the two pricing cards are currently decorative
- **More sprint content** — only Law, Medicine and Economics are written up
  in `lib/content.ts`; the structure is there to extend to every subject
- **A schools/institutional tier**, if you want to sell into schools the way
  the competitor does

Happy to build any of these next — the auth + database + Stripe wiring is
the natural next step once you've settled on the name and the look.

## Project structure

```
app/
  page.tsx                 → composes all sections
  layout.tsx                → fonts + global metadata
  globals.css                → Tailwind + a handful of custom glow/focus rules
  api/interview-feedback/   → server route that calls the Anthropic API
components/                 → one file per section, plus shared ui.tsx primitives
lib/content.ts               → sprint + interview question data, edit this to add subjects
```
