import { Author, Book } from './interfaces';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BookstoreApiService {
    constructor(private readonly httpClient: HttpClient) {}

    /* ---------------------------------- BOOKS --------------------------------- */
    async getBooks() {
        const books = await this.httpClient
            .get<Book[]>(`${environment.apiUrl}/books`)
            .toPromise();
        return books;
    }

    /* --------------------------------- AUTHORS -------------------------------- */
    async getAuthors() {
        const authors = await this.httpClient
            .get<Author[]>(`${environment.apiUrl}/authors`)
            .toPromise();

        return authors;
    }
}
