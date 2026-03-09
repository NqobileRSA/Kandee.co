export const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "GreenWaves",
    subtitle: "Eco-Warriors Campaign",
    category: "Commercial",
    duration: "2:30",
    year: "2024",
    videoUrl:
      "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
  },
  {
    id: 2,
    title: "Mystic Horizons",
    subtitle: "ModeElite Fashion",
    category: "Fashion Film",
    duration: "3:15",
    year: "2024",
    videoUrl:
      "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
  },
  {
    id: 3,
    title: "Pixel Fusion",
    subtitle: "Techno Innovation",
    category: "Brand Video",
    duration: "1:45",
    year: "2024",
    videoUrl:
      "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
  },
  {
    id: 4,
    title: "EcoExplorer",
    subtitle: "GreenEarth Documentary",
    category: "Documentary",
    duration: "5:20",
    year: "2023",
    videoUrl:
      "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
  },
  {
    id: 5,
    title: "Urban Uplift",
    subtitle: "MetroScape Development",
    category: "Corporate",
    duration: "2:00",
    year: "2023",
    videoUrl:
      "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
  },
] as const;

export type PortfolioItem = (typeof PORTFOLIO_ITEMS)[number];
