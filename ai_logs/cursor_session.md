# Cursor AI Coding Session

## Objective

Build a graph-based representation of ERP Order-to-Cash data.

## Prompt

Design a graph schema for an ERP dataset containing customers, sales orders, deliveries, invoices, and payments.

## AI Suggestion

Represent entities as nodes:

Customer
SalesOrder
Delivery
Invoice
Payment

Relationships:

Customer → places → SalesOrder
SalesOrder → fulfilled_by → Delivery
Delivery → billed_as → Invoice
Invoice → paid_by → Payment

## Implementation

This schema was implemented using NetworkX in:

backend/graph_builder.py

Nodes were created for each ERP entity and edges represent relationships between business documents.

## Outcome

Successfully constructed a graph with:

477 nodes
100 edges
