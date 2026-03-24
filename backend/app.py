from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from graph_builder import G
from query_engine import QueryEngine

app = FastAPI()

# Allow frontend (Vercel) to access backend (Render)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize query engine
engine = QueryEngine(G)


# Request schema
class QueryRequest(BaseModel):
    question: str


# Root endpoint
@app.get("/")
def root():
    return {"message": "Dodge AI ERP Graph Explorer API is running"}


# Graph endpoint (used by frontend visualization)
@app.get("/graph")
def get_graph():

    nodes = []
    edges = []

    for n in G.nodes():

        nodes.append({
            "id": n,
            "label": n,
            "type": G.nodes[n].get("type", "entity")
        })

    for u, v in G.edges():

        edges.append({
            "source": u,
            "target": v
        })

    return {
        "nodes": nodes,
        "edges": edges
    }


# Query endpoint
@app.post("/query")
def ask_question(req: QueryRequest):

    try:

        result = engine.process_query(req.question)

        return result

    except Exception as e:

        print("Query error:", e)

        return {
            "answer": "Error processing query",
            "nodes": []
        }