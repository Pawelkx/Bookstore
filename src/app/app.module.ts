import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([
            {
                path: `bookstore`,
                loadChildren: async () => {
                    return import(`./features/bookstore/bookstore.module`).then(
                        (m) => {
                            return m.BookstoreModule;
                        }
                    );
                },
            },
            {
                path: `**`,
                redirectTo: `bookstore`,
            },
        ]),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
