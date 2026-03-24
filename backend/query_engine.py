import pandas as pd
import os


class QueryEngine:

    def __init__(self, graph):

        self.graph = graph

        base = "data/sap-o2c-data"

        # Load billing_document_items folder properly
        folder = os.path.join(base, "billing_document_items")

        dfs = []

        for file in os.listdir(folder):

            if file.endswith(".jsonl"):

                path = os.path.join(folder, file)

                df = pd.read_json(path, lines=True)

                dfs.append(df)

        self.billing_items = pd.concat(dfs, ignore_index=True)


    # -----------------------------
    # Query 1: Orders for customer
    # -----------------------------

    def orders_for_customer(self, customer_id):

        node = f"customer_{customer_id}"

        if node not in self.graph:
            return []

        return list(self.graph.successors(node))


    # -----------------------------
    # Query 2: Product with most billing docs
    # -----------------------------

    def product_with_most_billing_docs(self):

        counts = self.billing_items["material"].value_counts()

        top_product = counts.idxmax()

        top_count = counts.max()

        return top_product, top_count


    # -----------------------------
    # Query 3: Trace billing document
    # -----------------------------

    def trace_billing_document(self, billing_doc):

        node = f"invoice_{billing_doc}"

        if node not in self.graph:
            return []

        flow = []

        for pred in self.graph.predecessors(node):
            flow.append(pred)

        flow.append(node)

        for succ in self.graph.successors(node):
            flow.append(succ)

        return flow


    # -----------------------------
    # Query 4: Delivered but not billed
    # -----------------------------

    def delivered_not_billed(self):

        result = []

        for node in self.graph.nodes:

            if node.startswith("order_"):

                deliveries = list(self.graph.successors(node))

                if deliveries:

                    billed = False

                    for d in deliveries:

                        invoices = list(self.graph.successors(d))

                        if invoices:
                            billed = True

                    if not billed:
                        result.append(node)

        return result