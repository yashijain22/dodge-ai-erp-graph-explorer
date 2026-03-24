import re

class QueryEngine:

    def __init__(self, graph):
        self.graph = graph


    # -----------------------------
    # Orders for a customer
    # -----------------------------
    def orders_for_customer(self, customer_id):

        node = f"customer_{customer_id}"

        if node not in self.graph:
            return []

        orders = [
            n for n in self.graph.neighbors(node)
            if n.startswith("order_")
        ]

        return orders


    # -----------------------------
    # Deliveries for an order
    # -----------------------------
    def deliveries_for_order(self, order_id):

        node = f"order_{order_id}"

        if node not in self.graph:
            return []

        deliveries = [
            n for n in self.graph.neighbors(node)
            if n.startswith("delivery_")
        ]

        return deliveries


    # -----------------------------
    # Invoices for an order
    # -----------------------------
    def invoices_for_order(self, order_id):

        node = f"order_{order_id}"

        if node not in self.graph:
            return []

        invoices = [
            n for n in self.graph.neighbors(node)
            if n.startswith("invoice_")
        ]

        return invoices


    # -----------------------------
    # Payments for an invoice
    # -----------------------------
    def payments_for_invoice(self, invoice_id):

        node = f"invoice_{invoice_id}"

        if node not in self.graph:
            return []

        payments = [
            n for n in self.graph.neighbors(node)
            if n.startswith("payment_")
        ]

        return payments


    # -----------------------------
    # Main query parser
    # -----------------------------
    def process_query(self, question):

        q = question.lower()


        # Customer → Orders
        m = re.search(r"customer\s*(\d+)", q)
        if "order" in q and m:

            customer_id = m.group(1)

            orders = self.orders_for_customer(customer_id)

            if not orders:
                return {
                    "answer": f"No orders found for customer {customer_id}",
                    "nodes": []
                }

            return {
                "answer": f"Orders for customer {customer_id}: {orders}",
                "nodes": [f"customer_{customer_id}"] + orders
            }


        # Order → Deliveries
        m = re.search(r"order\s*(\d+)", q)
        if "deliver" in q and m:

            order_id = m.group(1)

            deliveries = self.deliveries_for_order(order_id)

            return {
                "answer": f"Deliveries for order {order_id}: {deliveries}",
                "nodes": [f"order_{order_id}"] + deliveries
            }


        # Order → Invoices
        if "invoice" in q and m:

            order_id = m.group(1)

            invoices = self.invoices_for_order(order_id)

            return {
                "answer": f"Invoices for order {order_id}: {invoices}",
                "nodes": [f"order_{order_id}"] + invoices
            }


        # Invoice → Payments
        m = re.search(r"invoice\s*(\d+)", q)
        if "payment" in q and m:

            invoice_id = m.group(1)

            payments = self.payments_for_invoice(invoice_id)

            return {
                "answer": f"Payments for invoice {invoice_id}: {payments}",
                "nodes": [f"invoice_{invoice_id}"] + payments
            }


        # Unknown question
        return {
            "answer": "Query not recognized. Please ask about customers, orders, deliveries, invoices or payments.",
            "nodes": []
        }