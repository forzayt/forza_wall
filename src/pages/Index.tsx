import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FWallNavbar from "@/components/FWallNavbar";
import WallpaperCard from "@/components/WallpaperCard";
import WallpaperModal from "@/components/WallpaperModal";
import ScrambledText from "@/components/ScrambledText";
import { Download, File } from "lucide-react";

interface DataFile {
  name: string;
  url: string;
}

const Index = () => {
  const [atmosphereColor, setAtmosphereColor] = useState(() => {
    return localStorage.getItem("fwall-atmosphere-color") || "#9b87f5"; // Default primary color
  });
  const [selected, setSelected] = useState<any | null>(null);
  const [dataFiles, setDataFiles] = useState<DataFile[]>([]);

  useEffect(() => {
    localStorage.setItem("fwall-atmosphere-color", atmosphereColor);
  }, [atmosphereColor]);

  useEffect(() => {
    const fetchDataFiles = async () => {
      try {
        const response = await fetch('/api/list-data');
        if (response.ok) {
          const files = await response.json();
          setDataFiles(files);
        }
      } catch (error) {
        console.error("Failed to fetch data files:", error);
      }
    };
    fetchDataFiles();
  }, []);

  const images = dataFiles.filter(file => 
    /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.name)
  );

  const getFileNameWithoutExtension = (filename: string) => {
    return filename.replace(/\.[^/.]+$/, "");
  };

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
            The Pool :) 
          </ScrambledText>
          <p className="mt-3 text-muted-foreground text-sm max-w-md mx-auto" style={{ textWrap: "balance" } as React.CSSProperties}>
            A curated stream of high-fidelity digital canvases.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="masonry-grid columns-1 sm:columns-2 lg:columns-3 xl:columns-4 p-6">
          {images.map((file, index) => (
            <div key={file.name} className="relative group">
              <WallpaperCard
                src={file.url}
                title={getFileNameWithoutExtension(file.name)}
                author="FWall"
                index={index}
                onClick={() => setSelected({
                  id: file.name,
                  src: file.url,
                  downloadUrl: `${file.url}?download=1`,
                  title: getFileNameWithoutExtension(file.name),
                  author: "FWall"
                })}
              />
              <a
                href={`${file.url}?download=1`}
                download={file.name}
                className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Other Files Section */}
        {dataFiles.length > images.length && (
          <div className="max-w-4xl mx-auto px-6 py-12">
            <h2 className="text-xl font-semibold mb-6 tracking-tight flex items-center gap-2 text-muted-foreground">
              <File className="w-5 h-5" />
              Other Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dataFiles.filter(f => !images.includes(f)).map((file) => (
                <motion.div
                  key={file.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-secondary/30 backdrop-blur-sm border border-border/50 rounded-xl p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <File className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-sm truncate">{getFileNameWithoutExtension(file.name)}</span>
                  </div>
                  <a
                    href={`${file.url}?download=1`}
                    download={file.name}
                    className="p-2 hover:bg-primary/20 rounded-lg transition-colors text-muted-foreground hover:text-primary"
                    title="Download"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <WallpaperModal wallpaper={selected} onClose={() => setSelected(null)} />
      </div>
    </div>
  );
};

export default Index;
