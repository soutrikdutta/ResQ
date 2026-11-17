# ResQ — Autonomous AI-Powered Campus Resilience & Resource Failover Platform

[![Live on Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat&logo=vercel)](https://resq-jade-ten.vercel.app/)
[![Database](https://img.shields.io/badge/Database-Cloud%20Firestore-FFA000?style=flat&logo=firebase)](https://console.firebase.google.com/project/resq-c04f0/overview)
[![Storage](https://img.shields.io/badge/Storage-Firebase%20Cloud%20Storage-039BE5?style=flat&logo=firebase)](https://console.firebase.google.com/project/resq-c04f0/storage)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**ResQ** is a campus resilience platform engineered to eliminate academic and classroom downtime. When campus equipment fails—such as broken projectors, unavailable Wi-Fi, jammed printers, overbooked compute labs, or last-minute room relocations—ResQ automatically identifies the issue, solves for the closest verified backup, and guides students and faculty to it with turn-by-turn navigation and instant door authorizations.

By continuously learning from recurring breakdown patterns, ambient thermals, and timetable surges, ResQ's predictive engine forecasts resource failures up to 90 minutes in advance to prepare alternatives before classes even start.

---

## 🌐 Live Deployments & Endpoints

- **Live Production Web Application:** [https://resq-jade-ten.vercel.app](https://resq-jade-ten.vercel.app)
- **Firebase Hosted Mirror:** [https://resq-c04f0.web.app](https://resq-c04f0.web.app)
- **Backend API Endpoints:**
  - `POST /api/incidents` — Ingest failure reports and compute optimal backup failover.
  - `GET /api/predictive` — Retrieve live AI facility risk predictions and mitigations.
  - `GET /api/health` — Platform status, database heartbeat, and active campus telemetry.
