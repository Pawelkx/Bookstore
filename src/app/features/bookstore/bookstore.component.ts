import { Author, Book } from './../../shared/services/interfaces';
import { Component, ViewChild } from '@angular/core';
import { Nationality, TableAuthor } from './interfaces/interfaces';
import { sortBy, uniqBy } from 'lodash';

import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { headers } from './variables';

@Component({
    selector: `app-bookstore`,
    templateUrl: `bookstore.component.html`,
    styleUrls: [`./bookstore.component.scss`],
})
export class BookstoreComponent {
    @ViewChild('authorsTable') authorsTable!: Table;
    @ViewChild('booksTable') booksTable!: Table;

    nationalities!: Nationality[];
    selectedNationality!: string;
    headers = headers;

    allAuthors: TableAuthor[] = [];
    allBooks: Book[] = [];

    currentAuthors: TableAuthor[] = [];
    currentBooks: Book[] = [];

    authorsSearch: string = ``;
    booksSearch: string = ``;

    activeAuthor?: TableAuthor;

    constructor(private readonly route: ActivatedRoute) {}

    async ngOnInit() {
        // get initial data from API
        this.allBooks = this.route.snapshot.data['books'];
        this.mapAuthors();
        this.getNationalities();
        // set initial current data for tables
        this.setInitialValues();
    }

    mapAuthors() {
        const authors = this.route.snapshot.data['authors'];
        this.allAuthors = authors.map((author: Author) => {
            return {
                ...author,
                name: `${author.first_name} ${author.last_name}`,
                bookCount: this.allBooks.filter((book: Book) => {
                    return book.author_id === author.id;
                }).length,
            };
        });
    }

    getNationalities() {
        this.nationalities = sortBy(
            uniqBy(this.allAuthors, `nationality`).map((author) => {
                return {
                    label: author.nationality,
                    value: author.nationality,
                };
            }),
            `value`
        );
        this.nationalities.unshift({
            label: `Any`,
            value: `Any`,
        });
    }

    onSelectedNationality() {
        this.activeAuthor = undefined;
        this.resolveFiltering();
    }

    resolveFiltering() {
        // needed for dynamic changing of input data (otherwise view would render on page prior to searching)
        this.setFirstRowForTables();
        if (!this.activeAuthor) {
            // Nationality
            this.resolveNationality();
            // Authors
            this.resolveAuthors();
            // Books
            this.resolveBooks();
            return;
        }
        // if there is an active author, we should only resolve books, because authors remain unchanged
        this.resolveBooks();
    }

    resolveBooks() {
        if (this.activeAuthor) {
            this.currentBooks = (
                this.filterBasedOnObjEntries(
                    this.booksSearch,
                    this.allBooks
                ) as any
            ).filter((book: Book) => book.author_id === this.activeAuthor?.id);

            return;
        }

        this.currentBooks = this.filterBasedOnObjEntries(
            this.booksSearch,
            this.currentBooks
        ) as any;

        this.currentAuthors = this.currentAuthors.filter(
            (author: TableAuthor) => {
                return this.currentBooks
                    .map((book: Book) => book.author_id)
                    .includes(author.id);
            }
        );
    }

    resolveAuthors() {
        this.currentAuthors = this.filterBasedOnObjEntries(
            this.authorsSearch,
            undefined,
            this.currentAuthors
        ) as any;

        this.currentBooks = this.allBooks.filter((book: Book) => {
            return this.currentAuthors
                .map((author: TableAuthor) => author.id)
                .includes(book.author_id);
        });
    }

    filterBasedOnObjEntries(
        search: string,
        books?: Book[],
        authors?: TableAuthor[]
    ) {
        if (books) {
            return books.filter((book: Book) => {
                for (const [key, value] of Object.entries(book)) {
                    if (
                        value
                            .toString()
                            .toLowerCase()
                            .includes(search.toLowerCase())
                    ) {
                        return true;
                    }
                }
                return false;
            });
        } else if (authors) {
            return authors.filter((author: TableAuthor) => {
                for (const [key, value] of Object.entries(author)) {
                    if (
                        value
                            .toString()
                            .toLowerCase()
                            .includes(search.toLowerCase())
                    ) {
                        return true;
                    }
                }
                return false;
            });
        }
        return [];
    }

    resolveNationality() {
        this.currentAuthors = this.allAuthors.filter((author: TableAuthor) => {
            if (this.selectedNationality === `Any`) {
                return true;
            }
            return author.nationality === this.selectedNationality;
        });
        this.currentBooks = this.allBooks.filter((book: Book) => {
            return this.currentAuthors
                .map((author: TableAuthor) => author.id)
                .includes(book.author_id);
        });
    }

    clickBookCount(author: TableAuthor) {
        this.activeAuthor = author;
        this.resetSearches();
        this.currentBooks = this.allBooks.filter(
            (book: Book) => book.author_id === author.id
        );
    }

    resetSearches() {
        this.booksSearch = ``;
        this.authorsSearch = ``;
    }

    setFirstRowForTables() {
        if (this.authorsTable.first !== 0) {
            this.authorsTable.first = 0;
        }
        if (this.booksTable.first !== 0) {
            this.booksTable.first = 0;
        }
    }

    setInitialValues() {
        this.resetSearches();
        this.activeAuthor = undefined;
        this.selectedNationality = `Any`;
        this.currentBooks = this.allBooks;
        this.currentAuthors = this.allAuthors;
    }
}
