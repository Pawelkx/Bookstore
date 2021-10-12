import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Author } from '../shared/services/interfaces';
import { BookstoreApiService } from '../shared/services/bookstore-api.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthorsResolver implements Resolve<Author[]> {
    constructor(private readonly bookstoreApiService: BookstoreApiService) {}
    resolve(route: ActivatedRouteSnapshot) {
        return this.bookstoreApiService.getAuthors().catch((err) => {
            throw new Error(`Couldn't fetch authors from the API`);
        });
    }
}
