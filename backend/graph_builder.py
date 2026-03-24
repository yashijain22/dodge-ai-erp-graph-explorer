import networkx as nx
from data_loader import load_folder

base = "data/sap-o2c-data"

sales_orders = load_folder(f"{base}/sales_order_headers")
deliveries = load_folder(f"{base}/outbound_delivery_headers")
billing = load_folder(f"{base}/billing_document_headers")
payments = load_folder(f"{base}/payments_accounts_receivable")

G = nx.DiGraph()

# Customer → Order
for _, row in sales_orders.iterrows():

    order_id = row["salesOrder"]
    customer_id = row["soldToParty"]

    G.add_node(f"order_{order_id}", type="order")
    G.add_node(f"customer_{customer_id}", type="customer")

    G.add_edge(
        f"customer_{customer_id}",
        f"order_{order_id}",
        relation="PLACED"
    )


# Deliveries
for _, row in deliveries.iterrows():

    delivery_id = row["deliveryDocument"]

    G.add_node(f"delivery_{delivery_id}", type="delivery")


# Invoices
for _, row in billing.iterrows():

    invoice_id = row["billingDocument"]

    G.add_node(f"invoice_{invoice_id}", type="invoice")


# Payments
for _, row in payments.iterrows():

    payment_id = row["accountingDocument"]

    G.add_node(f"payment_{payment_id}", type="payment")


print("Graph built successfully")
print("Total Nodes:", G.number_of_nodes())
print("Total Edges:", G.number_of_edges())