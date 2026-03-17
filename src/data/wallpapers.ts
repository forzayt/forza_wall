import wall1 from "@/assets/wallpapers/wall-1.jpg";
import wall2 from "@/assets/wallpapers/wall-2.jpg";
import wall3 from "@/assets/wallpapers/wall-3.jpg";
import wall4 from "@/assets/wallpapers/wall-4.jpg";
import wall5 from "@/assets/wallpapers/wall-5.jpg";
import wall6 from "@/assets/wallpapers/wall-6.jpg";
import wall7 from "@/assets/wallpapers/wall-7.jpg";
import wall8 from "@/assets/wallpapers/wall-8.jpg";

export interface Wallpaper {
  id: string;
  src: string;
  title: string;
  author: string;
}

export const wallpapers: Wallpaper[] = [
  { id: "1", src: wall1, title: "Cosmic Nebula", author: "Astro Studio" },
  { id: "2", src: wall2, title: "Golden Horizon", author: "Minimal Works" },
  { id: "3", src: wall3, title: "Fluid Neon", author: "Chromatic Lab" },
  { id: "4", src: wall4, title: "Aurora Veil", author: "Nordic Pixel" },
  { id: "5", src: wall5, title: "Lunar Tide", author: "Deep Blue Co." },
  { id: "6", src: wall6, title: "Neon Grid", author: "Cybr Designs" },
  { id: "7", src: wall7, title: "Petal Drops", author: "Macro Lens" },
  { id: "8", src: wall8, title: "Neon City", author: "Future Vision" },
];

// Duplicate to simulate more content for infinite scroll feel
export const getWallpaperStream = (): Wallpaper[] => {
  return [...wallpapers, ...wallpapers.map((w, i) => ({ ...w, id: `dup-${i}` }))];
};
