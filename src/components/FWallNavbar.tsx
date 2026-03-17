import { motion, useScroll, useTransform } from "framer-motion";
import ScrambledText from "./ScrambledText";

interface FWallNavbarProps {
  atmosphere: string;
  onAtmosphereChange: (atm: string) => void;
}

const atmospheres = [
  { id: "default", color: "bg-primary" },
  { id: "blue", color: "bg-accent" },
  { id: "teal", color: "bg-emerald-500" },
];

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
          {/* Atmosphere dots */}
          <div className="flex items-center gap-2">
            {atmospheres.map((atm) => (
              <button
                key={atm.id}
                onClick={() => onAtmosphereChange(atm.id)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${atm.color} ${
                  atmosphere === atm.id
                    ? "scale-125 ring-2 ring-foreground/30 ring-offset-1 ring-offset-background"
                    : "opacity-50 hover:opacity-80"
                }`}
              />
            ))}
          </div>

          <button className="px-5 py-2 rounded-full text-sm font-medium bg-foreground text-background transition-all duration-300 hover:shadow-[0_0_20px_hsla(0,0%,100%,0.3)]">
            Contribute
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default FWallNavbar;
