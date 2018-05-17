import { Http, ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class DownloadService {

    constructor(private http: Http) {
        
    }

    downloadFile(filename: string) {
        return this.http
            .get(`./assets/${filename}`, {
                responseType: ResponseContentType.Blob
            })
            .pipe(map(res => {
                return {
                    filename: filename,
                    data: res.blob()
                };
            }))
            .subscribe(res => {
                console.log('start download:',res);
                var url = window.URL.createObjectURL(res.data);
                var a = document.createElement('a');
                document.body.appendChild(a);
                a.setAttribute('style', 'display: none');
                a.href = url;
                a.download = res.filename;
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();
            }, error => {
                console.log('Download error:', JSON.stringify(error));
            }, () => {
                console.log('Completed file download.')
            });
    }
}