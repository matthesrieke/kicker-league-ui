import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment, settingsPromise } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

Promise.all([settingsPromise]).then(config => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
});