import type { NextConfig } from "next";

const imageHosts = [
  "images.unsplash.com",
  "www.research.colostate.edu",
  "tailwindcss.com",
  "bremershs.eq.edu.au",
  "plus.unsplash.com",
  "img.freepik.com",
  "seeklogo.com",
  "images.seeklogo.com",
  "media2.dev.to",
  "miro.medium.com",
  "blogger.googleusercontent.com",
  "logovectordl.com",
  "cdn.worldvectorlogo.com",
  "988lifeline.org",
  "www.crisistextline.org",
  "www.thehotline.org",
  "rainn.org",
  "play-lh.googleusercontent.com",
  "c.media-amazon.com",
  "media.istockphoto.com",
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: imageHosts.map((hostname) => ({
      protocol: "https",
      hostname,
      port: "",
      pathname: "/**",
    })),
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
