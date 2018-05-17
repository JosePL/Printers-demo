import { Component, Input } from '@angular/core';

import { PrinterModel } from '../../../models/printer.model';
import { StatusType } from '../../../enums/status-type';
import { DownloadService } from '../../../services/download.service';

@Component({
  selector: 'printer-list-item',
  templateUrl: './printer-list-item.component.html',
  styleUrls: ['./printer-list-item.component.scss']
})
export class PrinterListItemComponent {
  @Input() public printer: PrinterModel;
  public StatusType = StatusType;

  constructor (private downloadService: DownloadService) {
    
  }
  
  public downloadDetails(): void {
    console.log('Downloading report file...');
    this.downloadService.downloadFile('printer-report.txt');
  }
}
