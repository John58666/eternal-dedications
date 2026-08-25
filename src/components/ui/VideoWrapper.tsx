import React from 'react';

interface VideoWrapperProps {
  videoNumber: number;
}

export const VideoWrapper: React.FC<VideoWrapperProps> = ({ videoNumber }) => {
  return (
    <div className="relative w-full aspect-video rounded-2xl bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center overflow-hidden shadow-lg">
      <div className="w-16 h-16 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 hover:scale-110">
        <svg
          className="w-8 h-8 text-gray-700 ml-1"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      <span className="absolute bottom-3 left-3 text-xs font-semibold text-gray-700 bg-white/70 px-2 py-1 rounded-lg">
        Video {videoNumber}
      </span>
    </div>
  );
};
