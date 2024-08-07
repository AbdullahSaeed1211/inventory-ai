import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";
import home from "@/public/home.png";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";

export default function LandingPage() {
  return (
    <div className="h-screen w-full bg-black bg-dot-white/[0.2] relative flex flex-col items-center justify-center mt-10">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="flex flex-col items-center justify-center relative z-20 text-center space-y-6">
        {/* Animated Shiny Text */}
        <div className="flex items-center justify-center space-x-2">
          <AnimatedShinyText className="text-lg">
            <span className="text-gray-300">✨ Introducing Inventory AI</span>
          </AnimatedShinyText>
          <ArrowRightIcon className="text-2xl transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
        </div>

        {/* Heading */}
        <p className="lg:text-8xl text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
          Your Ultimate Tool for Smart Inventory Management
        </p>

        {/* Subheading */}
        <p className="text-neutral-400 lg:text-xl text-lg">
          Transform how you manage your inventory with AI-powered insights.
        </p>

        {/* Get Started Button */}
        <Button className="flex items-center gap-2 px-4 py-2 mt-5 bg-white rounded-md text-black hover:bg-white/90">
          Get Started For Free
          <span>
            <ArrowRightIcon />
          </span>
        </Button>
      </div>

      {/* Responsive Image Container */}
      <div className="relative w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] mt-10">
        <div className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] w-full rounded-xl mx-auto">
          <Image
            src={home}
            alt="Home"
            className="h-full w-full object-cover rounded-xl"
          />
          <BorderBeam />
        </div>
      </div>
    </div>
  );
}
