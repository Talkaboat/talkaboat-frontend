import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ProfileSidebarComponent } from './header/profile-sidebar/profile-sidebar.component';
import { SearchSlotComponent } from './header/search-slot/search-slot.component';
import { LoadingAnimationComponent } from './loading/loading-animation/loading-animation.component';
import { LoadingComponent } from './loading/loading.component';
import { MediaPlayerComponent } from './media-player/media-player.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideFunctions } from '@angular/fire/functions';
import { provideMessaging } from '@angular/fire/messaging';
import { providePerformance } from '@angular/fire/performance';
import { provideRemoteConfig } from '@angular/fire/remote-config';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getFunctions } from 'firebase/functions';
import { getMessaging } from 'firebase/messaging';
import { getPerformance } from 'firebase/performance';
import { getRemoteConfig } from 'firebase/remote-config';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { HttpInterceptorService } from '../services/http-interceptor/http-interceptor.service';
import { RouterModule } from '@angular/router';
import { PipeModule } from '../pipes/pipe.module';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    MediaPlayerComponent,
    LoadingComponent,
    SearchSlotComponent,
    LoadingAnimationComponent,
    ProfileSidebarComponent,
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
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    PipeModule,
    ReactiveFormsModule,
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
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    MediaPlayerComponent,
    LoadingComponent,
    SearchSlotComponent,
    LoadingAnimationComponent,
    ProfileSidebarComponent,
  ]
})
export class SharedModule { }
