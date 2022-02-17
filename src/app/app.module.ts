import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService } from '@angular/fire/analytics';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { TranslatePipe } from './services/i18n/translate.pipe';
import { HeaderComponent } from './static-components/header/header.component';
import { SidebarComponent } from './static-components/sidebar/sidebar.component';
import { FooterComponent } from './static-components/footer/footer.component';
import { MediaPlayerComponent } from './static-components/media-player/media-player.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpInterceptorService } from './services/http-interceptor/http-interceptor.service';
import { HomeComponent } from './routing-components/home/home.component';
import { LoginComponent } from './routing-components/login/login.component';
import { ProfileSidebarComponent } from './static-components/header/profile-sidebar/profile-sidebar.component';
import { RegisterComponent } from './routing-components/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from './static-components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    TranslatePipe,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    MediaPlayerComponent,
    HomeComponent,
    LoginComponent,
    ProfileSidebarComponent,
    RegisterComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      positionClass: 'toast-top-right',
      timeOut: 2500,
      progressBar: true,
      progressAnimation: 'increasing'
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig())
  ],
  providers: [
    ScreenTrackingService,
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS
    }, JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
