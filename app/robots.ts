import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard",
          "/reading",
          "/listening",
          "/writing",
          "/speaking",
          "/general",
          "/cefr",
          "/video",
          "/ai",
          "/achievements",
          "/profile",
          "/admin",
          "/premium",
        ],
      },
    ],
  };
}
