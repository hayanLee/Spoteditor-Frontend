export interface PlaceBookMark {
  isBookmarked: boolean;
  placeId: number;
}

export type PlaceBookMarkCeck = Pick<PlaceBookMark, 'isBookmarked'>;
