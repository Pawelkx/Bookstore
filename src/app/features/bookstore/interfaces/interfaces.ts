import { Author } from './../../../shared/services/interfaces';

export interface Nationality {
    label: string;
    value: string;
}

export interface TableAuthor extends Author {
    name: string;
    bookCount: number;
}
