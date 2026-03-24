import { useEffect, useRef } from "react";
import { Network } from "vis-network";

function GraphView({ highlightNodes, setSelectedNode, API_URL }) {

  const container = useRef(null);
  const network = useRef(null);

  useEffect(() => {

    fetch(`${API_URL}/graph`)
      .then(res => res.json())
      .then(data => {

        const nodes = data.nodes.map(n => ({
          id: n.id,
          label: n.label || n.id,
          color: highlightNodes.includes(n.id)
            ? "#f59e0b"
            : "#60a5fa"
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
        height: "100%",
        width: "100%"
      }}
    />
  );

}

export default GraphView;