import StarBackground from "@/components/StarBackground";
import ArchiveCard from "@/components/ArchiveCard";
import archiveData from "@/data/archive.json";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black selection:bg-white/30">
      {/* Background */}
      <StarBackground />

      {/* Header */}
      <header className="absolute top-8 left-0 w-full z-10 px-8 flex flex-col items-center">
        <h1 className="text-white text-3xl sm:text-4xl font-light tracking-[0.2em] mb-2 drop-shadow-lg">
          RIAT Blog スライドライブラリー
        </h1>
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase mt-4">
          Digital Archive Constellation
        </p>
      </header>

      {/* Constellation Layer */}
      <div className="absolute inset-0 w-full h-full">
        {archiveData.map((item, index) => (
          <ArchiveCard
            key={item.id}
            id={item.id}
            title={item.title}
            url={item.url}
            thumbnail={item.thumbnail}
            x={item.x}
            y={item.y}
            delay={index * 0.2}
          />
        ))}
      </div>

      {/* Footer / Instructions */}
      <footer className="absolute bottom-8 left-8 z-10">
        <div className="text-white/20 text-[10px] tracking-widest font-light">
          SCROLL TO EXPLORE<br />
          CLICK TO OPEN ARCHIVE
        </div>
      </footer>
    </main>
  );
}
