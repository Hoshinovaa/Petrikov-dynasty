"use client";

import { ArrowBigLeft } from "lucide-react";
import {
  familydata,
  lylaExtraChildren,
} from "@/data/familydata";

import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";

/* FIND PERSON */
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

/* CARD */
function NodeCard({
  node,
  onSelect,
}: {
  node: any;
  onSelect: (n: any) => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.25 }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(node);
      }}
      className="
        w-56 h-[360px]
        bg-gradient-to-b
        from-[#0f2a44]
        via-[#0a1c2f]
        to-black

        rounded-2xl
        shadow-[0_0_50px_rgba(255,200,0,0.25)]
        border border-yellow-500/30

        flex flex-col
        overflow-hidden
      "
    >
      {/* IMAGE */}
      <div className="w-full h-[220px] overflow-hidden bg-gradient-to-b from-[#0f2a44] to-black">
        {node.photo && !imgError && (
          <img
            src={node.photo}
            onError={() => setImgError(true)}
            className="w-full h-full object-contain scale-130 hover:scale-145 transition duration-500"
          />
        )}
      </div>

      {/* INFO */}
      <div className="flex flex-col items-center justify-center flex-1 bg-black">

        <span className="text-3xl text-yellow-300 font-semibold">
          {node.name}
        </span>

        <span
          className={`text-yellow-500/60 mt-1 text-center leading-tight ${
            node.role === "Granddaughter-in-law"
              ? "text-[20px]"
              : "text-2xl"
          }`}
        >
          {node.role}
        </span>

      </div>
    </motion.div>
  );
}

/* RECURSIVE CHILDREN */
function renderChildren(node: any, onSelect: (n: any) => void) {
  if (!node.children || node.children.length === 0) return null;

  return (
    <>
      {/* LINE DOWN */}
      <div className="w-[2px] h-12 bg-yellow-500/40" />

      <div className="flex flex-col items-center">

        {/* HORIZONTAL CONNECTOR */}
        {node.children.length > 1 && (
          <div className="w-full h-[2px] bg-yellow-500/40" />
        )}

        {/* CHILDREN */}
        <div className="flex gap-16">

          {node.children.map((child: any, i: number) => (
            <div key={i} className="flex flex-col items-center">

              {/* VERTICAL LINE */}
              <div
                className={`w-[2px] h-10 ${
                  child.relation === "angkat"
                    ? "border-l-2 border-dashed border-yellow-500/40"
                    : "bg-yellow-500/40"
                }`}
              />

              {/* CHILD + PARTNER */}
              <div className="flex items-center gap-6">

                <NodeCard
                  node={child}
                  onSelect={onSelect}
                />

                {child.partner && (
                  <>
                    <div
                      className={`w-10 h-[2px] ${
                        child.partnerType === "angkat"
                          ? "border-t-2 border-dashed border-yellow-500/40"
                          : "bg-yellow-500/40"
                      }`}
                    />

                    <NodeCard
                      node={child.partner}
                      onSelect={onSelect}
                    />
                  </>
                )}

              </div>

              {/* NEXT GENERATION */}
              {renderChildren(child, onSelect)}

            </div>
          ))}

        </div>
      </div>
    </>
  );
}

/* TREE */
function Tree({
  node,
  onSelect,
}: {
  node: any;
  onSelect: (n: any) => void;
}) {
  return (
    <div className="flex flex-col items-center">

      {/* ROOT */}
      <div className="flex items-center gap-6">

        <NodeCard
          node={node}
          onSelect={onSelect}
        />

        {node.partner && (
          <>
            <div
              className={`w-10 h-[2px] ${
                node.partnerType === "angkat"
                  ? "border-t-2 border-dashed border-yellow-500/40"
                  : "bg-yellow-500/40"
              }`}
            />

            <NodeCard
              node={node.partner}
              onSelect={onSelect}
            />
          </>
        )}

      </div>

      {/* CHILDREN */}
      {renderChildren(node, onSelect)}

    </div>
  );
}

export default function Page() {
  const router = useRouter();
  const params = useParams();

  const [selectedNode, setSelectedNode] =
    useState<any | null>(null);

  const [scale, setScale] = useState(0.75);

  const containerRef = useRef<HTMLDivElement>(null);

  const [bounds, setBounds] = useState({
    left: -1000,
    right: 1000,
    top: -500,
    bottom: 500,
  });

  const name = params?.name as string;

  const person = findPerson(familydata, name);

  /* LYLA EXTRA CHILDREN */
  const processedPerson =
    person?.slug === "lyla"
      ? {
          ...person,

          children: [...lylaExtraChildren],
        }
      : person;

  useEffect(() => {
    const updateBounds = () => {
      if (!containerRef.current) return;

      const rect =
        containerRef.current.getBoundingClientRect();

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

    return () =>
      window.removeEventListener("resize", updateBounds);
  }, [scale]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    const delta = -e.deltaY * 0.0008;

    setScale((prev) => {
      const next = prev + delta;
      return Math.min(Math.max(next, 0.2), 2);
    });
  };

  if (!processedPerson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Data tidak ditemukan
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-black via-[#0a1c2f] to-black text-white h-screen overflow-hidden">

      {/* NAVBAR */}
      <nav className="relative flex items-center px-10 py-3 border-b border-yellow-500/20">

        <button
          onClick={() => router.push("/dynasty")}
          className="
            absolute left-10
            w-10 h-10
            flex items-center justify-center

            rounded-full
            border border-yellow-500/30

            bg-black/40
            hover:bg-yellow-500/20

            transition
          "
        >
          <ArrowBigLeft className="w-6 h-6 text-yellow-400" />
        </button>

        <h1
          onClick={() => router.push("/")}
          className="text-yellow-400 hover:text-yellow-300 transition mx-auto text-xl font-bold cursor-pointer"
        >
          PETRIKOV
        </h1>

        <div className="absolute right-10 flex gap-3">

          <button
            onClick={() => setScale((s) => s + 0.2)}
            className="px-3 py-1 bg-yellow-500/20 rounded text-yellow-400"
          >
            +
          </button>

          <button
            onClick={() => setScale((s) => s - 0.2)}
            className="px-3 py-1 bg-yellow-500/20 rounded text-yellow-400"
          >
            -
          </button>

        </div>
      </nav>

      {/* CANVAS */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-hidden"
      >

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

              <Tree
                node={processedPerson}
                onSelect={setSelectedNode}
              />

            </div>
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
            onClick={(e) => e.stopPropagation()}
            className="
              w-[30vw]
              h-auto
              max-w-[1100px]

              bg-gradient-to-b
              from-[#0f2a44]
              via-[#0a1c2f]
              to-black

              rounded-3xl
              shadow-[0_0_50px_rgba(255,200,0,0.25)]

              flex flex-col
              items-center
              justify-center
              text-center

              border border-yellow-500/30
              p-10
            "
          >
            <button
              onClick={() => setSelectedNode(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-yellow-400 text-2xl"
            >
              ✕
            </button>

            <div className="w-full h-[60%] overflow-hidden flex items-center justify-center mb-3">

              <img
                src={
                  selectedNode.photo ||
                  "/photos/default.jpg"
                }
                className="w-full h-full object-cover"
              />

            </div>

            <h2 className="text-[24px] font-semibold text-yellow-300">
              {selectedNode.fullName ||
                selectedNode.name}
            </h2>

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