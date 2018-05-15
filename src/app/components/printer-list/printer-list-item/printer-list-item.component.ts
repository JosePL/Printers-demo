import { Component, Input } from '@angular/core';
import { PrinterModel } from '../../../models/printer.model';
import { StatusType } from '../../../enums/status-type';

@Component({
  selector: 'printer-list-item',
  templateUrl: './printer-list-item.component.html',
  styleUrls: ['./printer-list-item.component.scss']
})
export class PrinterListItemComponent {
  @Input() public printer: PrinterModel;
  public StatusType = StatusType;

  public downloadDetails(): void {
    console.log('Downloading report file...');
  }
}
