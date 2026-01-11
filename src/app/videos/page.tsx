"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import VideoGrid from "../../components/VideoGrid";

function VideosContent() {
  const searchParams = useSearchParams();
  const [videoCount, setVideoCount] = useState<number>(6);

  useEffect(() => {
    const countParam = searchParams.get("count");
    if (countParam) {
      const count = parseInt(countParam);
      if (!isNaN(count) && count >= 1 && count <= 8) {
        setVideoCount(count);
      }
    }
  }, [searchParams]);

  return <VideoGrid videoCount={videoCount} />;
}

export default function VideosPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen bg-gradient-to-br from-dark-surface to-dark-panel text-white">Loading...</div>}>
      <VideosContent />
    </Suspense>
  );
}
