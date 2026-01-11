import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "T∞bL∞p Controls - Manage Your Videos",
  description: "Control panel for managing multiple YouTube videos in T∞bL∞p.",
};

export default function ControlsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
