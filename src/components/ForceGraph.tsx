import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { graphNodes, graphLinks } from "@/data/projects";

type D3Node = {
  id: string;
  label: string;
  type: "hub" | "category";
  icon?: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
};

type D3Link = {
  source: string | D3Node;
  target: string | D3Node;
};

const ICON_MAP: Record<string, string> = {
  database: "🗄",
  monitor: "🖥",
  grid: "⊞",
  layers: "◫",
  book: "📖",
};

export function ForceGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("width", width).attr("height", height);

    const nodes: D3Node[] = graphNodes.map((n) => ({ ...n }));
    const links: D3Link[] = graphLinks.map((l) => ({ ...l }));

    const simulation = d3
      .forceSimulation<D3Node>(nodes)
      .force(
        "link",
        d3
          .forceLink<D3Node, D3Link>(links)
          .id((d) => d.id)
          .distance(120)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide(50));

    // Links
    const link = svg
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#3a3a3a")
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.7);

    // Node groups
    const node = svg
      .append("g")
      .selectAll<SVGGElement, D3Node>("g")
      .data(nodes)
      .enter()
      .append("g")
      .style("cursor", "grab")
      .call(
        d3
          .drag<SVGGElement, D3Node>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    // Category nodes get a ring
    node
      .filter((d) => d.type === "category")
      .append("circle")
      .attr("r", 28)
      .attr("fill", "transparent")
      .attr("stroke", "#4a9eff")
      .attr("stroke-width", 2);

    // All nodes get an inner circle
    node
      .append("circle")
      .attr("r", (d) => (d.type === "category" ? 22 : 8))
      .attr("fill", (d) => (d.type === "category" ? "#1c2a3a" : "#4a9eff"))
      .attr("stroke", (d) => (d.type === "category" ? "#2a4a6a" : "none"))
      .attr("stroke-width", 1.5);

    // Icon for category nodes
    node
      .filter((d) => d.type === "category" && !!d.icon)
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("font-size", "14px")
      .text((d) => ICON_MAP[d.icon!] || "●");

    // Labels
    node
      .append("text")
      .attr("text-anchor", "middle")
      .attr("y", (d) => (d.type === "category" ? 40 : 18))
      .attr("font-size", "11px")
      .attr("fill", "#cccccc")
      .attr("font-family", "Inter, sans-serif")
      .text((d) => d.label);

    // Tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as D3Node).x ?? 0)
        .attr("y1", (d) => (d.source as D3Node).y ?? 0)
        .attr("x2", (d) => (d.target as D3Node).x ?? 0)
        .attr("y2", (d) => (d.target as D3Node).y ?? 0);

      node.attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
}
