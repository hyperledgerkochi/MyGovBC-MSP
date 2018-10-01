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



    }
    clickedAssist = () => {

        Promise.all([
            // System.import('./assist-support.js'),
            System.import('./assist-support.js'),
            System.import('./short-code-assist.js')
        ]).then(modules => {
            (<any>window).AssistBoot.addAssistBehaviour();
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
