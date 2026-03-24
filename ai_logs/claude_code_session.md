# Claude Code Interaction Log

## Objective

Implement natural language queries over the ERP graph.

## Prompt

How can I design a backend service that accepts natural language questions and retrieves answers from a graph dataset?

## AI Suggestion

Use a layered architecture:

Frontend → FastAPI API → Query Engine → Graph Database

Query Engine interprets the question and performs graph traversal operations.

## Implementation

This architecture was implemented using:

FastAPI (backend API)
NetworkX (graph storage)
Custom query logic in:

backend/query_engine.py

## Outcome

Users can now ask questions like:

Which orders belong to customer 310000108?

and the system retrieves results from the graph.
