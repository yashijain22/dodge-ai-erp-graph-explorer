import re
import networkx as nx

class QueryEngine:

    def __init__(self, graph):
        self.graph = graph

    def handle_query(self, query):

        query = query.lower().strip()

        # -----------------------------
        # ORDERS OF CUSTOMER
        # -----------------------------
        m = re.search(r"customer\s*(\d+)", query)

        if "order" in query and m:
            cust_id = m.group(1)
            node = f"customer_{cust_id}"

            if node not in self.graph:
                return {
                    "answer": f"No customer found with ID {cust_id}",
                    "nodes": []
                }

            orders = [
                n for n in self.graph.neighbors(node)
                if n.startswith("order_")
            ]

            return {
                "answer": f"Orders for customer {cust_id}: {orders}",
                "nodes": [node] + orders
            }

        # -----------------------------
        # DELIVERIES OF ORDER
        # -----------------------------
        m = re.search(r"order\s*(\d+)", query)

        if "deliver" in query and m:
            order_id = m.group(1)
            node = f"order_{order_id}"

            deliveries = [
                n for n in self.graph.neighbors(node)
                if n.startswith("delivery_")
            ]

            return {
                "answer": f"Deliveries for order {order_id}: {deliveries}",
                "nodes": [node] + deliveries
            }

        # -----------------------------
        # INVOICES OF ORDER
        # -----------------------------
        if "invoice" in query and m:
            order_id = m.group(1)
            node = f"order_{order_id}"

            invoices = [
                n for n in self.graph.neighbors(node)
                if n.startswith("invoice_")
            ]

            return {
                "answer": f"Invoices for order {order_id}: {invoices}",
                "nodes": [node] + invoices
            }

        # -----------------------------
        # PAYMENTS OF INVOICE
        # -----------------------------
        m = re.search(r"invoice\s*(\d+)", query)

        if "payment" in query and m:
            invoice_id = m.group(1)
            node = f"invoice_{invoice_id}"

            payments = [
                n for n in self.graph.neighbors(node)
                if n.startswith("payment_")
            ]

            return {
                "answer": f"Payments for invoice {invoice_id}: {payments}",
                "nodes": [node] + payments
            }

        # -----------------------------
        # UNKNOWN QUESTION
        # -----------------------------
        return {
            "answer": "Query not recognized. Please ask about customers, orders, deliveries, invoices or payments.",
            "nodes": []
        }