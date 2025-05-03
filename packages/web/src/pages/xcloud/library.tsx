import { Button, CircularProgress } from "@heroui/react";
import { Input } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card, CardFooter, Image } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/utils/trpc";
import { title } from "@/components/primitives";
import { getxHomeToken } from "@/utils/tokenhelper";

export default function XCloudLibraryPage() {
  const navigate = useNavigate();
  const trpc = useTRPC();
  const titles = useQuery(
    trpc.gamepass_get_titles.queryOptions({ token: getxHomeToken() }),
  );

  //   console.log(titles);

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

      <div className="grid gap-4 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]">
        {titles.isLoading ? (
          <CircularProgress aria-label="Loading titles..." size="lg" />
        ) : (
          titles.data?.map((game) => (
            <Link
              key={game.XCloudTitleId}
              data-nav
              className="w-[250px]"
              data-nav-group="default"
              to={"/stream/xcloud/GAME_ID"}
            >
              <Card isFooterBlurred className="border-none" radius="lg">
                <Image
                  alt="7 Days to Die - Console Edition (Game Preview)"
                  className="object-cover"
                  height={250}
                  src={"https:" + (game.Image_Tile.URL ?? "")}
                  width={250}
                />
                <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                  <p className="text-tiny text-white/80">{game.ProductTitle}</p>
                  <Button
                    className="text-tiny"
                    color="primary"
                    radius="lg"
                    size="sm"
                    onPress={() => navigate("/stream/xcloud/GAME_ID")}
                  >
                    Play
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
