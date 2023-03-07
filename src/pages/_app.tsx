import { type AppProps } from "next/app";
import Head from "next/head";
import {
  type ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { setCookie } from "cookies-next";
import { type Session } from "next-auth";
import { trpc } from "../utils/trpc";
import { ModalsProvider } from "@mantine/modals";

type AppPropsWithLayout = AppProps<{
  session: Session;
}> & {
  colorScheme: ColorScheme;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value ?? (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookie("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  return (
    <>
      <Head>
        <title>Lucas</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme, primaryColor: "red" }}
          withGlobalStyles
          withNormalizeCSS
        >
          <SessionProvider session={pageProps.session}>
            <ModalsProvider>
              <Component {...pageProps} />
            </ModalsProvider>
          </SessionProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

export default trpc.withTRPC(MyApp);
