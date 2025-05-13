// import { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useContext } from "react";
import { useTRPC } from "@/utils/trpc";
import { getStreamingToken } from "@/utils/tokenhelper";
import { TitleManagerContext } from "@/providers/titlemanager";
import { CircularProgress } from "@heroui/react";

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export default function XCloudLayout(){
  const trpc = useTRPC();
  const { metadata, games, setMetadata, setGames } = useContext(TitleManagerContext)

  const titles = useQuery({
    ...trpc.gamepass_get_titles.queryOptions({ token: getStreamingToken() }),
    enabled: metadata.size === 0,
  });
  const gameResolver = useMutation({
    ...trpc.gamepass_batch_productids.mutationOptions(),
    onSuccess: (resolvedTitles) => {
      console.log('resolvedTitles:', resolvedTitles.data.Products);
      const newMap = new Map<string, any>();
      for(const title of (Object.values(resolvedTitles.data.Products) as any)) {
        const gameKey = title.StoreId.toLowerCase();
        if(! games.has(gameKey)) {
          newMap.set(gameKey, title);
        }
      }
      if (newMap.size > 0) {
        setGames(newMap);
        console.log('Loaded games:', games, newMap);
      }
    }
  });

  useEffect(() => {
    // Load metadata
    if(titles.data !== undefined){
      const newMap = new Map<string,any>()
      for(const title of titles.data.data.results){
        if(metadata.has(title.titleId)){
          continue
        }
        newMap.set(title.titleId, title.details)
      }
      if(newMap.size > 0){
        setMetadata(newMap)
        console.log('Loaded metadata:', metadata, newMap)
      }
    }
  }, [titles])

  useEffect(() => {
    // Load game details in batches of 20, but only when we have all the metadata
    if (metadata.size > 0 && games.size === 0) {
      console.log('Load games now?');
  
      const productIds = Array.from(metadata.values()).map((title) => title.productId);
      const batches = chunkArray(productIds, 20); // Split productIds into batches of 20
  
      batches.forEach((batch) => {
        gameResolver.mutate(
          {
            token: getStreamingToken(),
            productIds: batch,
          }
        );
      });
    }
  }, [metadata]);

  return (
    <>
      { (metadata.size == 0 || games.size == 0) ?
        <CircularProgress label={ (metadata.size === 0) ? "Loading metadata..." : "Loading titles..." } />
        : <Outlet />
      }
    </>
  );
}
