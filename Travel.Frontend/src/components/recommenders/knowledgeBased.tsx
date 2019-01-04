import * as React from 'react';
import Carousel from '../carousel/carousel';
import { IRecommendation } from '../../common/recommendationUtilities';
import './knowledgeBased.scss';
import { ICity } from '../../common/city';
import City from '../city/city';
import { autobind } from 'quick-react-ts';

interface IKnowledgeBasedProps {
    knowledgeBasedRecommendations: Array<IRecommendation>;
    selectedRecommendedCity: ICity;
    openRecommendedItem: boolean;
    handleOnItemClick(recommendedCity: ICity): void;
    onCloseRecommendedItem(): void;
    goToCityTabClick?(itemKey: number): void;
}

export default class KnowledgeBased extends React.PureComponent<IKnowledgeBasedProps, {}> {
    @autobind
    private handleGoToCityTabClick(itemKey: number) {
        console.log('City', itemKey);
    }

    public render() {
        return (
            <div className="knowledge-based__container">
                <span className="knowledge-based__title">Cities based on your preferences:</span>
                <Carousel
                    knowledgeBasedRecommendations={this.props.knowledgeBasedRecommendations}
                    handleOnItemClick={this.props.handleOnItemClick}
                />

                {this.props.openRecommendedItem && this.props.selectedRecommendedCity !== null &&
                    <City
                        selectedRecommendedCity={this.props.selectedRecommendedCity}
                        closeCityDetails={this.props.onCloseRecommendedItem}
                        goToCityTabClick={this.handleGoToCityTabClick}
                        selectedTab={'1'}
                    />
                }
            </div>
        );
    }
}