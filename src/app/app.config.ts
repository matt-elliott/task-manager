import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ReactiveFormsModule } from '@angular/forms';

import { routes } from './app.routes';
import { taskReducer } from './state/task.reducers';

export const appConfig: ApplicationConfig = {

  providers: [
    ReactiveFormsModule,
    provideRouter(routes),
    provideStore({ tasks: taskReducer }),
    provideStoreDevtools({
      maxAge: 25
    }),
  ]
};
