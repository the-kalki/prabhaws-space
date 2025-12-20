import Avatar from "@/components/Avatar";
import Title from "@/components/Title";
import SocialRing from "@/components/SocialRing";
import Cursor from "@/components/Cursor";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background text-foreground transition-colors duration-500 selection:bg-accent selection:text-white">
      {/* Background Polish Overlay */}
      <div className="absolute inset-0 z-0 backdrop-blur-[100px] pointer-events-none opacity-50" />

      <Cursor />
      <ThemeToggle />

      {/* Central Hub */}
      <div className="relative flex flex-col items-center justify-center -translate-y-2 md:-translate-y-4">
        <div className="relative z-20">
          <Avatar />
        </div>
        <Title />

        {/* Social Ring: Positioned absolute center to radiate outwards */}
        <SocialRing />
      </div>
    </main>
  );
}
