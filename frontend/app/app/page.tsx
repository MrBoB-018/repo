import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar/Navbar";
import RealmsMenu from "./RealmsMenu/RealmsMenu";
import { getVisitedRealms } from "@/utils/supabase/getVisitedRealms";

export default async function App() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!user || !session) {
    return redirect("/signin");
  }

  const realms: any = [];
  const { data: ownedRealms, error } = await supabase
    .from("realms")
    .select("id, name, share_id")
    .eq("owner_id", user.id);
  if (ownedRealms) {
    realms.push(...ownedRealms);
  }
  if (session) {
    let { data: visitedRealms, error: visitedRealmsError } =
      await getVisitedRealms(session.access_token);
    if (visitedRealms) {
      visitedRealms = visitedRealms.map((realm) => ({
        ...realm,
        shared: true,
      }));
      realms.push(...visitedRealms);
    }
  }
  const errorMessage = error?.message || "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-slate-900">
      <Navbar />
      <div className="pt-24 pb-32 px-4 sm:px-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent mb-8">
          Your Spaces
        </h1>
        <RealmsMenu realms={realms} errorMessage={errorMessage} />
      </div>
    </div>
  );
}
