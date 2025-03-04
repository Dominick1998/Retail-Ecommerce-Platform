import * as Sentry from "@sentry/angular";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {
  constructor() {
    Sentry.init({
      dsn: "https://your-sentry-dsn-url",
      tracesSampleRate: 1.0
    });
  }

  logError(error: any) {
    Sentry.captureException(error);
  }
}
