import { bootstrapApplication } from '@angular/platform-browser';
import { APP_INITIALIZER } from '@angular/core';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Initialize app: wait for styles to load before showing content
const initializeApp = () => {
  return new Promise<void>((resolve) => {
    const showApp = () => {
      // Double requestAnimationFrame ensures styles are applied
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const appRoot = document.querySelector('app-root');
          if (appRoot) appRoot.classList.add('fouc-done');
          resolve();
        });
      });
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showApp);
    } else {
      showApp();
    }
  });
};

const config: typeof appConfig = {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    {
      provide: APP_INITIALIZER,
      useValue: initializeApp,
      multi: true
    }
  ]
};

bootstrapApplication(AppComponent, config)
  .catch((err) => console.error(err));
