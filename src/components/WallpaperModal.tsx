import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";
import { toast } from "sonner";

interface Wallpaper {
  src: string;
  title: string;
  author: string;
  downloadUrl?: string;
}

interface WallpaperModalProps {
  wallpaper: Wallpaper | null;
  onClose: () => void;
}

const WallpaperModal = ({ wallpaper, onClose }: WallpaperModalProps) => {
  const handleDownload = () => {
    if (wallpaper?.downloadUrl) {
      const link = document.createElement('a');
      link.href = wallpaper.downloadUrl;
      link.download = wallpaper.title; // Note: server-side Content-Disposition takes priority
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Download started.");
    } else {
      toast.error("Download not available.");
    }
  };

  return (
    <AnimatePresence>
      {wallpaper && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Content */}
          <motion.div
            className="relative max-w-5xl w-full flex flex-col items-center gap-6 z-10"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-2 -right-2 w-10 h-10 rounded-full glass-surface flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors z-20"
            >
              <X size={18} />
            </button>

            <img
              src={wallpaper.src}
              alt={wallpaper.title}
              className="max-h-[80vh] w-auto rounded-card object-contain"
              style={{ boxShadow: "0 30px 80px -20px hsla(270, 80%, 65%, 0.25)" }}
            />

            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-lg font-medium text-foreground">{wallpaper.title}</p>
                <p className="metadata-text mt-1">{wallpaper.author}</p>
              </div>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium text-sm transition-all duration-300 hover:shadow-[0_0_20px_hsla(0,0%,100%,0.3)]"
              >
                <Download size={16} />
                Download
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WallpaperModal;
