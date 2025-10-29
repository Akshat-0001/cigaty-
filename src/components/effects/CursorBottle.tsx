import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorBottle = () => {
  const bottleRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Mouse position tracking with spring physics for smooth following
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring configuration for smooth, natural cursor movement
  const springConfig = { damping: 20, stiffness: 300, mass: 0.2 };
  const bottleX = useSpring(mouseX, springConfig);
  const bottleY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device is desktop (no touch support and screen width > 1024px)
    const checkIfDesktop = () => {
      const hasNoTouch = !('ontouchstart' in window) && !navigator.maxTouchPoints;
      const isLargeScreen = window.innerWidth > 1024;
      setIsDesktop(hasNoTouch && isLargeScreen);
    };

    checkIfDesktop();
    window.addEventListener('resize', checkIfDesktop);

    return () => {
      window.removeEventListener('resize', checkIfDesktop);
    };
  }, []);

  useEffect(() => {
    // Only set up mouse tracking on desktop
    if (!isDesktop) {
      document.body.style.cursor = 'auto';
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Follow cursor exactly
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Hide default cursor
    document.body.style.cursor = 'none';

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      // Restore default cursor
      document.body.style.cursor = 'auto';
    };
  }, [mouseX, mouseY, isDesktop]);

  // Don't render on mobile/tablet
  if (!isDesktop) {
    return null;
  }

  return (
    <>
      {/* Hide default cursor - cleaner approach */}
      <style>{`
        body, body * {
          cursor: none !important;
        }
      `}</style>

      <motion.div
        ref={bottleRef}
        className="fixed pointer-events-none"
        style={{
          left: bottleX,
          top: bottleY,
          // Offset adjusted for 35-degree angle (better for bottle shape)
          x: '-30%',
          y: '-8%',
          zIndex: 9999,
          pointerEvents: 'none', // Ensure no click blocking
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Golden glow trail - positioned around bottle */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-gold/50 via-wine/30 to-gold/50 rounded-full blur-xl" />
        </motion.div>

        {/* The bottle as cursor - tilted to point */}
        <motion.div
          className="relative pointer-events-none"
          style={{
            rotate: -35, // Optimized for bottle shape
          }}
        >
          {/* CLICKING POINT INDICATOR - At the bottle cap (AFTER rotation) */}
          <motion.div
            className="absolute z-50 pointer-events-none"
            style={{
              // Position exactly at the bottle cap within the rotated bottle (adjusted for 35°)
              top: '2px',
              left: '60%',
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
            }}
          >
            {/* Glowing backdrop */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gold/30 rounded-full blur-sm"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Main clicking dot with pulse */}
            <motion.div 
              className="w-2 h-2 bg-gold rounded-full shadow-lg shadow-gold/50 relative"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Inner bright core */}
              <div className="absolute inset-0.5 bg-white rounded-full" />
            </motion.div>

            {/* Tiny sparkles around the dot */}
            {[0, 90, 180, 270].map((angle, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-0.5 bg-gold rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  x: Math.cos(angle * Math.PI / 180) * 6,
                  y: Math.sin(angle * Math.PI / 180) * 6,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>

          <motion.img
            src="/assets/bottle.png"
            alt="Cursor"
            className="w-7 h-auto object-contain drop-shadow-2xl"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))',
            }}
          />

          {/* Trail effect - subtle particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-gold/60 rounded-full"
              animate={{
                x: [0, (i + 1) * 15],
                y: [0, (i + 1) * 15],
                opacity: [0.6, 0],
                scale: [1, 0.3],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </>
  );
};

export default CursorBottle;

