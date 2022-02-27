import { CommonModule } from "@angular/common";
import { VgCoreModule } from '@videogular/ngx-videogular/core'
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";
import { PipeModule } from "../pipes/pipe.module";
import { HttpInterceptorService } from "../services/http-interceptor/http-interceptor.service";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { ProfileSidebarComponent } from "./header/profile-sidebar/profile-sidebar.component";
import { SearchSlotComponent } from "./header/search-slot/search-slot.component";
import { LoadingAnimationComponent } from "./loading/loading-animation/loading-animation.component";
import { LoadingComponent } from "./loading/loading.component";
import { MediaPlayerComponent } from "./media-player/media-player.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

@NgModule({
  declarations: [
    ProfileSidebarComponent,
    SearchSlotComponent,
    HeaderComponent,
    LoadingAnimationComponent,
    LoadingComponent,
    MediaPlayerComponent,
    SidebarComponent,
    FooterComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PipeModule,
    ReactiveFormsModule,
    VgCoreModule,
    VgControlsModule,
    VgBufferingModule,
    VgOverlayPlayModule,
  ],
  exports: [
    ProfileSidebarComponent,
    SearchSlotComponent,
    HeaderComponent,
    LoadingAnimationComponent,
    LoadingComponent,
    MediaPlayerComponent,
    SidebarComponent,
    FooterComponent
  ],
})
export class SharedModule { }
