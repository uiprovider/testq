import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
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
import { ToysComponent } from './pages/toys/toys.component';
import { WorksheetComponent } from './pages/worksheet/worksheet.component';
import { StationaryComponent } from './pages/stationary/stationary.component';
import { OldBooksComponent } from './pages/old-books/old-books.component';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { SchoolComponent } from './pages/school/school.component';


const appRoutes: Routes = [
  // { path: 'crisis-center', component: CrisisListComponent },
  { path: '',   redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-books', component: NewBooksComponent },
  { path: 'old-books', component: OldBooksComponent },
  { path: 'stationary', component: StationaryComponent },
  { path: 'worksheet', component: WorksheetComponent },
  { path: 'toys', component: ToysComponent },
  { path: 'school', component: SchoolComponent },
  { path: 'about-us', component: AboutusComponent },
  { path: 'new-books/:sub/:filtername', component: NewarrivalsComponent },
  { path: 'old-books/:sub/:filtername', component: NewarrivalsComponent },
  { path: 'stationary/:sub/:filtername', component: NewarrivalsComponent },
  { path: 'worksheet/:sub/:filtername', component: NewarrivalsComponent },
  { path: 'toys/:sub/:filtername', component: NewarrivalsComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:blogcategory', component: BlogComponent },
  { path: 'blog/:blogcategory/:name', component: BlogDetailsComponent },
  { path: 'blogleft', component: BlogLeftSidebarComponent },
  { path: 'booknotfound', component: BookNotFoundComponent },
  { path: 'bulkbuyers', component: BulkBuyersComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'change-password', component: ChangepasswordComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'my-orders', component: MyOrdersComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'events', component: EventsComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'grid', component: GridComponent },
  { path: 'myaccount', component: MyAccountComponent },
  { path: 'portfoliodetails/:uniqueId', component: PortfolioDetailsComponent },
  { path: 'shoplist', component: ShopListComponent },
  { path: 'product-details/:uniqueId', component: SingleProductComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
