import './polyfills';

// Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
import '@angular/localize/init';

import { enableProdMode } from '@angular/core';
import { loadTranslations } from '@angular/localize';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { getTranslations, ParsedTranslationBundle } from '@locl/core';
import { AppModule } from './app/app.module';

getTranslations('/assets/i18n/fr.json').then(
  (data: ParsedTranslationBundle) => {
    loadTranslations(data.translations);
    platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
      // Ensure Angular destroys itself on hot reloads.
      if (window['ngRef']) {
        window['ngRef'].destroy();
      }
      window['ngRef'] = ref;

      // Otherwise, log the boot error
    }).catch(err => console.error(err));
  }
);
