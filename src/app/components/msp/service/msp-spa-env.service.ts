import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from '../../../../environments/environment';
import { _ApplicationTypeNameSpace } from "../api-model/applicationTypes";
import { MspLogService } from './log.service';
import * as moment from 'moment';
import { AbstractHttpService } from './abstract-api.service';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { of } from 'rxjs';

export interface SpaEnvResponse {
    SPA_ENV_VIDEO_ASSIST_URL: '',
    SPA_ENV_AGENT_ID: '',
};

/**
 * Responsible for retrieving values from the spa-env-server on OpenShift.
 *
 * Subscribe to SpaEnvService.values() to get the env values.
 */
@Injectable({
  providedIn: 'root'
})

export class MspSpaEnvServices extends AbstractHttpService {
    
    constructor(protected http: HttpClient, private logService: MspLogService) {
        super(http);  
    }

    fetchAssistURL(): Observable<SpaEnvResponse> {
        const url = environment.appConstants.envServerBaseUrl;
        return this.post<SpaEnvResponse>(url, null);
    }
    
    protected handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            //Client-side / network error occured
            console.error('MspSpaEnvServices error: ', error.error.message);
        }
        else {
            // The backend returned an unsuccessful response code
            console.error(`MspSpaEnvServices Backend returned error code: ${error.status}.  Error body: ${error.error}`);
        }
        //this.logService.log({event: 'error', key: 'Cannot get maintenance flag from spa-env-server'});
        
        // A user facing erorr message /could/ go here; we shouldn't log dev info through the throwError observable
        return of([]);
        //return throwError('Something went wrong with the network request.');
    }
    
    protected _headers: HttpHeaders = new HttpHeaders({
        'SPA_ENV_NAME': '{"SPA_ENV_VIDEO_ASSIST_URL":"","SPA_ENV_AGENT_ID":""}',
        'program': 'msp',
        'timestamp' : moment().toISOString(),
        'method': 'fetchAssistURL',
        'severity': 'info',
    });
}