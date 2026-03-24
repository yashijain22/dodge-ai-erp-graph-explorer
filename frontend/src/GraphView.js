import { useEffect, useRef } from "react";
import { Network } from "vis-network";

function GraphView({ highlightNodes, setSelectedNode, API_URL }) {

  const containerRef = useRef(null);
  const networkRef = useRef(null);

  useEffect(() => {

    fetch(`${API_URL}/graph`)
      .then(res => res.json())
      .then(data => {

        // -----------------------------
        // NODE COLORS
        // -----------------------------
        const nodes = data.nodes.map(n => {

          let color = "#9ca3af";

          if (n.type === "customer") color = "#10b981";
          if (n.type === "order") color = "#3b82f6";
          if (n.type === "delivery") color = "#f59e0b";
          if (n.type === "invoice") color = "#8b5cf6";
          if (n.type === "payment") color = "#ef4444";

          // highlight nodes from query
          if (highlightNodes.includes(n.id)) {
            color = "#facc15";
          }

          return {
            id: n.id,
            label: n.label,
            color: color,
            size: highlightNodes.includes(n.id) ? 18 : 10
          };

        });


        // -----------------------------
        // EDGE CONVERSION
        // -----------------------------
        const edges = data.edges.map(e => ({
          from: e.source,
          to: e.target,
          color: "#9ca3af",
          width: 1
        }));


        const graphData = {
          nodes: nodes,
          edges: edges
        };


        // -----------------------------
        // GRAPH OPTIONS (better layout)
        // -----------------------------
        const options = {

          nodes: {
            shape: "dot",
            font: {
              size: 12,
              color: "#111"
            }
          },

          edges: {
            smooth: true
          },

          physics: {
            enabled: true,

            barnesHut: {
              gravitationalConstant: -3000,
              centralGravity: 0.3,
              springLength: 120,
              springConstant: 0.04,
              damping: 0.09
            },

            stabilization: {
              iterations: 200
            }
          },

          interaction: {
            hover: true,
            zoomView: true,
            dragView: true
          }

        };


        // -----------------------------
        // CREATE NETWORK
        // -----------------------------
        networkRef.current = new Network(
          containerRef.current,
          graphData,
          options
        );


        // -----------------------------
        // NODE CLICK EVENT
        // -----------------------------
        networkRef.current.on("click", function (params) {

          if (params.nodes.length > 0) {

            const nodeId = params.nodes[0];

            const connectedNodes =
              networkRef.current.getConnectedNodes(nodeId);

            setSelectedNode({
              id: nodeId,
              connections: connectedNodes
            });

          }

        });

      });

  }, [highlightNodes, API_URL]);


  return (

    <div
      ref={containerRef}
      style={{
        height: "600px",
        width: "100%"
      }}
    />

  );

}

export default GraphView;