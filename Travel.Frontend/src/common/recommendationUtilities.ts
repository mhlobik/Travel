import { ICity } from './city';
import { RecommenderModelEnum } from './enums';

export interface IRecommendation {
    userId: string;
    recommenderModel: RecommenderModelEnum;
    recommendedCity: ICity;
    similarity: number;
    rating: number;
}
