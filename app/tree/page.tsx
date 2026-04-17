"use client";

import { useState, useEffect, useRef } from "react";
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
      whileHover={{ scale: 1.25 }}
      className="w-56 h-[360px] bg-gradient-to-b from-[#0f2a44] via-[#0a1c2f] to-black rounded-2xl shadow-[0_0_50px_rgba(255,200,0,0.25)] border border-yellow-500/30 flex flex-col overflow-hidden"
    >
      <div className="w-full h-[240px] overflow-hidden">
        <img
          src={node.photo || "/photos/default.jpg"}
          className="w-full h-full object-cover scale-110 hover:scale-125 transition duration-500"
        />
      </div>

      <div className="flex flex-col items-center justify-center flex-1 bg-black/80">
        <span className="text-4xl text-yellow-300 font-semibold">
          {node.name}
        </span>

        <span className="text-2xl text-yellow-500/60 mt-1">
          {node.role || "Family Member"}
        </span>
      </div>
    </motion.div>
  );
}

function TreeNode({
  node,
  onSelect,
  isRoot = false,
}: {
  node: NodeType;
  onSelect: (n: NodeType) => void;
  isRoot?: boolean;
}) {
  return (
    <div className="flex flex-col items-center relative">

      {/* TITLE KHUSUS ROOT */}
      {isRoot && (
        <h1 className="
          text-[56px] md:text-[88px]
          font-serif font-semibold
          tracking-[0.2em]
          text-transparent bg-clip-text
          bg-[linear-gradient(90deg,#facc15,#fde68a,#fbbf24,#facc15)]
          bg-[length:200%_200%]
          animate-gradient-x
          mb-16
        ">
          Петриков
        </h1>
      )}

      {/* NODE + PARTNER */}
      <div className="flex items-center gap-4">
        <div onClick={(e) => { e.stopPropagation(); onSelect(node); }}>
          <NodeCard node={node} />
        </div>

        {node.partner && (
          <>
            {/* garis partner */}
            <div
              className={`w-15 h-px ${
                node.partnerType === "angkat"
                  ? "border-t-2 border-dashed border-yellow-500/40"
                  : "bg-yellow-500/40"
              }`}
            />

            <div onClick={(e) => { e.stopPropagation(); onSelect(node.partner!); }}>
              <NodeCard node={node.partner} />
            </div>
          </>
        )}
      </div>

      {/* CHILDREN */}
      {node.children && (
        <>
          {/* garis turun dari parent */}
          <div
            className={`w-[3px] h-10 mt-2 ${
              node.relation === "angkat"
                ? "border-l-2 border-dashed border-yellow-500/40"
                : "bg-yellow-500/40"
            }`}
          />

          <div className="flex flex-col items-center">

            {/* garis horizontal */}
            {node.children.length > 1 && (
              <div
                className={`w-full h-[3px] ${
                  node.relation === "angkat"
                    ? "border-t-2 border-dashed border-yellow-500/40"
                    : "bg-yellow-500/40"
                }`}
              />
            )}

            {/* list anak */}
            <div className="flex gap-23 mt-0">
              {node.children.map((child, i) => (
                <div key={i} className="flex flex-col items-center">
                  
                  {/* garis ke child */}
                  <div
                    className={`w-[3px] h-10 ${
                      child.relation === "angkat"
                        ? "border-l-2 border-dashed border-yellow-500/40"
                        : "bg-yellow-500/40"
                    }`}
                  />

                  <TreeNode
                    node={child}
                    onSelect={onSelect}
                  />
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [bounds, setBounds] = useState({
    left: -1000,
    right: 1000,
    top: -500,
    bottom: 500,
  });

  useEffect(() => {
    const updateBounds = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      const minLimit = 2000; // bebas, bisa 200–500

      const limitX = Math.max(rect.width * (1 - scale), minLimit);
      const limitY = Math.max(rect.height * (1 - scale), minLimit);
    
      setBounds({
        left: -limitX,
        right: limitX,
        top: -limitY,
        bottom: limitY,
      });
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
    if (scale <= 1) {
    }
  }, [scale]);

  const [selectedNode, setSelectedNode] = useState<NodeType | null>(null);
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    const delta = -e.deltaY * 0.0008; // lebih smooth
    setScale((prev) => {
      const next = prev + delta;
      return Math.min(Math.max(next, 0.2), 2);
    });
  };

  return (
    <div className="bg-gradient-to-b from-black via-[#0a1c2f] to-black text-white h-screen overflow-hidden select-none">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-yellow-500/20">
        <h1 className="text-xl font-bold text-yellow-400">PETRIKOV</h1>

        <div className="flex gap-3">
          <button onClick={() => setScale(s => s + 0.2)} className="px-3 py-1 bg-yellow-500/20 rounded">+</button>
          <button onClick={() => setScale(s => s - 0.2)} className="px-3 py-1 bg-yellow-500/20 rounded">-</button>
        </div>
      </nav>

      {/* TREE */}
      <div ref={containerRef} className="w-full h-full overflow-hidden">
        <section
          onWheel={handleWheel}
          className="w-full h-full flex items-center justify-center overflow-hidden"
        >
          <motion.div
          drag
          dragConstraints={bounds}
          dragElastic={0.05}
          dragMomentum={false}
          className="cursor-grab active:cursor-grabbing"
          style={{
            scale: scale,
            transformOrigin: "center",
          }}
          >
            <TreeNode node={data} onSelect={setSelectedNode} isRoot />
          </motion.div>
        </section>
      </div>

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
              w-[30vw] h-auto max-w-[1100px]
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
              className="absolute top-4 right-4 text-gray-400 hover:text-yellow-400 text-2xl"
            >
              ✕
            </button>

            {/* FOTO */}
            <div className="w-full h-[60%] overflow-hidden flex items-center justify-center mb-3">
              <img
                src={selectedNode.photo || "/photos/default.jpg"}
                className="w-full h-full object-cover"
              />
            </div>

            {/* NAMA */}
            <h2 className="text-[24px] font-semibold text-yellow-300">
              {selectedNode.fullName || selectedNode.name}
            </h2>

            {/* INFO */}
            <p className="text-[16px] text-yellow-500/60 mt-0">
              {selectedNode.dob || "-"}
            </p>

            <p className="text-[16px] text-yellow-500/60 mb-0">
              {selectedNode.nationality || "-"}
            </p>

            <div className="w-2/3 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent mt-2 opacity-80" />
          </motion.div>
        </div>
      )}
    </div>
  );
}