"use client";
import AnimatedCharacter from "./play/SkinMenu/AnimatedCharacter";
import Link from "next/link";
import BasicButton from "@/components/BasicButton";
import { Code } from "@phosphor-icons/react";
import { FaUsers, FaGlobe } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

export default function Index() {
  return (
    <div className="w-full grid place-items-center min-h-screen bg-gradient-to-br from-black via-zinc-950 to-slate-900 p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/5 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-[900px] w-full flex flex-col items-center relative z-10 space-y-16">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm mb-4">
            <HiSparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-zinc-300 font-medium">
              Team Collaboration Project
            </span>
          </div>

          <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent leading-tight">
            Metaverse Virtual World
          </h1>

          <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-[700px] mx-auto leading-relaxed">
            A Gather-inspired virtual collaboration platform
          </p>

          <p className="text-base md:text-lg text-zinc-500 max-w-[650px] mx-auto leading-relaxed">
            Built from the ground up by a dedicated team to recreate the
            immersive experience of virtual spaces, enabling real-time
            collaboration and interaction in a metaverse environment.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-6">
          <Link
            href="/app"
            className="transform transition-all duration-300 hover:scale-105"
          >
            <BasicButton>Enter the Metaverse</BasicButton>
          </Link>
          <span className="text-sm text-zinc-500">
            or watch a demo{" "}
            <a
              href="/"
              rel="noopener noreferrer"
              className="text-zinc-300 underline decoration-zinc-600 hover:decoration-purple-500 hover:text-purple-400 transition-all"
            >
              here
            </a>
          </span>
        </div>

        <div className="w-full max-w-[700px] bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-8 space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <FaUsers className="w-5 h-5 text-purple-400" />
            <h2 className="text-2xl font-semibold text-zinc-100">
              Development Team
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/30">
              <p className="text-zinc-200 font-bold">Arun Singh Bisht</p>
              <p className="text-sm text-zinc-500 mt-1">
                Team Lead / Core Developer
              </p>
            </div>
            <div className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/30">
              <p className="text-zinc-200 font-semibold">Rohit Pokhariya</p>
              <p className="text-sm text-zinc-500 mt-1">Core Developer</p>
            </div>
            <div className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/30">
              <p className="text-zinc-200 font-semibold">Aditya Rawat</p>
              <p className="text-sm text-zinc-500 mt-1">Core Developer</p>
            </div>
            <div className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/30">
              <p className="text-zinc-200 font-semibold">Rahul Pandey</p>
              <p className="text-sm text-zinc-500 mt-1">Core Developer</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-zinc-500 text-sm">
          <div className="inline-flex flex-row items-center justify-center gap-2">
            <Code className="w-4 h-4 text-zinc-400" />
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-300 underline decoration-zinc-600 hover:decoration-purple-500 hover:text-purple-400 transition-all"
            >
              View Source Code
            </a>
          </div>
          <div className="inline-flex items-center gap-2">
            <FaGlobe className="w-4 h-4 text-zinc-400" />
            <span className="text-zinc-400">Open Source Project</span>
          </div>
        </div>

        <div className="mt-8">
          <AnimatedCharacter src="/sprites/characters/Character_004.png" />
        </div>
      </div>
    </div>
  );
}
