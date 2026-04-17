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
    { name: "Eldric", fullName: "Eldric Petrikov", dob: "05 April 1998", nationality: "Germany", relation: "kandung" },
    {
      name: "Allan",
      fullName: "Allan Hehe Petrikov",
      dob: "22 February 1991",
      nationality: "France",
      relation: "kandung",
      partner: {
        name: "Lily",
        fullName: "Liliana A Petrikov",
        dob: "08 May 2005",
        nationality: "Indonesia",
      },
      partnerType: "kandung",
      children: [
        {
          name: "Joeru",
          fullName: "Joeru Ashford Petrikov",
          dob: "11 July 1998",
          nationality: "Indonesia",
          children: [
            { name: "Yuzu", fullName: "Yuzu Lucilfer", dob: "24 March 1999", nationality: "Indonesia" },
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
      photo: "/photos/kitsu.png",
      children: [{ name: "Michie" }],
    },
    {
      name: "Zah",
      fullName: "Zah Petrikov",
      dob: "15 August 2000",
      nationality: "Russian",
      photo: "/photos/Zah.png",
    },
    { name: "Stefan", partner: { name: "Naya" } },
    {
      name: "Nika",
      partner: { name: "Niko" },
      children: [
        { name: "Sophia" },
        { name: "Sonya" },
        { name: "Lupa namanya" },
      ],
    },
    { name: "Cecyl" },
  ],
};

function NodeCard({ node }: { node: NodeType }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="w-72 h-[440px] bg-gradient-to-b from-[#0f2a44] via-[#0a1c2f] to-black rounded-2xl shadow-[0_0_50px_rgba(255,200,0,0.25)] border border-yellow-500/30 flex flex-col overflow-hidden"
    >
      <div className="w-full h-[300px] overflow-hidden">
        <img
          src={node.photo || "/photos/default.jpg"}
          className="w-full h-full object-cover scale-110 hover:scale-125 transition duration-500"
        />
      </div>

      <div className="flex flex-col items-center justify-center flex-1 bg-black/80">
        <span className="text-xl text-yellow-300 font-semibold">
          {node.name}
        </span>

        <span className="text-sm text-yellow-500/60 mt-1">
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
  return (
    <div className="flex flex-col items-center relative">
      <div className="flex items-center gap-6">
        <div onClick={(e) => { e.stopPropagation(); onSelect(node); }}>
          <NodeCard node={node} />
        </div>

        {node.partner && (
          <>
            <div className="w-10 h-px bg-yellow-500/40" />
            <div onClick={(e) => { e.stopPropagation(); onSelect(node.partner!); }}>
              <NodeCard node={node.partner} />
            </div>
          </>
        )}
      </div>

      {node.children && (
        <>
          <div className="w-px h-10 bg-yellow-500/40 mt-2" />

          <div className="flex flex-col items-center">
            {node.children.length > 1 && (
              <div className="w-full h-px bg-yellow-500/40" />
            )}

            <div className="flex gap-20 mt-2">
              {node.children.map((child, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-px h-6 bg-yellow-500/40" />
                  <TreeNode node={child} onSelect={onSelect} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function Home() {
  const [scale, setScale] = useState(1);
  const [selectedNode, setSelectedNode] = useState<NodeType | null>(null);

  return (
    <div className="bg-gradient-to-b from-black via-[#0a1c2f] to-black text-white min-h-screen">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-yellow-500/20">
        <h1 className="text-xl font-bold text-yellow-400">PETRIKOV</h1>

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

      {/* 🔥 POPUP BESAR */}
      {selectedNode && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
          onClick={() => setSelectedNode(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="
              w-[90vw] h-auto max-w-[1100px]
              bg-gradient-to-b from-[#0f2a44] via-[#0a1c2f] to-black
              rounded-3xl shadow-[0_0_50px_rgba(255,200,0,0.25)]
              flex flex-col items-center justify-center text-center
              border border-yellow-500/30 p-10
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE */}
            <button
              onClick={() => setSelectedNode(null)}
              className="absolute top-5 right-6 text-gray-500 text-xl"
            >
              ✕
            </button>

            {/* FOTO */}
            <div className="w-full h-[60%] overflow-hidden flex items-center justify-center mb-12">
              <img
                src={selectedNode.photo || "/photos/default.jpg"}
                className="w-full h-full object-cover"
              />
            </div>

            {/* NAMA */}
            <h2 className="text-5xl font-semibold text-yellow-300">
              {selectedNode.fullName || selectedNode.name}
            </h2>

            {/* INFO */}
            <p className="text-3xl text-yellow-500/60 mt-4">
              {selectedNode.dob || "-"}
            </p>

            <p className="text-3xl text-yellow-500/60">
              {selectedNode.nationality || "-"}
            </p>

            <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent mt-6"></div>
          </motion.div>
        </div>
      )}
    </div>
  );
}