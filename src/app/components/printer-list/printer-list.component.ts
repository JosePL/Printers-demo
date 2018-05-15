import { Component, OnInit } from '@angular/core';
import { PrinterModel } from '../../models/printer.model';
import { StatusType } from '../../enums/status-type';

@Component({
  selector: 'printer-list',
  templateUrl: './printer-list.component.html',
  styleUrls: ['./printer-list.component.scss']
})
export class PrinterListComponent implements OnInit {
  public printers: PrinterModel[] = new Array<PrinterModel>();

  public ngOnInit(): void {
    this.printers = [ 
      { id: 1, name: 'Desktop Printer', status: StatusType.Ready, address: '192.168.0.191', description: 'Personal desktop printer' }, 
      { id: 2, name: 'Unknown Printer', status: StatusType.Unknown, address: '192.168.0.199', description: 'A printer noone knows anything about' }, 
      { id: 3, name: 'Color Printer', status: StatusType.Ready, address: '192.168.0.100', description: 'Powerful color printer in the main corridor'  }, 
      { id: 4, name: 'Malfunctioned Printer', status: StatusType.Error, address: '192.168.0.190', description: 'A printer that is broken for a long time...'  } ];
  }
}
