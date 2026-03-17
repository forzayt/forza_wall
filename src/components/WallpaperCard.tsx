import { motion } from "framer-motion";
import { useState } from "react";

interface WallpaperCardProps {
  src: string;
  title: string;
  author: string;
  index: number;
  onClick: () => void;
}

const WallpaperCard = ({ src, title, author, index, onClick }: WallpaperCardProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      className="masonry-item cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      onClick={onClick}
    >
      <div className="card-breathe rounded-card overflow-hidden relative group">
        {!loaded && (
          <div className="w-full aspect-[3/4] bg-secondary rounded-card-inner animate-shimmer"
            style={{
              backgroundImage: "linear-gradient(90deg, hsl(var(--secondary)) 0%, hsl(var(--muted)) 50%, hsl(var(--secondary)) 100%)",
              backgroundSize: "200% 100%",
            }}
          />
        )}
        <img
          src={src}
          alt={title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full rounded-card-inner object-cover transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0 absolute inset-0"
          }`}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 rounded-card-inner bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div>
            <p className="text-sm font-medium text-foreground">{title}</p>
            <p className="metadata-text">{author}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WallpaperCard;
