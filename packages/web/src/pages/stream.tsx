import { title } from "@/components/primitives";
import { Button } from "@heroui/button";

export default function StreamPage() {
  return (
    <div className="greenlight bg-black text-foreground h-screen justify-center">
        <h1 className={title()}>Streaming</h1> <br />

        <Button data-nav data-nav-group="default">Toast</Button>
        <Button data-nav data-nav-group="default">Toast 2</Button>
    </div>
  );
}
