import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { trigger, state, style, transition, animate } from '@angular/animations';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {HttpClient, HttpClientModule, provideHttpClient} from "@angular/common/http";
import {CommonModule, DatePipe} from "@angular/common";
import {LoginComponent} from "./pages/login/login.component";


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
    imports: [
        BrowserAnimationsModule,
        RouterModule.forRoot(AppRoutes, {
            useHash: true
        }),
        SidebarModule,
        NavbarModule,
        ToastrModule.forRoot(),
        FooterModule,
        FixedPluginModule,
        CommonModule,
        DatePipe,
        LoginComponent

    ],
  providers: [
    provideHttpClient(),


  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
