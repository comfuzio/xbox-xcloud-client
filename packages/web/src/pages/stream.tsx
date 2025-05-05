import { title } from "@/components/primitives";
import { useParams, useLocation } from "react-router-dom";


export default function StreamPage() {
  const { serverid } = useParams();
  const isXCloud = location.pathname.startsWith("/stream/xcloud");

  return (
    <div className="greenlight bg-black text-foreground h-screen justify-center">
        <h1 className={title()}>Streaming</h1> <br />

        <p>
          Data: <br />
          Game: {serverid} <br />
          Type: {isXCloud ? "xCloud" : "Console"} <br />
        </p>
    </div>
  );
}
