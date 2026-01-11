"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StartPage() {
  const router = useRouter();
  const [videoCount, setVideoCount] = useState<number>(6);

  const handleStartApp = () => {
    router.push(`/videos?count=${videoCount}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-gray-800 rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-4">T∞bL∞p</h1>
        <h2 className="text-xl text-purple-400 text-center mb-6">Visual Mixing & Sound Exploration</h2>

        <p className="text-lg text-gray-300 mb-6 text-center">
          Create immersive audiovisual experiences using YouTube videos as your source material. Perfect for VJs, sound
          artists, and experimental performances.
        </p>

        <div className="mb-8">
          <label htmlFor="videoCount" className="block text-lg mb-2">
            Select your visual canvas (number of videos):
          </label>

          <div className="flex items-center justify-between mb-4">
            <input
              type="range"
              id="videoCount"
              min="1"
              max="8"
              value={videoCount}
              onChange={(e) => setVideoCount(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <span className="ml-4 text-2xl font-bold">{videoCount}</span>
          </div>

          <div className="grid grid-cols-8 gap-1 mb-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setVideoCount(i + 1)}
                className={`h-8 rounded ${i < videoCount ? "bg-purple-600" : "bg-gray-700"}`}
                aria-label={`Select ${i + 1} videos`}
              />
            ))}
          </div>

          <p className="text-sm text-gray-400 mb-6 text-center">
            Tip: Odd numbers (3, 5, 7) create interesting asymmetrical layouts with one video spanning multiple grid
            cells.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleStartApp}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors">
            Launch T∞bL∞p
          </button>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>
            © 2025 Diogo Carneiro. T∞bL∞p is licensed under{" "}
            <a
              href="https://creativecommons.org/licenses/by-nc/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:underline">
              CC BY-NC 4.0
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
