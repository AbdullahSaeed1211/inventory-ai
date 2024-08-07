"use client";

import Link from "next/link";
import { Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6 lg:py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">Inventory AI</h3>
            <p className="text-neutral-400 text-sm">
              © 2024 Inventory AI. All rights reserved.<br />
              Created by Abdullah Saeed
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4 justify-center md:justify-end">
            <Link href="https://github.com/AbdullahSaeed1211" target="_blank" rel="noopener noreferrer">
              <Github className="w-6 h-6 text-neutral-400 hover:text-white transition-colors" />
            </Link>
            <Link href="https://www.linkedin.com/in/abdullah-saeed1211/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-6 h-6 text-neutral-400 hover:text-white transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
