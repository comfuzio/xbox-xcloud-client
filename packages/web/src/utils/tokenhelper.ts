import { getSessionStorage } from "./localstorage";

export function getWebToken() {
  const webToken = getSessionStorage("auth_web_token") ?? undefined;

  let uhs = "";
  let token = "";

  if (webToken !== undefined) {
    const parsedToken = JSON.parse(webToken);

    uhs = parsedToken.DisplayClaims?.xui[0]?.uhs;
    token = parsedToken.Token;
  }

  return { uhs: uhs, token: token };
}

export function getxHomeToken() {
  const xhomeToken = getSessionStorage("auth_xcloud_token") ?? undefined;

  let market = "";
  let token = "";
  let region = "";

  if (xhomeToken !== undefined) {
    const parsedToken = JSON.parse(xhomeToken);

    market = parsedToken.market;
    token = parsedToken.gsToken;

    for(const cloudRegion of parsedToken.offeringSettings.regions){
      if(cloudRegion.isDefault){
        const match = cloudRegion.baseUri.match(/^https?:\/\/([a-z]+)\./);
        region = match ? match[1] : "";
      }
    }
  }

  console.log('tokens', { token, market, region })

  return { token, market, region };
}