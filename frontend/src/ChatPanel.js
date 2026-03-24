import { useState } from "react";
import axios from "axios";

function ChatPanel({ setHighlightNodes }) {

  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const sendQuery = async () => {

    if (!query.trim()) return;

    try {

      const res = await axios.post(
        "http://localhost:8000/query",
        { question: query }
      );

      const answer = res.data.response;

      setResponse(answer);

      // Extract numbers (IDs) from answer
      const ids = answer.match(/\d+/g) || [];

      setHighlightNodes(ids);

    } catch (err) {

      setResponse("Error contacting backend.");

    }
  };

  return (

    <div style={{
      background: "white",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0px 2px 6px rgba(0,0,0,0.1)"
    }}>

      <h3>Ask a question about ERP data</h3>

      <div style={{
        display: "flex",
        gap: "10px",
        marginTop: "10px"
      }}>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Example: Which orders belong to customer 310000108?"
          style={{
            flex: 1,
            padding: "12px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={sendQuery}
          style={{
            padding: "12px 20px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Ask
        </button>

      </div>

      {response && (

        <div style={{
          marginTop: "15px",
          padding: "10px",
          background: "#eef2ff",
          borderRadius: "6px"
        }}>

          <strong>Answer:</strong> {response}

        </div>

      )}

      <div style={{
        marginTop: "15px",
        color: "#555"
      }}>

        <strong>Example queries:</strong>

        <ul>
          <li>Which orders belong to customer 310000108?</li>
          <li>Which products are associated with the highest number of billing documents?</li>
          <li>Trace billing document 9400635958</li>
          <li>Find orders delivered but not billed</li>
        </ul>

      </div>

    </div>

  );
}

export default ChatPanel;