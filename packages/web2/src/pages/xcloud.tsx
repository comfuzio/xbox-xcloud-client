import { title } from "@/components/primitives";
import { Button } from "@heroui/react";
import DefaultLayout from "@/layouts/default";

import { showErrorToast } from "@/utils/toast";

export default function xCloudPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Blog</h1>

          <Button onPress={ () => { showErrorToast('Tester') }}>Toast!</Button>
        </div>
      </section>
    </DefaultLayout>
  );
}
