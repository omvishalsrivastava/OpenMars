<h1 align="center">🚀 Open-Mars</h1>



<p align="center">
  <strong>Aerospace Mission Planning & Propulsion Analysis Platform</strong>
</p>


<p align="center">
  <img src="mars.jpg" width="250">
</p>

<p align="center">
  <strong>Aerospace Mission Planning & Propulsion Analysis Platform</strong>
</p>

<p align="center">
  Compare propulsion systems, estimate Mars mission requirements, and explore spacecraft mass architecture using real aerospace engineering principles.
</p>

---

## 🌍 Live Demo

**Open-Mars:** https://openmars.vercel.app

---

## 📖 Overview

Open-Mars is a web-based aerospace mission planning platform designed to help students, enthusiasts, and aspiring engineers explore the challenges of interplanetary travel.

The platform evaluates Earth-to-Mars missions by calculating mass ratios, propellant requirements, payload fractions, and mission feasibility using the Tsiolkovsky Rocket Equation.

Users can compare multiple propulsion technologies and understand how propulsion choices affect mission architecture.

---

## ✨ Features

### Mission Planning

* Payload Mass Input
* Dry Mass Input
* Mission Delta-V Configuration
* Engine Selection
* Mission Feasibility Analysis

### Propulsion Systems

| System                            | Specific Impulse |
| --------------------------------- | ---------------- |
| Chemical Propulsion               | 450 s            |
| Nuclear Thermal Propulsion (NTP)  | 900 s            |
| Nuclear Electric Propulsion (NEP) | 3000 s           |

### Mission Calculations

Open-Mars calculates:

* Mass Ratio
* Initial Mass
* Final Mass
* Propellant Mass
* Propellant Fraction
* Payload Fraction

### Results Dashboard

* Mission Summary
* Propellant Requirements
* Vehicle Mass Breakdown
* Transit Estimates
* Mission Risk Indicators

### Visualization Tools

* Mass Distribution Charts
* Engine Performance Comparisons
* Propellant Fraction Analysis

---

## 🔬 Physics Model

Open-Mars uses the Tsiolkovsky Rocket Equation:

Δv = Isp × g₀ × ln(m₀ / m₁)

Where:

* Δv = Mission Delta-V
* Isp = Specific Impulse
* g₀ = Standard Gravity
* m₀ = Initial Mass
* m₁ = Final Mass

This equation forms the foundation of modern spacecraft propulsion analysis and is used to estimate propellant requirements for interplanetary missions.

---

## 🛠 Tech Stack

### Frontend

* React 19
* TypeScript
* Vite
* Tailwind CSS v4

### Backend

* Express
* tRPC

### Database

* Drizzle ORM
* MySQL / TiDB

### Deployment

* Vercel Serverless Functions

---

## 📂 Project Structure

```text
/client
  React frontend

/server
  Express + tRPC backend

/shared
  Shared TypeScript types
  Mission calculation logic

/api
  Vercel serverless entry point
```

---

## 🎯 Current Capabilities

* Mars mission mass estimation
* Propulsion system comparison
* Delta-V analysis
* Propellant requirement calculations
* Mission architecture evaluation

---

## 🚧 Roadmap

### Version 1.1

* Privacy Policy
* Terms of Service
* Disclaimer Page
* About Page
* Improved Documentation

### Version 1.2

* Launch Vehicle Selection
* Cargo Mission Profiles
* Crewed Mission Planning
* Habitat Mass Calculations

### Version 2.0

* Transfer Window Planning
* Orbital Visualization
* Mission Timeline Simulation
* PDF Mission Reports

### Future Goals

* Jupiter Mission Planning
* Titan Mission Planning
* Asteroid Mission Design
* NASA Ephemeris Integration
* Advanced Interplanetary Architecture Tools

---

## ⚠ Disclaimer

Open-Mars is an educational and research-oriented platform.

The calculations provided are based on simplified aerospace engineering models and should not be used for real-world mission planning without independent verification.

---

## 📜 License

MIT License

---

## 👨‍🚀 Author

Developed by Om Vishal Srivastava.

Built to explore the engineering challenges of reaching Mars and advancing humanity's future in space.
