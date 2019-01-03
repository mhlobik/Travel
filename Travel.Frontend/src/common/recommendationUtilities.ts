import { ICity } from './city';
import { RecommenderModelEnum } from './enums';

export interface IRecommendation {
    userId: string;
    recommendationId: string;
    recommenderModel: RecommenderModelEnum;
    recommendedCity: ICity;
    similarity: number;
}
