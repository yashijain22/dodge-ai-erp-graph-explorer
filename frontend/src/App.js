import { useState } from "react";
import GraphView from "./GraphView";
import ChatPanel from "./ChatPanel";

function App() {

  const API_URL = "https://dodge-ai-erp-graph-explorer.onrender.com";

  const [highlightNodes, setHighlightNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  return (

    <div
      style={{
        fontFamily: "Arial",
        background: "#f4f6f9",
        height: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >

      {/* HEADER */}
      <div
        style={{
          background: "#1f2937",
          color: "white",
          padding: "15px 30px"
        }}
      >
        <h2 style={{ margin: 0 }}>Dodge AI – ERP Graph Explorer</h2>
        <p style={{ margin: 0, opacity: 0.8 }}>
          Explore relationships between customers, orders, deliveries,
          invoices and payments
        </p>
      </div>

      {/* MAIN */}
      <div
        style={{
          display: "flex",
          flex: 1,
          padding: "20px",
          gap: "20px"
        }}
      >

        {/* QUESTION PANEL */}
        <div
          style={{
            width: "350px",
            background: "white",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.1)"
          }}
        >

          <ChatPanel
            setHighlightNodes={setHighlightNodes}
            API_URL={API_URL}
          />

        </div>


        {/* GRAPH */}
        <div
          style={{
            flex: 1,
            background: "white",
            borderRadius: "8px",
            padding: "10px",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.1)"
          }}
        >

          <GraphView
            API_URL={API_URL}
            highlightNodes={highlightNodes}
            setSelectedNode={setSelectedNode}
          />

        </div>


        {/* NODE DETAILS */}
        <div
          style={{
            width: "300px",
            background: "white",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.1)"
          }}
        >

          <h3>Node Details</h3>

          {selectedNode ? (

            <div>

              <p>
                <b>ID:</b> {selectedNode.id}
              </p>

              <p>
                <b>Connections:</b>
              </p>

              <ul>

                {selectedNode.connections.map((c) => (
                  <li key={c}>{c}</li>
                ))}

              </ul>

            </div>

          ) : (

            <p>Click a node in the graph to see details.</p>

          )}

        </div>

      </div>

    </div>

  );

}

export default App;