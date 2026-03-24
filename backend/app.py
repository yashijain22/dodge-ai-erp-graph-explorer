from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import re
import pandas as pd

from graph_builder import G
from guardrails import is_valid_query
from query_engine import QueryEngine


app = FastAPI()

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = QueryEngine(G)


@app.get("/")
def home():
    return {"message": "ERP Graph API running"}


# GRAPH ENDPOINT (for visualization)
@app.get("/graph")
def get_graph():

    nodes = []
    edges = []

    for node, data in G.nodes(data=True):

        nodes.append({
            "id": node,
            "label": node,
            "type": data.get("type", "unknown")
        })

    for u, v, data in G.edges(data=True):

        edges.append({
            "from": u,
            "to": v,
            "label": data.get("relation", "")
        })

    return {"nodes": nodes, "edges": edges}


# QUERY ENDPOINT
@app.post("/query")
def ask_question(payload: dict):

    question = payload.get("question", "").lower()

    if not is_valid_query(question):

        return {
            "response": "This system answers ERP dataset questions only."
        }


    # -------------------------------
    # Query 1: Orders for customer
    # -------------------------------

    if "customer" in question and "order" in question:

        numbers = re.findall(r"\d+", question)

        if numbers:

            customer_id = numbers[0]

            orders = engine.orders_for_customer(customer_id)

            if orders:

                clean = [o.replace("order_", "") for o in orders]

                return {
                    "response": f"Customer {customer_id} has orders: {clean}"
                }

            return {
                "response": f"No orders found for customer {customer_id}"
            }


    # -------------------------------
    # Query 2: Product with most billing docs
    # -------------------------------

    if "product" in question and "billing" in question:

        product, count = engine.product_with_most_billing_docs()

        return {
            "response": f"Product {product} appears in the highest number of billing documents ({count})."
        }


    # -------------------------------
    # Query 3: Trace billing document
    # -------------------------------

    if "trace" in question and "billing" in question:

        numbers = re.findall(r"\d+", question)

        if numbers:

            billing_doc = numbers[0]

            flow = engine.trace_billing_document(billing_doc)

            if flow:

                return {
                    "response": " → ".join(flow)
                }

            return {
                "response": "No flow found for this billing document."
            }


    # -------------------------------
    # Query 4: Delivered but not billed
    # -------------------------------

    if "delivered" in question and "not billed" in question:

        orders = engine.delivered_not_billed()

        return {
            "response": f"Orders delivered but not billed: {orders[:10]}"
        }


    return {
        "response": "Query understood but not supported yet."
    }