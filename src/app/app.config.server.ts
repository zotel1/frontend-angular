import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


const serverConfig: ApplicationConfig = {
  providers: [
    
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
