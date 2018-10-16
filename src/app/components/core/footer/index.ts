import {Component, Inject, Injectable, AfterContentInit, ViewChild, ElementRef} from '@angular/core';
import { environment } from '../../../../environments/environment';
declare var System: any;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {timeout} from "rxjs/operators";

@Component({
  selector: 'core-footer',
  templateUrl: './index.html',
  styleUrls: ['./index.scss']
})
export class CoreFooterComponent {
    private QUERY_TIMEOUT = 500; //ms

    /** Defaults to using external assistSdk. Only use internal if we're sure we can get it. */
    private useInternalAssistSdk: boolean = false;
    private assistUrl ;

    constructor(private http: HttpClient) {
        // Determine if we can access the internal assistSDK link.
        // Should only be accessible on the intranet.
        const url = environment.appConstants.assistSDKInternalUrl + environment.appConstants.assistPath;
        http.get(url)
            .subscribe(data => {
                    // console.log('using internal assistSDK link');
                    this.useInternalAssistSdk = false;
                },
                err => {
                    // console.log('using external assistSDK link');
                });



        // Setup headers
        let headers = new HttpHeaders({
            /*'Authorization': 'spaenv 5993117a-2384-4b70-ad42-1e9b9e6044d9',
            'Access-Control-Allow-Origin': '*',*/
            'SPA_ENV_NAME': 'SPA_ENV_VIDEO_ASSIST_URL'
        });
        console.log("environment.appConstants.envServerBaseUrl"+environment.appConstants.envServerBaseUrl);
        this.http.post(environment.appConstants.envServerBaseUrl ,null, {headers: headers, responseType: "text" as "text"})
            .toPromise()
            .then((response: string) => {
                console.log("succeful env value from env server.."+response);
                this.assistUrl = response ;
            })
            .catch((error) => {
                console.log("error:"+error);
                console.log("cant fetch url from env server..defaulting to properties file"+environment.appConstants.assistSDKExternalUrl);
                this.assistUrl = environment.appConstants.assistSDKExternalUrl ;
            });

    }
    clickedAssist = () => {

        Promise.all([
            // System.import('./assist-support.js'),
            System.import('./assist-support.js'),
            System.import('./short-code-assist.js')
        ]).then(modules => {
            (<any>window).AssistBoot.addAssistBehaviour(this.assistUrl);
            (<any>window).AssistBoot.startAssistDialog();
        }).then(_ => {
            environment.appConstants.assistSDKUrl = this.useInternalAssistSdk ?
                environment.appConstants.assistSDKInternalUrl
                : environment.appConstants.assistSDKExternalUrl;

            const url = environment.appConstants.assistSDKUrl + environment.appConstants.assistPath;

            this.addScript(url);
        });

    }


    private addScript(url: string): void {
        console.log("adding script: ", url);
        var tt = document.createElement('script');
        tt.setAttribute('src', url);
        document.head.appendChild(tt);
    }

}
