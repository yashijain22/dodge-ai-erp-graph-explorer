# Windsurf AI Development Workflow

## Objective

Improve user experience of the graph visualization.

## Prompt

How can nodes in a graph visualization be highlighted based on query results?

## AI Suggestion

Extract entity IDs from the query response and dynamically update node styling.

## Implementation

Implemented in:

frontend/src/GraphView.js
frontend/src/ChatPanel.js

The system now highlights nodes involved in query results.

Example:

Customer 310000108 → Order 740506

## Outcome

Improved the interpretability of query results within the graph visualization.
