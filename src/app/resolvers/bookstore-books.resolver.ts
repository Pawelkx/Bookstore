import { Book } from '../shared/services/interfaces';
import { BookstoreApiService } from '../shared/services/bookstore-api.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class BooksResolver implements Resolve<Book[]> {
    constructor(private readonly bookstoreApiService: BookstoreApiService) {}
    resolve() {
        return this.bookstoreApiService.getBooks().catch((err) => {
            throw new Error(`Couldn't fetch books from the API`);
        });
    }
}
