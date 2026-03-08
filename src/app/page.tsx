import StarBackground from "@/components/StarBackground";
import ArchiveGrid from "@/components/ArchiveGrid";
import TableOfContents from "@/components/TableOfContents";
import archiveData from "@/data/archive.json";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-black selection:bg-white/30">
      {/* Background */}
      <StarBackground />

      {/* Scrollable content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="w-full pt-10 pb-8 px-6 flex flex-col items-center shrink-0">
          <h1 className="text-white text-3xl sm:text-4xl font-light tracking-[0.2em] mb-2 drop-shadow-lg text-center">
            RIAT Blog スライドライブラリー
          </h1>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase mt-4">
            Digital Archive Constellation
          </p>
        </header>

        {/* Archive Grid */}
        <div className="flex-1 px-4 sm:px-8 pb-16">
          <ArchiveGrid items={archiveData} />
        </div>

        {/* Footer */}
        <footer className="w-full text-center pb-8 z-10">
          <div className="text-white/15 text-[10px] tracking-widest font-light">
            CLICK TO OPEN ARCHIVE
          </div>
        </footer>
      </div>

      {/* Table of Contents */}
      <TableOfContents items={archiveData} />
    </main>
  );
}
