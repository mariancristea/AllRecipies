import { Profile } from './profile.model';

export interface Recipe {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    favorited: boolean;
    favoritesCount: number;
    author: Profile;
}
