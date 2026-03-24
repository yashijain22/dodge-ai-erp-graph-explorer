import { useState } from "react";

function ChatPanel({ setHighlightNodes, API_URL }) {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askQuery = async () => {

    if (!question) return;

    try {

      const res = await fetch(`${API_URL}/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question })
      });

      const data = await res.json();

      setAnswer(data.answer || "No response");

      if (data.nodes) {
        setHighlightNodes(data.nodes);
      }

    } catch (err) {
      console.error(err);
      setAnswer("Error querying backend.");
    }

  };

  return (

    <div>

      <h3>Ask a Question</h3>

      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Which orders belong to customer 310000108?"
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px"
        }}
      />

      <button
        onClick={askQuery}
        style={{
          width: "100%",
          padding: "10px",
          background: "#2563eb",
          color: "white",
          border: "none"
        }}
      >
        Ask
      </button>

      <div style={{ marginTop: "15px" }}>
        <b>Result:</b>
        <p>{answer}</p>
      </div>

    </div>

  );

}

export default ChatPanel;