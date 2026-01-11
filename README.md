# T∞bL∞p

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)

A Next.js application designed for VJs and sound artists to create immersive audiovisual experiences using YouTube videos as source material. T∞bL∞p allows you to display multiple YouTube videos simultaneously, creating a dynamic visual canvas for live performances, installations, or experimental sound exploration.

## Features

- Display multiple YouTube videos (1-8) in a customizable grid layout
- Adaptive layout that optimizes space for odd numbers of videos
- Individual controls for each video (play/pause, speed control)
- Change videos by providing YouTube URLs or video IDs
- Separate control window for better management during performances
- **Tabbed interface for easy navigation between video controls**
- Auto-hiding interface for distraction-free visual experiences
- Responsive design that works on various screen sizes
- **Advanced video looping with customizable start and end points**
- **Visual loop region indicators and interactive progress bar**
- **YouTube search functionality for discovering random videos by keyword**
- **Automatic video restart when playback ends**

## Perfect for

- VJs looking for a simple multi-video mixing tool
- Sound artists exploring visual accompaniments
- Audiovisual performances and installations
- Experimental music production with visual elements
- Live streaming with multiple video sources
- Interactive art installations

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- React YouTube (for embedding YouTube videos)
- pnpm (package manager)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm (recommended) or other package managers

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tuubluup.git
   cd tuubluup
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Start by selecting how many videos you want to display (1-8)
2. The main window displays your selected videos in an optimized grid layout
3. Move your mouse to the top of the screen to reveal the control bar
4. Click "Open Controls" to launch a separate window for managing all videos
5. In the control window, you can:
   - **Navigate between videos using the tabbed interface**
   - Change video URLs/IDs
   - Adjust playback speed
   - Play/pause individual videos
   - See video titles and current status
   - **Set custom loop points for precise video looping**
   - **Search for random YouTube videos by keyword**
6. Changes made in the control window are instantly reflected in the main display

### Video Looping

T∞bL∞p offers advanced video looping capabilities:

- **Interactive Progress Bar**: Click anywhere on the progress bar to jump to that point in the video
- **Visual Loop Region**: The active loop region is highlighted in purple on the progress bar
- **Loop Controls**:
  - Toggle looping on/off with the dedicated button
  - Set loop start and end points using range sliders or quick-set buttons
  - Visual indicators show the current loop start (green) and end (red) points
  - Loop duration is displayed when looping is active
- **Loop Behavior**: When looping is enabled, videos will automatically jump back to the start point when reaching the end point

### YouTube Search

Discover new visual content easily:

- **Keyword Search**: Enter any keyword in the search box and click "Random" to find related videos
- **Persistent Keywords**: The search term remains after finding a video, allowing you to try multiple videos with the same keyword
- **Fallback System**: If the YouTube search API is unavailable, the system falls back to predefined video collections
- **Categories**: Try keywords like "music", "nature", "abstract", or "space" for different visual styles

### Tabbed Interface

The control window features a tabbed interface for managing multiple videos:

- **Easy Navigation**: Switch between videos using tabs at the top of the control window
- **Video Identification**: Each tab displays the video number and title
- **Focused Controls**: Work with one video at a time for better organization
- **Visual Indicators**: Active tab is highlighted for easy identification

## Performance Tips

- For optimal performance during VJ sets, preload your videos before your performance
- Use shorter, high-energy clips for more dynamic visuals
- Experiment with different playback speeds to create interesting visual textures
- For installations, consider videos with slower movements or ambient qualities
- Use odd numbers of videos (3, 5, 7) to create asymmetrical visual interest
- **Create loops of specific sections to focus on the most visually interesting parts of videos**
- **Use the keyword search to quickly find new visual material during performances**

## License

© 2025 Diogo Carneiro

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0).

This means you are free to:
- Share — copy and redistribute the material in any medium or format
- Adapt — remix, transform, and build upon the material

Under the following terms:
- **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made.
- **NonCommercial** — You may not use the material for commercial purposes.

For more details, see the [LICENSE](LICENSE) file or visit the [Creative Commons website](https://creativecommons.org/licenses/by-nc/4.0/).

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React YouTube](https://github.com/tjallingt/react-youtube)
- [YouTube API](https://developers.google.com/youtube/v3)
