import Head from "next/head";
import { useQuery } from "@tanstack/react-query";

import { setLocalStorage } from "../../utils/localstorage";
import { useTRPC } from "../../utils/trpc";
import { Card, CardBody, CircularProgress, Code } from "@heroui/react";
import { card } from "../primitives";

export default function MsalAuthentication() {
  const trpc = useTRPC();

  const msalBootstrap = useQuery(trpc.auth_msal_start.queryOptions());
  const msalLoginCallback = useQuery({
    ...trpc.auth_msal_verify.queryOptions(
      msalBootstrap.data?.device_code as string,
    ),
    enabled: !!msalBootstrap.data?.device_code,
  });

  if (msalLoginCallback.data !== undefined) {
    setLocalStorage("auth_data_msal", JSON.stringify(msalLoginCallback.data));
    setLocalStorage("auth_method", "msal");

    // Reload page
    window.location.reload();
  }

  return (
    <>
      <Head>
        <title>Authentication</title>
      </Head>
      <Card className={card()}>
        <CardBody>
        {msalBootstrap.isLoading
        ? 
        <>
          <center><CircularProgress
            size="lg"
            aria-label="Loading authentication..."
           /></center>
        </>
        : 
        <div>
          <p>To sign in, use a web browser to open the page <Code>{ msalBootstrap.data?.verification_uri }</Code> and enter the code <Code>{ msalBootstrap.data?.user_code }</Code> to authenticate.</p>
        </div>
        }
        </CardBody>
      </Card>
      
    </>
  );
}
