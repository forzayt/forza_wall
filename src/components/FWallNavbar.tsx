import { motion, useScroll, useTransform } from "framer-motion";
import ScrambledText from "./ScrambledText";

interface FWallNavbarProps {
  atmosphere: string;
  onAtmosphereChange: (color: string) => void;
}

const FWallNavbar = ({ atmosphere, onAtmosphereChange }: FWallNavbarProps) => {
  const { scrollY } = useScroll();
  const width = useTransform(scrollY, [0, 100], ["95%", "85%"]);
  const y = useTransform(scrollY, [0, 100], [0, 12]);

  return (
    <motion.nav
      style={{ width, y, x: "-50%", left: "50%" }}
      className="fixed top-4 z-50 h-14 max-w-7xl"
    >
      <div className="glass-surface h-full rounded-full px-6 flex items-center justify-between">
        <ScrambledText 
          radius={80} 
          duration={0.6} 
          speed={0.4} 
          scrambleChars=".:*#" 
          className="text-2xl tracking-tighter font-bold text-foreground"
        >
          FWall
        </ScrambledText>

        <div className="flex items-center gap-4">
          <label className="relative flex items-center justify-center w-6 h-6 group cursor-pointer">
            <input
              type="color"
              value={atmosphere}
              onChange={(e) => onAtmosphereChange(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div 
              className="w-4 h-4 rounded-full ring-2 ring-foreground/10 ring-offset-1 ring-offset-background group-hover:scale-125 transition-transform duration-300"
              style={{ backgroundColor: atmosphere }}
            />
          </label>

          <a 
            href="https://github.com/forzayt/fwall"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full text-sm font-medium bg-foreground text-background transition-all duration-300 hover:shadow-[0_0_20px_hsla(0,0%,100%,0.3)]"
          >
            Contribute
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default FWallNavbar;
