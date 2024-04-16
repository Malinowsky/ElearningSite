import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';
import { HeaderComponent } from './header/header.component';
import { CoursesModule } from './courses/courses.module';
import { CoursesRoutingModule } from './courses/courses-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    
  ],
  imports: [
    BrowserModule,

    AppRoutingModule,

    NgbModule, 
    SharedModule,
    HttpClientModule,
    CoreModule,

    AuthModule,
    CoursesModule,

  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
