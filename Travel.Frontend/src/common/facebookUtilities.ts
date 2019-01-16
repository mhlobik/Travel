export enum FacebookLoginStatusEmum {
    connected = 'connected' ,
    not_authorized = 'not_authorized',
    unknown = 'unknown'
}

export interface IFacebookEvent {
    eventDescription: string;
    eventId: string;
    eventName: string;
    eventPlaceCity: string;
    eventPlaceCountry: string;
    eventRSVPStatus: string;
}

export interface IFacebookGroup {
    groupDescription?: string;
    groupId: string;
    groupName: string;
    groupPurpose?: string;
    groupVenueCity?: string;
}

export interface IFacebookLike {
    likedPageId: string;
    likedPageName: string;
}

export interface IFacebookTaggedPlace {
    city: string;
    country: string;
    latitude: string;
    longitude: string;
    name: string;
    taggedPlaceId: string;
}

export interface IUserProfile {
    facebookEvents: Array<IFacebookEvent>;
    facebookGroups: Array<IFacebookGroup>;
    facebookLikes: Array<IFacebookLike>;
    facebookTaggedPlaces: Array<IFacebookTaggedPlace>;
    userId: string;
    preferences?: Array<number>;
    locationName: string;
}

export interface IUser {
    email: string;
    firstName: string;
    lastName: string;
    userId: string;
}

export function mapResponseToIFacebookLike(likes: any): Array<IFacebookLike> {
    const mappedLikes: Array<IFacebookLike> = likes.data.map((like) => {
        const result: IFacebookLike = {
            likedPageId: like.id,
            likedPageName: like.name
        };
        return result;
    });
    return mappedLikes;
}

export function mapResponseToIFacebookEvent(events: any): Array<IFacebookEvent> {
    const mappedEvents: Array<IFacebookEvent> = events.data.map((event) => {
        const result: IFacebookEvent = {
            eventDescription: event.description,
            eventId: event.id,
            eventName: event.name,
            eventPlaceCity: event.place.location.city,
            eventPlaceCountry: event.place.location.country,
            eventRSVPStatus: event.rsvp_status
        };
        return result;
    });
    return mappedEvents;
}

export function mapResponseToIFacebookGroup(groups: any): Array<IFacebookGroup> {
    const mappedEvents: Array<IFacebookGroup> = groups.data.map((group) => {
        const result: IFacebookGroup = {
                groupId: group.id,
                groupName: group.name
        };
        return result;
    });
    return mappedEvents;
}

export function mapResponseToIFacebookTaggedPlace(taggedPlaces: any): Array<IFacebookTaggedPlace> {
    const mappedEvents: Array<IFacebookTaggedPlace> = taggedPlaces.data.map((taggedPlace) => {
        const result: IFacebookTaggedPlace = {
                taggedPlaceId: taggedPlace.id,
                name: taggedPlace.place.name,
                city: taggedPlace.place.location.city,
                country: taggedPlace.place.location.country,
                latitude: taggedPlace.place.location.latitude,
                longitude: taggedPlace.place.location.longitude
        };
        return result;
    });
    return mappedEvents;
}