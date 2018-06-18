export interface Category {
    id: string;
    name: string;
    slug: string;
    order: number;
    parent: string;
    paths: string[];
    description: string;
}
