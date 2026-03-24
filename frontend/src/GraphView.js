import { useEffect, useRef } from "react";
import { Network } from "vis-network";
import axios from "axios";

function GraphView({ highlightNodes, setSelectedNode }) {

  const container = useRef(null);
  const networkRef = useRef(null);
  const nodesRef = useRef([]);
  const edgesRef = useRef([]);

  useEffect(() => {

    axios.get("http://localhost:8000/graph")
      .then(res => {

        const nodes = res.data.nodes.map(node => {

          let color = "#9CA3AF";

          if (node.type === "customer") color = "#facc15";
          if (node.type === "order") color = "#22c55e";
          if (node.type === "delivery") color = "#3b82f6";
          if (node.type === "invoice") color = "#f97316";
          if (node.type === "payment") color = "#ec4899";

          return {
            id: node.id,
            label: node.id,
            color: color,
            size: 12
          };

        });

        const edges = res.data.edges.map(e => ({
          from: e.from,
          to: e.to,
          arrows: "to"
        }));

        nodesRef.current = nodes;
        edgesRef.current = edges;

        const data = { nodes, edges };

        const options = {
          physics: {
            solver: "forceAtlas2Based",
            stabilization: false
          }
        };

        networkRef.current = new Network(container.current, data, options);

        // CLICK EVENT
        networkRef.current.on("click", function (params) {

          if (params.nodes.length > 0) {

            const nodeId = params.nodes[0];

            const connected = networkRef.current.getConnectedNodes(nodeId);

            setSelectedNode({
              id: nodeId,
              connections: connected
            });

          }

        });

      });

  }, []);


  useEffect(() => {

    if (!networkRef.current) return;

    const updatedNodes = nodesRef.current.map(node => {

      let highlight = highlightNodes.some(id => node.id.includes(id));

      return {
        ...node,
        size: highlight ? 25 : 12,
        color: highlight ? "#ef4444" : node.color
      };

    });

    networkRef.current.setData({
      nodes: updatedNodes,
      edges: edgesRef.current
    });

  }, [highlightNodes]);



  return (

    <div
      ref={container}
      style={{
        height: "85vh",
        width: "100%"
      }}
    />

  );

}

export default GraphView;