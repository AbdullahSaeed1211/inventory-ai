import { BorderBeam } from "@/components/magicui/border-beam";
import home from "@/public/home.png";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="h-screen w-full bg-black bg-dot-white/[0.2] relative flex items-center justify-center">
    {/* Radial gradient for the container to give a faded look */}
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

    <div className="flex flex-col items-center justify-center relative z-20">
      <p className="text-4xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-2">
        Inventory <span className="text-[#0284c7]">AI</span>
      </p>
      <p className="mt-1 text-neutral-400">
        Inventory AI: Your Inventory wizard.
      </p>

        {/* Responsive Image Container */}
        <div className="relative mt-6 w-full">
          <div className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] rounded-xl mx-auto">
            <Image
              src={home}
              alt="Home"
              className="h-full w-full object-cover rounded-xl"
            />
            <BorderBeam />
          </div>
        </div>
      </div>
    </div>
  );
}
