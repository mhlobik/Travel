import * as React from 'react';
import Carousel from '../carousel/carousel';
import { IRecommendation } from '../../common/recommendationUtilities';
import './knowledgeBased.scss';
import { ICity } from '../../common/city';

interface IKnowledgeBasedProps {
    knowledgeBasedRecommendations: Array<IRecommendation>;
    handleOnItemClick(recommendedCity: ICity): void;
}

export default class KnowledgeBased extends React.PureComponent<IKnowledgeBasedProps, {}> {
    public render() {
        return (
            <div className="knowledge-based__container">
                <span className="knowledge-based__title">Cities based on your preferences:</span>
                <Carousel
                    knowledgeBasedRecommendations={this.props.knowledgeBasedRecommendations}
                    handleOnItemClick={this.props.handleOnItemClick}
                />
            </div>
        );
    }
}