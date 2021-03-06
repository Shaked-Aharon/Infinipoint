export interface IAlbum {
    userId: number;
    id: number;
    title: string;
}

export interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface IUserDetails {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        }
    },
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    }
}

export interface IUserData {
    details: IUserDetails,
    albumns: IAlbum[],
    posts: IPost[]
}

export interface IUserSearch {
    name: string;
    id: number;
}