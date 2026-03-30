import { motion, useScroll, useTransform } from "framer-motion";
import ScrambledText from "./ScrambledText";
import { RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface FWallNavbarProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

const FWallNavbar = ({ onRefresh, isRefreshing }: FWallNavbarProps) => {
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
          {onRefresh && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="rounded-full px-4 gap-2 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <motion.div
                animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
                transition={isRefreshing ? { repeat: Infinity, duration: 1, ease: "linear" } : { duration: 0.5 }}
              >
                <RefreshCw className="w-4 h-4" />
              </motion.div>
              <span className="hidden sm:inline text-xs font-medium tracking-tight uppercase">
                {isRefreshing ? "Refreshing..." : "Refresh Feed"}
              </span>
            </Button>
          )}

          <a 
            href="https://github.com/forzayt/forza_wall"
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
