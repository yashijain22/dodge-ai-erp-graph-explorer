def is_valid_query(query):

    keywords = [
        "order",
        "delivery",
        "invoice",
        "payment",
        "customer",
        "product"
    ]

    query = query.lower()

    for word in keywords:
        if word in query:
            return True

    return False