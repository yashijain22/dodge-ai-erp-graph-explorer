import { useEffect, useRef } from "react";
import { Network } from "vis-network";

function GraphView({ highlightNodes, setSelectedNode, API_URL }) {

  const container = useRef(null);
  const network = useRef(null);

  useEffect(() => {

    fetch(`${API_URL}/graph`)
      .then(res => res.json())
      .then(data => {

        const getNodeColor = (type) => {

          if (type === "customer") return "#10b981";
          if (type === "order") return "#3b82f6";
          if (type === "delivery") return "#f59e0b";
          if (type === "invoice") return "#8b5cf6";
          if (type === "payment") return "#ef4444";

          return "#9ca3af";

        };

        const nodes = data.nodes.map(n => ({

          id: n.id,
          label: n.label || n.id,

          color: highlightNodes.includes(n.id)
            ? "#ffcc00"
            : getNodeColor(n.type)

        }));

        const edges = data.edges;

        const graphData = { nodes, edges };

        const options = {

          nodes: {
            shape: "dot",
            size: 8,
            font: { size: 12 }
          },

          edges: {
            color: "#aaa"
          },

          physics: {
            stabilization: false
          }

        };

        network.current = new Network(
          container.current,
          graphData,
          options
        );

        network.current.on("click", params => {

          if (params.nodes.length > 0) {

            const nodeId = params.nodes[0];

            const connections =
              network.current.getConnectedNodes(nodeId);

            setSelectedNode({
              id: nodeId,
              connections
            });

          }

        });

      });

  }, [highlightNodes, API_URL, setSelectedNode]);

  return (
    <div
      ref={container}
      style={{
        height: "700px",
        width: "100%",
        border: "1px solid #ddd",
        borderRadius: "6px"
      }}
    />
  );

}

export default GraphView;