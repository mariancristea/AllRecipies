export interface RecipeListConfig {
    type: string;
    search: boolean;

    filters: {
      tag?: string[],
      author?: string,
      favorited?: string,
      limit?: number,
      offset?: number,
      underTime?: number
    };
  }
