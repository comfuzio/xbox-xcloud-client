import { CircularProgress, Input } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useContext } from "react";

import { TitleManagerContext } from "@/providers/titlemanager";
import { useTRPC } from "@/utils/trpc";
import { title } from "@/components/primitives";
import { getStreamingToken } from "@/utils/tokenhelper";
import GameTile from "@/components/gametile";

export default function XCloudLibraryPage() {
  const { metadata, setGames } = useContext(TitleManagerContext);
  const trpc = useTRPC();
  const titles = useQuery(
    trpc.gamepass_get_titles.queryOptions({ token: getStreamingToken() }),
  );

  useEffect(() => {
    if (titles.data !== undefined) {
      const newMap = new Map<string, any>();

      for (const title of titles.data.data.results) {
        if (metadata.has(title.titleId)) {
          continue;
        }
        newMap.set(title.titleId, title.details);
      }
      if (newMap.size > 0) {
        setGames(newMap);
      }
    }
  }, [titles]);

  // console.log("titles", titles.data?.data.results);

  return (
    <section className="flex flex-col justify-center gap-4 py-4">
      <div className="flex flex-row gap-2">
        <h1 className={title() + " flex-grow"}>Library</h1>

        <div className="items-end">
          <Input
            data-nav
            isClearable
            data-nav-group="default"
            label="Search"
            size="sm"
            type="search"
          />
        </div>
      </div>

      <div
        className={
          "flex items-center text-center flex-wrap justify-start gap-4 p-4"
        }
      >
        {titles.isLoading ? (
          <CircularProgress aria-label="Loading titles..." size="lg" />
        ) : (
          titles.data?.data.results.map((title: any) => {
            return <GameTile key={title.titleId} cloudTitle={title.titleId} />;
          })
        )}
      </div>
    </section>
  );
}
