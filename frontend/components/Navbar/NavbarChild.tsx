"use client";
import React from "react";
import Image from "next/image";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useModal } from "@/app/hooks/useModal";
import BasicButton from "../BasicButton";

type NavbarChildProps = {
  name: string;
  avatar_url: string;
};

export const NavbarChild: React.FC<NavbarChildProps> = ({
  name,
  avatar_url,
}) => {
  const { setModal } = useModal();

  return (
    <div className="h-16">
      <div className="w-full fixed bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800/50 flex flex-row items-center px-6 sm:px-8 py-3 justify-end sm:justify-between z-10 shadow-lg shadow-black/20">
        <BasicButton
          onClick={() => setModal("Create Realm")}
          className="hidden sm:flex flex-row items-center gap-2 py-2.5 px-5 bg-zinc-800/60 hover:bg-zinc-700/60 border border-zinc-700/50 hover:border-zinc-600/50 text-zinc-100 rounded-lg transition-all duration-200 shadow-sm"
        >
          Create Space
          <PlusCircleIcon className="h-5 w-5" />
        </BasicButton>
        <div
          className="flex flex-row items-center gap-3 hover:bg-zinc-800/50 transition-all duration-200 rounded-full cursor-pointer py-1.5 px-4 pr-1.5 select-none border border-transparent hover:border-zinc-700/50 group"
          onClick={() => setModal("Account Dropdown")}
        >
          <p className="text-zinc-100 font-medium text-sm">{name}</p>
          <div className="relative">
            <Image
              alt="avatar"
              src={avatar_url}
              width={40}
              height={40}
              className="aspect-square rounded-full ring-2 ring-zinc-700/50 group-hover:ring-zinc-600/70 transition-all duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
