import { Profile } from './profile.model';

export interface Recipe {
    slug: string;
    title: string;
    image: string;
    description: string;
    body: string;
    tagList: string[];
    time: number;
    ingredients: string[];
    steps: string[];
    favorited: boolean;
    favoritesCount: number;
    author: Profile;
}
