import {Component, Inject, Injectable, AfterContentInit, ViewChild, ElementRef} from '@angular/core';
import { environment } from '../../../../environments/environment';
declare var System: any;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {timeout} from "rxjs/operators";
import { Observable, BehaviorSubject } from 'rxjs';
import {MspSpaEnvServices, SpaEnvResponse} from '../../msp/service/msp-spa-env.service';

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
    
    constructor(private http: HttpClient, private spaEnv: MspSpaEnvServices) {
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

        this.spaEnv.callSpaServer().subscribe(envs => {
            if(envs && envs.SPA_ENV_MCAP_VIDEO_ASSIST_URL) {
                console.log('Successful response from the SPA Env server, SPA ENV Assist URL: '+envs.SPA_ENV_MCAP_VIDEO_ASSIST_URL);  
                this.assistUrl = envs.SPA_ENV_MCAP_VIDEO_ASSIST_URL;
            }  else {
                this.assistUrl = environment.appConstants.assistSDKExternalUrl;
            }
        }) 
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
