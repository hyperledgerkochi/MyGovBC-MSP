export function callAPIServer(method,url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('SPA_ENV_NAME', '{"SPA_ENV_VIDEO_ASSIST_URL":"","SPA_ENV_AGENT_ID":""}');
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();
    }); 
}

