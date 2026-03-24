# Dodge AI – ERP Graph Explorer

An interactive graph-based system for exploring ERP Order-to-Cash (O2C) data using natural language queries.

This project converts ERP transactional data into a graph representation and allows users to ask questions about relationships between customers, orders, deliveries, invoices, and payments.

---

# Problem Statement

ERP systems contain complex relationships between business documents such as:

Customer → Sales Order → Delivery → Invoice → Payment

Traditional relational queries make exploring these relationships difficult.

This project models ERP data as a graph and enables natural language exploration of business processes.

---

# Architecture

Frontend (React Dashboard)
↓
FastAPI Backend
↓
Query Engine
↓
NetworkX Graph
↓
ERP Dataset

---

# Graph Model

Nodes represent business entities:

Customer
Sales Order
Delivery
Invoice
Payment

Edges represent relationships between entities:

Customer → places → SalesOrder
SalesOrder → fulfilled_by → Delivery
Delivery → billed_as → Invoice
Invoice → paid_by → Payment

---

# Key Features

• Graph-based ERP data model
• Interactive graph visualization
• Natural language query interface
• Node highlighting based on query results
• Node detail explorer
• Guardrails for non-ERP queries

---

# Example Queries

Which orders belong to customer 310000108?

Which products are associated with the highest number of billing documents?

Trace billing document 9400635958

Find orders delivered but not billed

---

# Tech Stack

Frontend
React
vis-network

Backend
FastAPI
NetworkX
Pandas

---

# Running the Project

Backend:

cd backend
uvicorn app:app --reload

Frontend:

cd frontend
npm install
npm start

---

# AI-Assisted Development

This project was developed using AI-assisted coding tools including:

Cursor
Claude Code
GitHub Copilot
Windsurf

AI tools were used for:

• architecture brainstorming
• debugging implementation issues
• generating boilerplate code
• improving graph visualization

Detailed prompt logs are included in the **ai_logs** folder.

---

# Repository Contents

backend/ – FastAPI backend and graph construction
frontend/ – React UI and graph visualization
ai_logs/ – AI coding session logs

---

# Future Improvements

• LLM-powered query understanding
• Advanced graph analytics
• Production graph database (Neo4j)
• Query result path visualization
