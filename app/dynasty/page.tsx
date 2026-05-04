"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { familydata } from "../../data/familydata";
import { useRouter } from "next/navigation";

export type NodeType = {
  name: string;
  slug: string;
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

/* LIMIT SAMPAI GENERASI 2 */
function limitToSecondGeneration(node: NodeType): NodeType {
  return {
    ...node,
    partner: node.partner,
    children: node.children?.map((child) => ({
      ...child,
      children: undefined,
      partner: undefined,
    })),
  };
}

function NodeCard({ node }: { node: NodeType }) {
  return (
    <motion.div
      whileHover={{ scale: 1.25 }}
      className="w-56 h-[360px] bg-gradient-to-b from-[#0f2a44] via-[#0a1c2f] to-black rounded-2xl shadow-[0_0_50px_rgba(255,200,0,0.25)] border border-yellow-500/30 flex flex-col overflow-hidden"
    >
      <div className="w-full h-[240px] overflow-hidden">
        <img
          src={node.photo || "/photos/default.png"}
          className="w-full h-full object-contain scale-130 hover:scale-145 transition duration-500"
        />
      </div>

      <div className="flex flex-col items-center justify-center flex-1 bg-black/80">
        <span className="text-3xl text-yellow-300 font-semibold">
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

      {/* TITLE ROOT */}
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

      {/* CHILDREN (GEN 2 ONLY) */}
      {node.children && (
        <>
          <div className="w-[3px] h-10 mt-2 bg-yellow-500/40" />

          <div className="flex flex-col items-center">

            {node.children.length > 1 && (
              <div className="w-full h-[3px] bg-yellow-500/40" />
            )}

            <div className="flex gap-23 mt-0">
              {node.children.map((child, i) => (
                <div key={i} className="flex flex-col items-center">

                  <div className="w-[3px] h-10 bg-yellow-500/40" />

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
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(0.5);
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

      const minLimit = 2000;
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
  }, [scale]);

  const [selectedNode, setSelectedNode] = useState<NodeType | null>(null);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    const delta = -e.deltaY * 0.0008;
    setScale((prev) => {
      const next = prev + delta;
      return Math.min(Math.max(next, 0.2), 2);
    });
  };

  return (
    <div className="bg-gradient-to-b from-black via-[#0a1c2f] to-black text-white h-screen overflow-hidden select-none">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-3 border-b border-yellow-500/20">
        <h1
        onClick={() => router.push("/")}
        className="text-xl font-bold text-yellow-400 cursor-pointer hover:text-yellow-300 transition"
        >
          PETRIKOV
        </h1>

        <div className="flex gap-3">
          <button onClick={() => setScale(s => s + 0.2)} className="px-3 py-1 bg-yellow-500/20 rounded text-yellow-400">+</button>
          <button onClick={() => setScale(s => s - 0.2)} className="px-3 py-1 bg-yellow-500/20 rounded text-yellow-400">-</button>
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
            initial={{ x: 0, y: -50 }}
            className="cursor-grab active:cursor-grabbing"
            style={{
              scale: scale,
              transformOrigin: "center",
            }}
          >
            {/* GENERASI 1 + 2 */}
            <TreeNode
              node={limitToSecondGeneration(familydata)}
              onSelect={setSelectedNode}
              isRoot
            />
          </motion.div>
        </section>
      </div>

      {/* POPUP */}
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
            <button
              onClick={() => setSelectedNode(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-yellow-400 text-2xl"
            >
              ✕
            </button>

            <div className="w-full h-[60%] overflow-hidden flex items-center justify-center mb-3">
              <img
                src={selectedNode.photo || "/photos/default.jpg"}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-[24px] font-semibold text-yellow-300">
              {selectedNode.fullName || selectedNode.name}
            </h2>

            <p className="text-[16px] text-yellow-500/60 mt-0">
              {selectedNode.dob || "-"}
            </p>

            <p className="text-[16px] text-yellow-500/60 mb-0">
              {selectedNode.nationality || "-"}
            </p>

            <div className="w-2/3 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent mt-2 opacity-80" />

            {/* SHOW MORE BUTTON */}
            <div className="flex justify-center">
              <button
              onClick={() => {
                if (!selectedNode) return;

                router.push(`/dynasty/${selectedNode.slug}`);
                }
              }              
                  className="
                    mt-5
                    px-4 py-2
                    text-xs font-bold uppercase tracking-wide

                    text-black
                    bg-yellow-400/90

                    rounded-lg
                    shadow-sm

                    hover:bg-yellow-300
                    hover:shadow-md
                    hover:scale-105

                    transition-all duration-300
                  "
                >
                  Show More
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}