export type Category =
  | "PRE_RELEASE"
  | "RELEASE_DAY"
  | "POST_RELEASE"
  | "GENRE_SPECIFIC"
  | "PLATFORM_AND_AUDIENCE";

export type Action = {
  id: string;
  title: string;
  description: string;
  completeDate: Date;
  category: Category;
};

export type Campaign = {
  id: string;
  songTitle: string;
  songDescription?: string;
  genre?: string;
  mood?: string;
  inspiration?: string;
  targetAudience?: string;
  releaseDate: Date;
  actions: Action[];
};
