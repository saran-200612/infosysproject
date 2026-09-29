# Infosys Inventory Management System

A full-stack Inventory Management Application featuring a Spring Boot backend and a React frontend.

---

## 📁 Project Structure

```
inventoryApplication/
├── inventoryApplication/    # Backend: Spring Boot application (Java, Maven)
└── inventory-front/         # Frontend: React application (React, Bootstrap, TailwindCSS, Chart.js)
```

---

## 🚀 Getting Started

### 1. Backend Setup (`inventoryApplication`)
- **Prerequisites**: Java 17+, Maven
- **Run the backend**:
  ```bash
  cd inventoryApplication
  ./mvnw spring-boot:run
  ```

### 2. Frontend Setup (`inventory-front`)
- **Prerequisites**: Node.js 18+ & npm
- **Install & Start**:
  ```bash
  cd inventory-front
  npm install
  npm start
  ```

---

## ✨ Features
- **Product Management**: SKU generation, Product entry, price and stock modification, detailed inventory reports.
- **Role-based Authentication**: Admin, Manager, and Vendor portals.
- **Analytics & Reporting**: Interactive pie charts and transaction monitoring dashboards.
