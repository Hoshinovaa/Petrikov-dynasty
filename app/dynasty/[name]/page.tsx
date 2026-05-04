"use client";

import { ArrowBigLeft } from "lucide-react";
import { familydata } from "@/data/familydata";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";

/* 🔥 FIND PERSON */
function findPerson(node: any, slug: string): any | null {
  if (!node) return null;

  if (node.slug === slug) {
    return {
      ...node,
      partner: node.partner || null,
    };
  }

  if (node.partner?.slug === slug) {
    return {
      ...node.partner,
      partnerOf: node,
    };
  }

  if (node.children) {
    for (let child of node.children) {
      const found = findPerson(child, slug);
      if (found) return found;
    }
  }

  return null;
}

/* 🔥 CARD */
function NodeCard({ node }: { node: any }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="w-56 h-[320px] bg-gradient-to-b from-[#0f2a44] to-black rounded-2xl border border-yellow-500/30 flex flex-col overflow-hidden"
    >
      <div className="w-full h-[220px] overflow-hidden">
        <img
          src={node.photo || "/photos/default.jpg"}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col items-center justify-center flex-1 bg-black">
        <span className="text-2xl text-yellow-300 font-semibold">
          {node.name}
        </span>
        <span className="text-yellow-500/60 text-sm">
          {node.role}
        </span>
      </div>
    </motion.div>
  );
}

/* 🔥 RECURSIVE CHILDREN (SUPPORT GRANDCHILD ++) */
function renderChildren(node: any) {
  if (!node.children || node.children.length === 0) return null;

  return (
    <>
      {/* garis turun */}
      <div className="w-[2px] h-12 bg-yellow-500/40" />

      <div className="flex flex-col items-center">

        {/* garis horizontal */}
        {node.children.length > 1 && (
          <div className="w-full h-[2px] bg-yellow-500/40" />
        )}

        <div className="flex gap-16">
          {node.children.map((child: any, i: number) => (
            <div key={i} className="flex flex-col items-center">

              {/* garis ke anak */}
              <div
                className={`w-[2px] h-10 ${
                  child.relation === "angkat"
                    ? "border-l-2 border-dashed border-yellow-500/40"
                    : "bg-yellow-500/40"
                }`}
              />

              <NodeCard node={child} />

              {/* 🔥 recursive */}
              {renderChildren(child)}

            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* 🔥 TREE */
function Tree({ node }: { node: any }) {
  return (
    <div className="flex flex-col items-center">

      {/* NODE + PARTNER */}
      <div className="flex items-center gap-6">
        <NodeCard node={node} />

        {node.partner && (
          <>
            <div className="w-10 h-[2px] bg-yellow-500/40" />
            <NodeCard node={node.partner} />
          </>
        )}
      </div>

      {/* CHILDREN */}
      {renderChildren(node)}
    </div>
  );
}

export default function Page() {
  const router = useRouter();
  const params = useParams();

  const [scale, setScale] = useState(0.9);

  const containerRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({
    left: -1000,
    right: 1000,
    top: -500,
    bottom: 500,
  });

  const name = params?.name as string;
  const person = findPerson(familydata, name);

  /* 🔥 UPDATE DRAG AREA */
  useEffect(() => {
    const updateBounds = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      const baseLimit = 2000;
      const scaleFactor = scale * 1000;

      setBounds({
        left: -(rect.width + baseLimit + scaleFactor),
        right: rect.width + baseLimit + scaleFactor,
        top: -(rect.height + baseLimit + scaleFactor),
        bottom: rect.height + baseLimit + scaleFactor,
      });
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, [scale]);

  /* 🔥 SCROLL ZOOM */
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    const delta = -e.deltaY * 0.0008;

    setScale((prev) => {
      const next = prev + delta;
      return Math.min(Math.max(next, 0.2), 2);
    });
  };

  if (!person) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Data tidak ditemukan
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-black via-[#0a1c2f] to-black text-white h-screen overflow-hidden">

      {/* 🔥 NAVBAR */}
      <nav className="relative flex items-center px-10 py-3 border-b border-yellow-500/20">

        {/* BACK */}
        <button
          onClick={() => router.push("/dynasty")}
          className="absolute left-10 w-10 h-10 flex items-center justify-center rounded-full border border-yellow-500/30 bg-black/40 hover:bg-yellow-500/20 transition"
        >
          <ArrowBigLeft className="w-6 h-6 text-yellow-400" />
        </button>

        {/* TITLE */}
        <h1
          onClick={() => router.push("/dynasty")}
          className="mx-auto text-xl font-bold text-yellow-400 cursor-pointer"
        >
          PETRIKOV
        </h1>

        {/* ZOOM */}
        <div className="absolute right-10 flex gap-3">
          <button
            onClick={() => setScale((s) => s + 0.2)}
            className="px-3 py-1 bg-yellow-500/20 rounded"
          >
            +
          </button>
          <button
            onClick={() => setScale((s) => s - 0.2)}
            className="px-3 py-1 bg-yellow-500/20 rounded"
          >
            -
          </button>
        </div>
      </nav>

      {/* 🔥 CANVAS */}
      <div ref={containerRef} className="w-full h-full overflow-hidden">
        <section
          onWheel={handleWheel}
          className="w-full h-full flex items-center justify-center"
        >
          <motion.div
            drag
            dragConstraints={bounds}
            dragElastic={0.05}
            dragMomentum={false}
            initial={{ x: 0, y: -25 }}
            className="cursor-grab active:cursor-grabbing"
            style={{
              scale: scale,
              transformOrigin: "center",
              width: "3000px",
              height: "3000px",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Tree node={person} />
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}