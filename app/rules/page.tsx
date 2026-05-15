export default function PetrikovRulesPage() {
  const sections = [
    {
      title: "I. Asas Keluarga Petrikov",
      content:
        "Keluarga Petrikov bukan sekadar himpunan individu—ia adalah warisan yang dijaga, nama yang dihormati, dan kekuatan yang tidak dipertontonkan. Setiap anggota memikul tanggung jawab menjaga kehormatan, loyalitas, dan kendali diri.",
      quote:
        "Petrikov tidak dibangun oleh suara keras, melainkan oleh kendali, kesetiaan, dan kehormatan.",
    },
    {
      title: "II. Struktur & Kepatuhan",
      points: [
        "Kekuasaan tertinggi berada pada Tetua Petrikov",
        "Keputusan bersifat final dan mutlak",
        "Loyalitas adalah kewajiban utama",
        "Pembangkangan dianggap pengkhianatan",
      ],
    },
    {
      title: "III. Kode Etik Roleplay",
      points: [
        "Menjaga RP realistis dan berkualitas",
        "Dilarang Fail RP, Power Gaming, Meta Gaming, dan RDM",
        "Karakter wajib tenang, terkendali, dan berkelas",
        "Konflik diselesaikan secara IC",
      ],
    },
    {
      title: "IV. Regulasi Atribut & Busana",
      points: [
        "Jas Kehormatan hanya digunakan untuk acara resmi",
        "Atribut keluarga tidak boleh disalahgunakan",
        "Identitas keluarga wajib dijaga dengan disiplin",
      ],
      quote:
        "Atribut harus mencerminkan disiplin, kendali diri, dan kehormatan.",
    },
    {
      title: "V. Larangan Mutlak",
      points: [
        "Pengkhianatan dalam bentuk apapun",
        "Membocorkan rahasia keluarga",
        "Menyalahgunakan nama Petrikov",
        "Mempermalukan keluarga di depan publik",
      ],
    },
    {
      title: "VI. Adab & Tata Krama",
      content:
        "Di dalam keluarga Petrikov, kehormatan terlihat dari sikap. Menjaga tutur kata, menghormati interaksi, dan tetap tenang adalah bagian dari martabat keluarga.",
      quote: "Adab adalah cerminan nama yang kita bawa.",
    },
    {
      title: "VII. Sistem Sanksi",
      points: [
        "Teguran tertutup",
        "Peringatan resmi",
        "Isolasi internal",
        "Denda keluarga",
        "Pengeluaran permanen dari keluarga",
      ],
    },
    {
      title: "VIII. Silsilah & Legitimasi",
      points: [
        "Setiap anggota wajib memiliki backstory jelas",
        "Penggunaan marga wajib mendapat persetujuan",
        "Proses masuk keluarga harus melalui pengakuan resmi",
      ],
      quote:
        "Pelanggaran dianggap sebagai pemalsuan identitas keluarga.",
    },
  ];

  return (
    <div className="relative h-screen overflow-y-auto overflow-x-hidden bg-black text-white">
      
      {/* GOLD + BLACK BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        
        {/* Main Background */}
        <div className="absolute inset-0 bg-black" />

        {/* Top Gold Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.25),transparent_45%)]" />

        {/* Center Gold Ambient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.08),transparent_60%)]" />

        {/* Bottom Dark Blue Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(15,42,68,0.35),transparent_50%)]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10">

        {/* HERO */}
        <section className="flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
          
          <h1 className="text-6xl md:text-8xl font-serif tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-200 drop-shadow-[0_0_25px_rgba(255,215,0,0.45)]">
            PETRIKOV
          </h1>

          <p className="mt-6 max-w-3xl text-lg md:text-xl text-yellow-100/70 leading-relaxed">
            Council of Petrikov Authority — Sebuah warisan kehormatan,
            loyalitas, dan kekuasaan yang dijaga tanpa kompromi.
          </p>

          <div className="mt-10 w-40 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
        </section>

        {/* RULES */}
        <section className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {sections.map((section, index) => (
            <div
              key={index}
              className={`
                group
                relative
                rounded-3xl
                border-2 border-yellow-500/20
                bg-black/40
                backdrop-blur-xl
                p-8
                overflow-hidden
                hover:border-yellow-400/40
                transition duration-500
                hover:scale-[1.02]

                ${index === 0 || index === 5 ? "md:col-span-2" : ""}
              `}
            >
              
              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.12),transparent_50%)]" />

              {/* Title */}
              <h2 className="relative z-10 text-2xl md:text-3xl font-semibold text-yellow-300 mb-5">
                {section.title}
              </h2>

              {/* Content */}
              {section.content && (
                <p className="relative z-10 text-yellow-100/70 leading-relaxed text-base md:text-lg">
                  {section.content}
                </p>
              )}

              {/* Points */}
              {section.points && (
                <ul className="relative z-10 space-y-3 text-yellow-100/75">
                  {section.points.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 border-b border-yellow-500/10 pb-2"
                    >
                      <span className="text-yellow-400 mt-1">
                        ✦
                      </span>

                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Quote */}
              {section.quote && (
                <blockquote className="relative z-10 mt-6 italic text-yellow-400/80 border-l-2 border-yellow-500 pl-4">
                  “{section.quote}”
                </blockquote>
              )}
            </div>
          ))}
        </section>

        {/* FOOTER */}
        <footer className="text-center pb-12 px-6">
          
          <div className="w-52 h-[2px] mx-auto bg-gradient-to-r from-transparent via-yellow-500 to-transparent mb-6" />

          <p className="text-yellow-200/70 text-lg italic max-w-3xl mx-auto leading-relaxed">
            “Dalam diam kami mengatur, dalam bayangan kami berkuasa.”
          </p>
        </footer>
      </div>
    </div>
  );
}