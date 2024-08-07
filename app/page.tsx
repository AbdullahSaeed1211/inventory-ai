'use client'
import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";
import home from "@/public/home.png";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import Link from "next/link";
import { FadeText } from "@/components/magicui/fade-text";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="max-w-9xl mx-auto h-screen w-full bg-black bg-dot-white/[0.2] relative flex flex-col items-center justify-start lg:mt-10 p-[20px] lg:p-20">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="flex flex-col items-center justify-center relative z-20 text-center space-y-6">
        {/* Animated Shiny Text */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-center space-x-2">
            <AnimatedShinyText className="text-lg">
              <span className="text-gray-300">✨ Introducing Inventory AI</span>
            </AnimatedShinyText>
            <ArrowRightIcon className="text-2xl transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <FadeText
            direction="down"
            className="lg:text-8xl sm:text-5xl text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500"
            framerProps={{
              show: { transition: { delay: 0.6 } },
            }}
            text="Your Ultimate Tool for Smart Inventory Management"
          />
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-neutral-400 lg:text-xl sm:text-lg"
        >
          Transform how you manage your inventory with AI-powered insights.
        </motion.p>

        {/* Get Started Button */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <Link href="/inventory">
            <Button className="flex items-center gap-2 px-4 py-2 mt-5 bg-white rounded-md text-black hover:bg-white/90">
              Get Started For Free
              <span>
                <ArrowRightIcon />
              </span>
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Responsive Image Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="relative w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] mt-10"
      >
        <div className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] w-full rounded-xl mx-auto">
          <Image
            src={home}
            alt="Home"
            className="h-full w-full object-cover rounded-xl"
          />
          <BorderBeam />
        </div>
      </motion.div>
    </div>
  );
}
