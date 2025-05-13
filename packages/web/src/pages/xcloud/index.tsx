import { Button, CircularProgress } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { title } from "@/components/primitives";
import ViewportGrid from "@/components/viewportgrid";
import SettingsUtil from "@/utils/settings";
import { useTRPC } from "@/utils/trpc";
import { getStreamingToken } from "@/utils/tokenhelper";
import GameTile from "@/components/gametile";

export default function XCloudPage() {
  const navigate = useNavigate();
  const trpc = useTRPC();
  const settingsUtil = new SettingsUtil();
  const recentTitles = useQuery(
    trpc.gamepass_get_recent_titles.queryOptions({
      token: getStreamingToken(),
    }),
  );

  return (
    <section className="flex flex-col justify-center gap-4 py-4">
      <div className="flex flex-row gap-2">
        <h1 className={title() + " flex-grow"}>Recent Games</h1>

        <Button
          data-nav
          className="item-end"
          data-nav-group="default"
          size="sm"
          onPress={() => navigate("/xcloud/library")}
        >
          View Library
        </Button>
      </div>

      <div
        className={
          "flex items-center text-center flex-wrap justify-start gap-4 p-4"
        }
      >
        <ViewportGrid
          key="library"
          maxHeight={settingsUtil.settings.ui.tile_size + 8}
        >
          {recentTitles.isLoading ? (
            <CircularProgress aria-label="Loading titles..." size="lg" />
          ) : (
            recentTitles.data?.data.results.map((title: any) => {
              return (
                <GameTile key={title.titleId} cloudTitle={title.titleId} />
              );
            })
          )}
        </ViewportGrid>
      </div>
    </section>
  );
}
