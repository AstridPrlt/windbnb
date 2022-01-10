export interface HomeItem {
    city: string;
    country: string;
    coord: [number, number];
    superHost: boolean;
    title: string;
    rating: number;
    maxGuests: number;
    type: string;
    beds: number | null;
    photo: string;
}
