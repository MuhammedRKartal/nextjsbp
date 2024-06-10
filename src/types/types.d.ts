import NextAuth from "next-auth";

declare module "@reduxjs/toolkit/query/react" {
  export * from "@reduxjs/toolkit/dist/query/react";
}

declare module "@reduxjs/toolkit/query" {
  export * from "@reduxjs/toolkit/dist/query";
}

declare module "@reduxjs/toolkit/dist/query/react" {
  export * from "@reduxjs/toolkit/query";
}

declare module "next-auth" {
  interface Session {
    refreshToken?: string;
  }
}
