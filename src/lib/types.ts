export type AnimeCard = {
  id: string;
  title: string;
  thumbnail: string;
  slug: string;
}

export type AnimeDetails2 = {
  title: string;
  thumbnail: string;
  japaneseTitle: string;
  rating: number;
  producer: string;
  type: string;
  status: string;
  totalEpisode: string;
  Duration: string;
  releaseDate: string;
  studio: string;
  gendre: Array<string>
}
