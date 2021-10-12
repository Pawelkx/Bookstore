import { AuthorsResolver } from './../../resolvers/bookstore-authors.resolver';
import { BooksResolver } from './../../resolvers/bookstore-books.resolver';
import { BookstoreApiService } from './../../shared/services/bookstore-api.service';
import { BookstoreComponent } from './bookstore.component';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';

const primeng = [DropdownModule, TableModule, InputTextModule, ButtonModule];

@NgModule({
    imports: [
        ...primeng,
        FormsModule,
        CommonModule,
        RouterModule.forChild([
            {
                path: ``,
                component: BookstoreComponent,
                resolve: {
                    authors: AuthorsResolver,
                    books: BooksResolver,
                },
            },
        ]),
    ],
    declarations: [BookstoreComponent],
    providers: [BookstoreApiService],
})
export class BookstoreModule {}
