import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './core/effects';
import { metaReducers, reducers } from './core/reducer-map';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    EffectsModule.forRoot([ AppEffects ]),
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
