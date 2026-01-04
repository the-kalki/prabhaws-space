import Avatar from "@/components/Avatar";
import SocialRing from "@/components/SocialRing";
import Cursor from "@/components/Cursor";

import Background from "@/components/Background";

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden text-foreground transition-colors duration-500 selection:bg-accent selection:text-white p-2 sm:p-3 md:p-4 lg:p-5">
      <Background />

      <Cursor />


      {/* Central Hub - Radial Glass Effect */}
      <div className="relative flex w-full h-full min-h-[calc(100vh-16px)] sm:min-h-[calc(100vh-24px)] md:min-h-[calc(100vh-32px)] lg:min-h-[calc(100vh-40px)] flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.1)]">

        <div className="absolute inset-0 -z-10 bg-white/5 backdrop-blur-[2px]" />

        {/* Social Ring - Absolute centered */}
        <SocialRing />

        <div className="relative z-20 flex flex-col items-center">
          <Avatar />
        </div>
      </div>
    </main>
  );
}
