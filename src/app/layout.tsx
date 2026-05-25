import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";

import classNames from "classnames";

import { Footer, Header, Providers, RouteGuard, MagicBackground } from "@/components";
import { baseURL, dataStyle, effects, fonts, home, person, style } from "@/resources";
import {
  Background,
  Column,
  Flex,
  Meta,
  RevealFx,
  type SpacingToken,
  type opacity,
} from "@once-ui-system/core";

export async function generateMetadata() {
  const metadata = Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });

  return {
    ...metadata,
    authors: [{ name: person.name }],
    openGraph: {
      ...metadata.openGraph,
      title: home.title,
      description: home.description,
      url: baseURL,
      siteName: person.name,
      images: [home.image],
    },
    twitter: {
      card: "summary_large_image",
      title: home.title,
      description: home.description,
      images: [home.image],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme="dark"
      style={{ colorScheme: "dark" }}
      className={classNames(
        "dark",
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >
      <head>
        <script
          id="theme-init"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Needed for theme initialization without FOUC
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const root = document.documentElement;
                  
                  const config = ${JSON.stringify({
                    brand: style.brand,
                    accent: style.accent,
                    neutral: style.neutral,
                    solid: style.solid,
                    "solid-style": style.solidStyle,
                    border: style.border,
                    surface: style.surface,
                    transition: style.transition,
                    scaling: style.scaling,
                    "viz-style": dataStyle.variant,
                  })};
                  
                  Object.entries(config).forEach(([key, value]) => {
                    root.setAttribute('data-' + key, value);
                  });
                  
                  root.setAttribute('data-theme', 'dark');
                } catch (e) {
                  console.error('Failed to initialize theme:', e);
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="dark text-white" style={{ background: "transparent" }}>
        <Providers>
          {/* Magic UI Global Background — lives safely inside body */}
          <MagicBackground />

          <Column
            fillWidth
            style={{ minHeight: "100vh", background: "transparent" }}
            margin="0"
            padding="0"
            horizontal="center"
          >
            <RevealFx fill position="absolute">
              <Background
                mask={{
                  x: effects.mask.x,
                  y: effects.mask.y,
                  radius: effects.mask.radius,
                  cursor: effects.mask.cursor,
                }}
                gradient={{
                  display: false,
                  opacity: 0 as opacity,
                  x: effects.gradient.x,
                  y: effects.gradient.y,
                  width: effects.gradient.width,
                  height: effects.gradient.height,
                  tilt: effects.gradient.tilt,
                  colorStart: "static-transparent",
                  colorEnd: "static-transparent",
                }}
                dots={{
                  display: false,
                  opacity: 0 as opacity,
                  size: effects.dots.size as SpacingToken,
                  color: effects.dots.color,
                }}
                grid={{
                  display: false,
                  opacity: 0 as opacity,
                  color: effects.grid.color,
                  width: effects.grid.width,
                  height: effects.grid.height,
                }}
                lines={{
                  display: false,
                  opacity: 0 as opacity,
                  size: effects.lines.size as SpacingToken,
                  thickness: effects.lines.thickness,
                  angle: effects.lines.angle,
                  color: effects.lines.color,
                }}
              />
            </RevealFx>
            <Flex fillWidth minHeight="16" s={{ hide: true }} />
            <Header />
            <Flex zIndex={0} fillWidth horizontal="center" flex={1} className="main-content-wrapper">
              <Flex horizontal="center" fillWidth minHeight="0">
                <RouteGuard>{children}</RouteGuard>
              </Flex>
            </Flex>
            <Footer />
          </Column>
        </Providers>
      </body>
    </html>
  );
}
