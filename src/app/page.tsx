"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StartPage() {
  const router = useRouter();
  const [videoCount, setVideoCount] = useState<number>(6);
  const rangeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (rangeRef.current) {
      const progress = ((videoCount - 1) / 7) * 100;
      rangeRef.current.style.setProperty("--range-progress", `${progress}%`);
    }
  }, [videoCount]);

  const handleStartApp = () => {
    router.push(`/videos?count=${videoCount}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-surface to-dark-panel text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-dark-bg rounded-lg shadow-xl p-8">
        <div className="flex justify-center">
          <img src="/tl-logo.png" alt="T∞bL∞p Logo" className="h-48 w-auto" />
        </div>
        <h1 className="text-4xl font-bold text-center mb-4 text-primary-hover">T∞bL∞p</h1>
        <h2 className="text-xl text-center mb-6 text-accent-pink">Visual Mixing & Sound Exploration</h2>

        <p className="text-lg mb-6 text-center text-accent-lilac">
          Create immersive audiovisual experiences using YouTube videos as your source material. Perfect for VJs, sound
          artists, and experimental performances.
        </p>

        <div className="mb-8">
          <label htmlFor="videoCount" className="block text-lg mb-2 text-primary-hover">
            Select your visual canvas (number of videos):
          </label>

          <div className="flex items-center justify-between mb-4">
            <input
              ref={rangeRef}
              type="range"
              id="videoCount"
              min="1"
              max="8"
              value={videoCount}
              onChange={(e) => setVideoCount(parseInt(e.target.value))}
              className="w-full h-2 bg-dark-surface rounded-lg appearance-none cursor-pointer"
            />
            <span className="ml-4 text-2xl font-bold text-primary">{videoCount}</span>
          </div>

          <div className="grid grid-cols-8 gap-1 mb-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setVideoCount(i + 1)}
                className={`h-8 rounded transition-colors ${i < videoCount ? "bg-primary" : "bg-dark-surface"}`}
                aria-label={`Select ${i + 1} videos`}
              />
            ))}
          </div>

          <p className="text-sm mb-6 text-center text-primary-hover">
            Tip: Odd numbers (3, 5, 7) create interesting asymmetrical layouts with one video spanning multiple grid
            cells.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleStartApp}
            className="bg-gradient-to-r from-secondary via-primary to-primary-hover hover:from-primary hover:via-primary-hover hover:to-accent-pink text-white font-bold py-3 px-6 rounded-lg text-lg transition-all hover:shadow-lg">
            Launch T∞bL∞p
          </button>
        </div>

        <div className="mt-8 text-center text-xs text-primary-hover">
          <p>
            © 2025 Diogo Carneiro. T∞bL∞p is licensed under{" "}
            <a
              href="https://creativecommons.org/licenses/by-nc/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-pink hover:underline">
              CC BY-NC 4.0
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
