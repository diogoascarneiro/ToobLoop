import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "T∞bL∞p - Be the Youtube VJ you want to see in your life",
  description: "Experiment with multiple Youtube players in a single screen",
};

export default function VideosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
