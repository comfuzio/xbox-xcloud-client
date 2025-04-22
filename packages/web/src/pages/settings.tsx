'use client';

import { useEffect, useState } from "react";

import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "../styles/Home.module.css";

import Logger from '@greenlight/logger'

import { trpcReact } from './_app'

export default function Settings() {

  return (
    <>
      <Head>
        <title>Greenlight - Settings</title>
      </Head>
      <div>
        Settings...
      </div>
    </>
  );
}
