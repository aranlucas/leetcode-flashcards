import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { SessionProvider } from "next-auth/react";
import { auth } from "../server/auth";
import { TRPCProvider } from "../components/trpc-provider";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/code-highlight/styles.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark">
          <SessionProvider session={session} basePath="/api/auth">
            <TRPCProvider>
              <ModalsProvider>
                <Notifications />
                {children}
              </ModalsProvider>
            </TRPCProvider>
          </SessionProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
