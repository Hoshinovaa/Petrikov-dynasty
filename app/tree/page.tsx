"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type NodeType = {
  name: string;
  photo?: string;
  partner?: NodeType;
  partnerType?: "kandung" | "angkat";
  relation?: "kandung" | "angkat";
  children?: NodeType[];
};

const data: NodeType = {
  name: "Simon",
  photo: "/photos/default.jpg",
  partner: {
    name: "Lyla",
    photo: "/photos/default.jpg",
  },
  partnerType: "angkat",
  children: [
    { name: "Eldric", relation: "kandung" },
    {
      name: "Allan",
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
      relation: "kandung",
      photo: "/photos/kitsu.png",
      children: [{ name: "Michie" }],
    },
    { name: "Zah", photo: "/photos/Zah.png", relation: "kandung" },
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
        { name: "Sophia", relation: "kandung" },
        { name: "Sonya", relation: "kandung" },
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
      className="relative z-10 w-52 h-60 
      bg-gradient-to-br from-[#0f2a44] via-[#0a1c2f] to-black
      px-4 py-3 rounded-xl shadow-[0_0_25px_rgba(255,200,0,0.2)]
      border border-yellow-500/30 flex flex-col items-center"
    >
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <img
          src={node.photo || "/photos/default.jpg"}
          className="max-h-36 max-w-full object-contain rounded-md"
        />
      </div>

      <span className="text-sm text-yellow-300 mt-2 tracking-wide">
        {node.name}
      </span>
    </motion.div>
  );
}

function TreeNode({ node }: { node: NodeType }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex flex-col items-center relative">

      {/* NODE + PARTNER */}
      <div className="flex items-center gap-6 relative z-10">
        <div onClick={() => setOpen(!open)}>
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
            <NodeCard node={node.partner} />
          </>
        )}
      </div>

      {/* GARIS KE BAWAH */}
      {node.children && open && (
        <div className="flex justify-center -mt-2 relative z-0">
          <div className="w-px h-10 bg-yellow-500/40"></div>
        </div>
      )}

      {/* CHILDREN */}
      {node.children && open && (
        <div className="flex flex-col items-center pt-0 relative z-0">

          {/* GARIS HORIZONTAL */}
          {node.children.length > 1 && (
            <div className="relative flex justify-center w-full">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[calc(100%-6rem)] h-px bg-yellow-500/40"></div>
            </div>
          )}

          {/* ROW */}
          <div className="flex gap-20 mt-1 items-start">

            {node.children.map((child, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-start min-h-[280px]"
              >
                {/* GARIS ATAS */}
                <div
                  className={`w-px ${
                    node.children!.length === 1
                      ? "h-6 opacity-0"
                      : "h-6 opacity-100"
                  } ${
                    child.relation === "angkat"
                      ? "border-l border-dashed border-yellow-500/50"
                      : "bg-yellow-500/40"
                  }`}
                />

                <TreeNode node={child} />
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

  return (
    <div className="bg-gradient-to-b from-black via-[#0a1c2f] to-black text-white min-h-screen overflow-auto">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-yellow-500/20">
        <h1 className="text-xl font-bold text-yellow-400 tracking-wide">
          PETRIKOV
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => setScale((s) => s + 0.2)}
            className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded hover:bg-yellow-500/30"
          >
            +
          </button>
          <button
            onClick={() => setScale((s) => s - 0.2)}
            className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded hover:bg-yellow-500/30"
          >
            -
          </button>
        </div>
      </nav>

      {/* TITLE */}
      <section className="text-center py-10">
        <h1 className="text-4xl font-bold text-yellow-400 drop-shadow-[0_0_10px_rgba(255,200,0,0.5)]">
          Петриков
        </h1>
      </section>

      {/* TREE */}
      <section className="flex justify-center items-start py-10">
        <div style={{ transform: `scale(${scale})` }} className="origin-top">
          <TreeNode node={data} />
        </div>
      </section>
    </div>
  );
}