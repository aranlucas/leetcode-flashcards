import { AppProps } from "next/app";
import Head from "next/head";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { NotificationsProvider } from "@mantine/notifications";
import { setCookie } from "cookies-next";
import { Session } from "next-auth";
import { trpc } from "../utils/trpc";
import { ModalsProvider } from "@mantine/modals";
// @ts-expect-error
import PrismRenderer from "prism-react-renderer/prism";

// @ts-expect-error
(typeof global !== "undefined" ? global : window).Prism = PrismRenderer;

require("prismjs/components/prism-java");

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
        <title>Page title</title>
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
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <SessionProvider session={pageProps.session}>
            <ModalsProvider>
              <NotificationsProvider>
                <Component {...pageProps} />
              </NotificationsProvider>
            </ModalsProvider>
          </SessionProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

export default trpc.withTRPC(MyApp);
