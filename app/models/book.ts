export interface Book {
    id: number;
    name: string;
    shortDescription: string;
    imageUrl: string;
    author:string;
    publishedAt: Date;
    genre: string;
    thematicKeywords: string[];
}