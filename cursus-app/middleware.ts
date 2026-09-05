import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publishableKey: "pk_test_c3VpdGVkLWxhYnJhZG9yLTMzMzYuY2xlcmsuYWNjb3VudHMuZGV2",
  secretKey: "sk_test_" + "tFpXjfZdr0I7S3gHpgDfuqbYpzPTNEp8Bu2wyQniNS",
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
