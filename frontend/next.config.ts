/** @format */

// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [

      {
        // get all the item
        source: "/api/recipes",
        destination: "http://localhost:3000/api/recipes",
      },
      {
        source: "/api/recipes/:id",
        destination: "http://localhost:3000/api/recipes/:id",
      },
      {
        // delete recipe by id
        source: "/api/recipes/delete/:id",
        destination: "http://localhost:3000/api/recipes/delete/:id",
      },
    ];
  },
};

export default nextConfig;
