export interface Book {
    id: number;
    author_id: number;
    title: string;
    year: number;
}

export interface Author {
    id: number;
    first_name: string;
    last_name: string;
    nationality: string;
}
