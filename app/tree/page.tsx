"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type NodeType = {
  name: string;
  fullName?: string;
  dob?: string;
  nationality?: string;
  role?: string;
  photo?: string;
  partner?: NodeType;
  partnerType?: "kandung" | "angkat";
  relation?: "kandung" | "angkat";
  children?: NodeType[];
};

const data: NodeType = {
  name: "Simon",
  fullName: "Simon Petrikov",
  dob: "1 January 1970",
  nationality: "Russian",
  photo: "/photos/default.jpg",
  partner: {
    name: "Lyla",
    fullName: "Lyla Petrikov",
    dob: "5 May 1975",
    nationality: "Russian",
    photo: "/photos/default.jpg",
  },
  partnerType: "angkat",
  children: [
    { name: "Eldric", relation: "kandung" },
    {
      name: "Allan",
      fullName: "Allan Petrikov",
      dob: "12 March 1995",
      nationality: "Russian",
      relation: "kandung",
      partner: { name: "Lily" },
      partnerType: "kandung",
      children: [
        {
          name: "Joeru",
          children: [
            { name: "Yuzu" },
            { name: "Selene" },
          ],
        },
        { name: "Graviel" },
        { name: "Naollie" },
      ],
    },
    {
      name: "Kitsu",
      fullName: "Kitsu Ryouta Petrikov",
      dob: "20 July 1998",
      nationality: "Japanese",
      relation: "kandung",
      photo: "/photos/kitsu.png",
      children: [{ name: "Michie" }],
    },
    {
      name: "Zah",
      fullName: "Zah Petrikov",
      dob: "15 August 2000",
      nationality: "Russian",
      photo: "/photos/Zah.png",
      relation: "kandung",
    },
    {
      name: "Stefan",
      relation: "kandung",
      partner: { name: "Naya" },
    },
    {
      name: "Nika",
      relation: "kandung",
      partner: { name: "Niko" },
      partnerType: "kandung",
      children: [
        { name: "Sophia" },
        { name: "Sonya" },
        { name: "Lupa namanya", relation: "angkat" },
      ],
    },
    { name: "Cecyl", relation: "kandung" },
  ],
};

function NodeCard({ node }: { node: NodeType }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="
        relative z-10 w-72 h-[440px]
        bg-gradient-to-b from-[#0f2a44] via-[#0a1c2f] to-black
        rounded-2xl shadow-[0_0_50px_rgba(255,200,0,0.25)]
        border border-yellow-500/30
        flex flex-col overflow-hidden
      "
    >
      <div className="w-full h-[300px] overflow-hidden">
        <img
          src={node.photo || "/photos/default.jpg"}
          className="w-full h-full object-cover scale-110 hover:scale-125 transition duration-500"
        />
      </div>

      <div className="flex flex-col items-center justify-center flex-1 bg-black/80">
        <span className="text-xl text-yellow-300 tracking-widest font-semibold">
          {node.name}
        </span>

        <span className="text-sm text-yellow-500/60 mt-1 tracking-wide">
          {node.role || "Family Member"}
        </span>

        </div>
    </motion.div>
  );
}

function TreeNode({
  node,
  onSelect,
}: {
  node: NodeType;
  onSelect: (n: NodeType) => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex flex-col items-center relative">

      {/* NODE + PARTNER */}
      <div className="flex items-center gap-6 relative z-10">
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect(node);
          }}
        >
          <NodeCard node={node} />
        </div>

        {node.partner && (
          <>
            <div
              className={`w-10 ${
                node.partnerType === "angkat"
                  ? "border-t border-dashed border-yellow-500/50"
                  : "h-px bg-yellow-500/40"
              }`}
            />

            <div
              onClick={(e) => {
                e.stopPropagation();
                onSelect(node.partner!);
              }}
            >
              <NodeCard node={node.partner} />
            </div>
          </>
        )}
      </div>
      {/* GARIS */}
      {node.children && open && (
        <div className="flex justify-center -mt-2">
          <div className="w-px h-10  bg-yellow-500/40"></div>
        </div>
      )}

      {/* CHILDREN */}
      {node.children && open && (
        <div className="flex flex-col items-center">

          {node.children.length > 1 && (
            <div className="relative flex justify-center w-full">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[calc(100%-6rem)] h-px bg-yellow-500/40"></div>
            </div>
          )}

          <div className="flex gap-22 mt-1 items-start">
            {node.children.map((child, i) => (
              <div
                key={i}
                className="flex flex-col items-center min-h-[280px]"
              >
                <div className="w-px h-7 bg-yellow-500/40" />
                <TreeNode node={child} onSelect={onSelect} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [scale, setScale] = useState(1);
  const [selectedNode, setSelectedNode] = useState<NodeType | null>(null);

  return (
    <div className="bg-gradient-to-b from-black via-[#0a1c2f] to-black text-white min-h-screen overflow-auto">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-yellow-500/20">
        <h1 className="text-xl font-bold text-yellow-400">
          PETRIKOV
        </h1>

        <div className="flex gap-3">
          <button onClick={() => setScale(s => s + 0.2)} className="px-3 py-1 bg-yellow-500/20 rounded">+</button>
          <button onClick={() => setScale(s => s - 0.2)} className="px-3 py-1 bg-yellow-500/20 rounded">-</button>
        </div>
      </nav>

      {/* TREE */}
      <section className="flex justify-center py-10">
        <div style={{ transform: `scale(${scale})` }}>
          <TreeNode node={data} onSelect={setSelectedNode} />
        </div>
      </section>

      {/* POPUP */}
      {selectedNode && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedNode(null)}
        >
          <div
            className="bg-[#0a1c2f] border border-yellow-500/30 rounded-2xl p-6 w-80 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedNode.photo || "/photos/default.jpg"}
              className="w-full h-48 object-contain mb-4"
            />

            <h2 className="text-xl text-yellow-300 font-bold">
              {selectedNode.fullName || selectedNode.name}
            </h2>

            <p className="text-yellow-400/70 mt-2">
              {selectedNode.dob || "-"}
            </p>

            <p className="text-yellow-400/70">
              {selectedNode.nationality || "-"}
            </p>

            <button
              onClick={() => setSelectedNode(null)}
              className="mt-4 px-4 py-2 bg-yellow-500/20 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}