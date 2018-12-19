export interface ICity {
    cityId: string;
    name: string;
    country: string;
}

export interface ICityRating {
    cityId: string;
    userId: string;
    liked: boolean;
}