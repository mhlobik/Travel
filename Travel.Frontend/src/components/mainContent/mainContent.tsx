import * as React from 'react';
import './mainContent.scss';
import { IUser } from '../../common/facebookUtilities';
import UserPreferences from '../../containers/userPreferences/userPreferences';
import CityChooser from '../../containers/cityChooser/cityChooser';
import Carousel from '../carousel/carousel';

interface IMainContentProps {
    userLoggedIn: boolean;
    user: IUser;
    continueClicked: boolean;
    userPreferencesSaved: boolean;
}

export interface ICarouselData {
    content: string;
    author: string;
    source: string;
}

export default class MainContent extends React.PureComponent<IMainContentProps, {}> {
    public render() {
        // Data for carousel
        const carouselSlidesData: Array<ICarouselData> = [
            {
                content:
                    'Tomorrow, you will be released. If you are bored of brawling with thieves and want to achieve something there is a ' +
                    'rare blue flower that grows on the eastern slopes. Pick one of these flowers. If you can carry it to the top of ' +
                    'the mountain, you may find what you were looking for in the first place.',
                author: '1Bane',
                source: 'facebook'
            }, {
                content:
                    'You have learn to bury your guilt with anger. I will teach you to confront it and to face the truth.',
                author: '2Ra\'s Al Ghul',
                source: 'Snapchat'
            }, {
                content:
                    'Introduce a little anarchy, upset the established order and everything becomes chaos. ' +
                    'I\'m an agent of chaos. Oh, and you know the thing about chaos? It\'s fair.',
                author: '3Joker',
                source: 'facebook'
            }, {
                content:
                    'I can\'t do that as Bruce Wayne... as a man. I\'m flesh and blood. I can be ignored, destroyed. ' +
                    'But as a symbol, I can be incorruptible, I can be everlasting.',
                author: '4Bruce Wayne',
                source: 'facebook'
            }, {
                content:
                    'But it\'s not who you are underneath... it\'s what you do that defines you.',
                author: '5Rachel Dawes',
                source: 'twitter'
            }, {
                content:
                    'When their enemies were at the gates the Romans would suspend democracy and appoint one man to protect the city. ' +
                    'It wasn\'t considered an honor, it was a public service.',
                author: '6John Blake',
                source: 'Google+'
            }, {
                content:
                    'Master Wayne, you\'ve been gone a long time. You look very fashionable. Apart from the mud.',
                author: '7Alfred Pennyworth',
                source: 'twitter'
            }
        ];

        return (
            <div key="container" className="main-content__container">
                {this.props.user !== null && this.props.continueClicked && !this.props.userPreferencesSaved && <UserPreferences />}
                {this.props.user !== null && !this.props.continueClicked && <CityChooser />}

                {this.props.user !== null && this.props.continueClicked && this.props.userPreferencesSaved &&
                    <div className="carousel-container">
                        <Carousel slides={carouselSlidesData} />
                    </div>
                }
            </div>
        );
    }
}
