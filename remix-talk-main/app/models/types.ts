export interface Series {
  id: string;
  genreId: string;
  stars: string;
  title: string;
  src?: string;
}

export interface Genre {
  id: string;
  name: string;
}

export interface Review {
  id: string;
  seriesId: string;
  username: string;
  comment: string;
}
