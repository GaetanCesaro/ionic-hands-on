import { Injectable, Injector } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LoggerService } from '../providers/logger.provider'
import * as StackTrace from 'stacktrace-js';


@Injectable()
export class GlobalErrorHandler implements IonicErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error) {
    const loggerService = this.injector.get(LoggerService);
    const location = this.injector.get(LocationStrategy);
    const url = location instanceof PathLocationStrategy ? location.path() : '';
    const message = error.message ? error.message : error.toString();

    // get the stack trace, lets grab the last 10 stacks only
    StackTrace.fromError(error).then(stackframes => {
      const stackString = stackframes
        .splice(0, 20)
        .map(function (sf) {
          return sf.toString();
        }).join('\n');

        loggerService.log('info', { message, url, stack: stackString });
    });    

    // IMPORTANT: Rethrow the error otherwise it gets swallowed
    throw error;
  }

  handlePromiseError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }


}