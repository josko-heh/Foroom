import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { CategoryComponent } from './category/category.component';
import { InitialPipe } from './main-page/initial.pipe';
import { AuthenticationGuard } from './auth.guard';
import { ThreadComponent } from './category/thread/thread.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ProfileComponent,
    CategoryComponent,
    ThreadComponent,
    InitialPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],
  providers: [DatePipe, AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
