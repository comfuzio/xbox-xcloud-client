import { Link, useNavigate } from "react-router-dom";
import { Card, CardFooter, Image, Button, CircularProgress } from "@heroui/react";
import { useEffect, useState, useContext } from "react";
import { TitleManagerContext } from "@/providers/titlemanager";
import SettingsUtil from "@/utils/settings";

interface GameTileProps {
    cloudTitle: string;
}

export default function GameTile({ 
    cloudTitle
}:GameTileProps) {
    const navigate = useNavigate();
    const settingsUtil = new SettingsUtil();

    const { metadata, games } = useContext(TitleManagerContext)
    const [ gameDetailsSource, setGameDetailsSource ] = useState<any>(undefined)

    const gameMetadata = metadata.get(cloudTitle);
    const queryProductId = gameMetadata?.productId.toLowerCase();
    const queryGame = games.has(queryProductId)

    useEffect(() => {
      if(queryGame !== undefined){
        setGameDetailsSource(games.get(queryProductId));
      }
    }, [queryGame, queryProductId]);

    return (
        <>
            {
            (gameMetadata === false) ? <p>Error loading title (metadata not found)</p> :
            (gameDetailsSource === undefined) ? <CircularProgress label="Loading..." /> :
            <Link
              data-nav
              data-nav-group="default" 

              key={cloudTitle}
              className={ "w-["+settingsUtil.settings.ui.tile_size.toString()+"px] relative" }
              to={"/stream/xcloud/" + cloudTitle}
            >
              <Card isFooterBlurred className={ "border-none w-["+settingsUtil.settings.ui.tile_size.toString()+"px]" } radius="lg">
                <Image
                  alt={gameDetailsSource.ProductTitle}
                  className="object-cover"
                  height={settingsUtil.settings.ui.tile_size}
                  src={"https:" + (gameDetailsSource.Image_Tile.URL ?? "")}
                  width={settingsUtil.settings.ui.tile_size}
                />
                <CardFooter className={ "justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10" }>
                  <p className="text-tiny text-white/80" style={{ textShadow: '0px 0px 4px #000000' }}>{gameDetailsSource.ProductTitle}</p>
                  <Button
                    className="text-tiny"
                    color="primary"
                    radius="lg"
                    size="sm"
                    onPress={() => navigate("/stream/xcloud/"+cloudTitle)}
                  >
                    Play
                  </Button>
                </CardFooter>
              </Card>
            </Link>
            }
        </>
    );
}
