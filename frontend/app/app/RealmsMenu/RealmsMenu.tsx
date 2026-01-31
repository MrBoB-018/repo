"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BasicButton from "@/components/BasicButton";
import DesktopRealmItem from "./DesktopRealmItem";
import { useRouter } from "next/navigation";
import { request } from "@/utils/backend/requests";
import { createClient } from "@/utils/supabase/client";
import revalidate from "@/utils/revalidate";

type Realm = {
  id: string;
  name: string;
  share_id: string;
  shared?: boolean;
};

type RealmsMenuProps = {
  realms: Realm[];
  errorMessage: string;
};

const RealmsMenu: React.FC<RealmsMenuProps> = ({ realms, errorMessage }) => {
  const [selectedRealm, setSelectedRealm] = useState<Realm | null>(null);
  const [playerCounts, setPlayerCounts] = useState<number[]>([]);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    getPlayerCounts();
    revalidate("/play/[id]");
  }, []);

  function getLink() {
    if (selectedRealm?.share_id) {
      return `/play/${selectedRealm.id}?shareId=${selectedRealm.share_id}`;
    } else {
      return `/play/${selectedRealm?.id}`;
    }
  }

  async function getPlayerCounts() {
    // get session
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const { data: playerCountData, error: playerCountsError } = await request(
      "/getPlayerCounts",
      { realmIds: realms.map((realm: any) => realm.id) },
      session.access_token,
    );
    if (playerCountData) {
      setPlayerCounts(playerCountData.playerCounts);
    }
  }

  return (
    <>
      {/* Mobile View */}
      <div className="flex flex-col items-center gap-3 sm:hidden pb-24">
        {realms.length === 0 && (
          <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-8 text-center mt-4">
            <p className="text-zinc-400 text-base leading-relaxed">
              You have no spaces you can join. Create one on desktop to get
              started!
            </p>
          </div>
        )}
        {realms.map((realm, index) => {
          function selectRealm() {
            setSelectedRealm(realm);
          }
          return (
            <BasicButton
              key={realm.id}
              className={`w-full h-14 flex flex-row items-center justify-between px-5 transition-all duration-200 ${
                selectedRealm?.id === realm.id
                  ? "bg-zinc-800/60 border-2 border-purple-500/60 shadow-lg shadow-purple-500/20"
                  : "bg-zinc-900/40 border-2 border-zinc-800/50 hover:border-zinc-700/60 hover:bg-zinc-800/40"
              }`}
              onClick={selectRealm}
            >
              <p className="text-zinc-100 text-lg font-medium text-left">
                {realm.name}
              </p>
              {playerCounts[index] !== undefined && (
                <div className="rounded-full grid place-items-center w-9 h-9 font-semibold bg-emerald-500/90 text-zinc-950 text-sm shadow-sm">
                  {playerCounts[index]}
                </div>
              )}
            </BasicButton>
          );
        })}
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-xl border-t border-zinc-800/50 grid place-items-center p-4 shadow-2xl shadow-black/40">
          <BasicButton
            className="w-full max-w-md text-lg py-3 bg-purple-600/90 hover:bg-purple-500/90 disabled:bg-zinc-800/50 disabled:text-zinc-500 transition-all duration-200 shadow-lg"
            disabled={selectedRealm === null}
            onClick={() => router.push(getLink())}
          >
            Join Space
          </BasicButton>
        </div>
      </div>

      {/* Desktop View */}
      <div className="flex-col items-center w-full hidden sm:flex">
        {realms.length === 0 && (
          <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-12 text-center max-w-2xl mx-auto mt-8">
            <p className="text-zinc-400 text-lg leading-relaxed">
              You have no spaces you can join. Create a space to get started!
            </p>
          </div>
        )}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {realms.map((realm, index) => (
            <DesktopRealmItem
              key={realm.id}
              name={realm.name}
              id={realm.id}
              shareId={realm.share_id}
              shared={realm.shared}
              playerCount={playerCounts[index]}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RealmsMenu;
