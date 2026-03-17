import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FWallNavbar from "@/components/FWallNavbar";
import WallpaperCard from "@/components/WallpaperCard";
import WallpaperModal from "@/components/WallpaperModal";
import ScrambledText from "@/components/ScrambledText";
import { getWallpaperStream, type Wallpaper } from "@/data/wallpapers";

const wallpaperStream = getWallpaperStream();

const Index = () => {
  const [atmosphereColor, setAtmosphereColor] = useState(() => {
    return localStorage.getItem("fwall-atmosphere-color") || "#9b87f5"; // Default primary color
  });
  const [selected, setSelected] = useState<Wallpaper | null>(null);

  useEffect(() => {
    localStorage.setItem("fwall-atmosphere-color", atmosphereColor);
  }, [atmosphereColor]);

  return (
    <div className="min-h-screen">
      <div 
        className="bg-radial-glow min-h-screen transition-colors duration-700"
        style={{ 
          background: `
            radial-gradient(ellipse at 20% 50%, ${atmosphereColor}1a 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, ${atmosphereColor}12 0%, transparent 60%),
            hsl(var(--background))
          `
        } as React.CSSProperties}
      >
        <FWallNavbar atmosphere={atmosphereColor} onAtmosphereChange={setAtmosphereColor} />

        <motion.div
          className="pt-28 pb-8 text-center flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <ScrambledText 
            radius={200} 
            duration={1.0} 
            speed={0.4} 
            scrambleChars=".:*#_/" 
            className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground"
          >
            The Pool.
          </ScrambledText>
          <p className="mt-3 text-muted-foreground text-sm max-w-md mx-auto" style={{ textWrap: "balance" } as React.CSSProperties}>
            A curated stream of high-fidelity digital canvases.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="masonry-grid columns-1 sm:columns-2 lg:columns-3 xl:columns-4 p-6">
          {wallpaperStream.map((wallpaper, index) => (
            <WallpaperCard
              key={wallpaper.id}
              src={wallpaper.src}
              title={wallpaper.title}
              author={wallpaper.author}
              index={index}
              onClick={() => setSelected(wallpaper)}
            />
          ))}
        </div>

        <WallpaperModal wallpaper={selected} onClose={() => setSelected(null)} />
      </div>
    </div>
  );
};

export default Index;
