import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import {ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular5-toaster';

import { OwlModule } from 'ngx-owl-carousel';
import { Ng5SliderModule } from 'ng5-slider';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { CategoryComponent } from './components/category/category.component';
import { AgeComponent } from './components/age/age.component';
import { TagsComponent } from './components/tags/tags.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { BookComponent } from './components/book/book.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogLeftSidebarComponent } from './pages/blog-left-sidebar/blog-left-sidebar.component';
import { BookNotFoundComponent } from './pages/book-not-found/book-not-found.component';
import { BulkBuyersComponent } from './pages/bulk-buyers/bulk-buyers.component';
import { CartComponent } from './pages/cart/cart.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { EventsComponent } from './pages/events/events.component';
import { FaqComponent } from './pages/faq/faq.component';
import { GridComponent } from './pages/grid/grid.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { PortfolioDetailsComponent } from './pages/portfolio-details/portfolio-details.component';
import { ShopListComponent } from './pages/shop-list/shop-list.component';
import { SingleProductComponent } from './pages/single-product/single-product.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { NewarrivalsComponent } from './pages/newarrivals/newarrivals.component';
import { NewBooksComponent } from './pages/new-books/new-books.component';
import { OldBooksComponent } from './pages/old-books/old-books.component';
import { StationaryComponent } from './pages/stationary/stationary.component';
import { WorksheetComponent } from './pages/worksheet/worksheet.component';
import { ToysComponent } from './pages/toys/toys.component';
import { DynamicCategoryComponent } from './components/dynamic-category/dynamic-category.component';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { InvoiceDetailComponent } from './pages/invoice-detail/invoice-detail.component';
import { NewsLetterComponent } from './components/news-letter/news-letter.component';
import { SchoolComponent } from './pages/school/school.component';
import { SingleBookComponent } from './components/single-book/single-book.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CategoryComponent,
    AgeComponent,
    TagsComponent,
    HomeComponent,
    BookComponent,
    FooterComponent,
    AboutusComponent,
    BlogComponent,
    BlogLeftSidebarComponent,
    BookNotFoundComponent,
    BulkBuyersComponent,
    CartComponent,
    ContactUsComponent,
    EventsComponent,
    FaqComponent,
    GridComponent,
    MyAccountComponent,
    PortfolioDetailsComponent,
    ShopListComponent,
    SingleProductComponent,
    WishlistComponent,
    PageNotFoundComponent,
    NewarrivalsComponent,
    NewBooksComponent,
    OldBooksComponent,
    StationaryComponent,
    WorksheetComponent,
    ToysComponent,
    DynamicCategoryComponent,
    BlogDetailsComponent,
    CheckoutComponent,
    TermsAndConditionsComponent,
    ProfileComponent,
    ChangepasswordComponent,
    MyOrdersComponent,
    ForgetPasswordComponent,
    InvoiceDetailComponent,
    NewsLetterComponent,
    SchoolComponent,
    SingleBookComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    OwlModule,
    Ng5SliderModule
  ],
  providers: [
    // {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptors, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
