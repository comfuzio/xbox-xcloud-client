import { Card, CardBody, Slider } from "@heroui/react";

import { card, title } from "@/components/primitives";
import SettingsUtil from "@/utils/settings";

export default function SettingsPage() {
  const settingsUtil = new SettingsUtil();

  // const showModal = useModal();
  // console.log("Settings:", settingsUtil.settings);

  function updateTileSize(value: number | number[]) {
    const newSettings = settingsUtil.settings;

    newSettings.ui.tile_size = value as number;
    settingsUtil.updateSettings(newSettings);
  }

  return (
    <section className="flex flex-col gap-4">
      <h1 className={title()}>General</h1>
      <Card className={card()}>
        <CardBody>
          <div className="flex flex-row gap-4">
            <p className="flex-grow">Label</p>

            <div className="flex-grow text-right">
              <Slider
                className="max-w-[200px] ml-auto"
                color="foreground"
                defaultValue={settingsUtil.settings.ui.tile_size}
                getValue={(pixels) => `${pixels} px`}
                label="Size"
                maxValue={300}
                minValue={100}
                showSteps={true}
                size="md"
                step={50}
                onChangeEnd={updateTileSize}
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}
