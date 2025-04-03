import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "hfroger",
  tagline: "Personal Digital Garden",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://hfroger.ch",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          routeBasePath: "/",
          showLastUpdateTime: true
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "",
      logo: {
        alt: "hfroger.ch Logo",
        src: "img/hfroger-logo.png",
      },
      items: [
        { to: "/links", label: "Links", position: "left" },
        { to: "/category/projects", label: "Projects", position: "left" },
        { to: "/category/notes", label: "Notes", position: "left" },
        { to: "/category/archive", label: "Archive", position: "left" },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            { to: "/links", label: "Links" },
            { to: "/category/projects", label: "Projects" },
            { to: "/category/notes", label: "Notes" },
            { to: "/category/archive", label: "Archive" },
          ],
        },
        {
          title: "Contact",
          items: [
            {
              label: "Matrix",
              href: "https://matrix.to/#/@hfroger:matrix.org",
            },
            {
              label: "Linkedin",
              href: "https://www.linkedin.com/in/hadrienfroger",
            },
            {
              label: "Schedule a Call",
              href: "https://cal.com/hadrien/30min",
            },
            {
              label: "hadrien@octree.ch",
              href: "mailto:hadrien@octree.ch",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/froger",
            },
          ],
        },
      ],
      copyright:
        "Love data | Data is essential | Data must flow | Data must be used | Data is neither good nor bad | There is no illegal data | Data is free | Data can not be owned | No man, machine or system shall interrupt the flow of data | Locking data is a crime against datanity <br /> Love data",
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      defaultLanguage: "ruby",
    },
    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
