import Avatar from "@/components/Avatar";
import SocialRing from "@/components/SocialRing";
import Cursor from "@/components/Cursor";
import FallingText from "@/components/FallingText";

import Background from "@/components/Background";

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden text-foreground transition-colors duration-500 selection:bg-accent selection:text-white p-2 sm:p-3 md:p-4 lg:p-5">
      <Background />

      <Cursor />


      {/* Central Hub - Radial Glass Effect */}
      <div className="relative flex w-full h-full min-h-[calc(100vh-16px)] sm:min-h-[calc(100vh-24px)] md:min-h-[calc(100vh-32px)] lg:min-h-[calc(100vh-40px)] flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.1)]">

        {/* Radial Vignette Glass Layer - Blurs edges, clear center (Transparent in Light Mode) */}
        <div
          className="absolute inset-0 -z-10 bg-transparent dark:bg-white/[0.5] backdrop-blur-none dark:backdrop-blur-[12px]"
          style={{
            maskImage: 'radial-gradient(circle at center, transparent 30%, black 100%)',
            WebkitMaskImage: 'radial-gradient(circle at center, transparent 30%, black 100%)'
          }}
        />

        {/* Falling Text Layer */}
        <FallingText />

        {/* Social Ring - Absolute centered */}
        <SocialRing />

        <div className="relative z-20 flex flex-col items-center">
          <Avatar />
        </div>
      </div>
    </main>
  );
}
