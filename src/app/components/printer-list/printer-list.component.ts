import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PrinterModel } from '../../models/printer.model';
import { StatusType } from '../../enums/status-type';
import { PrinterService } from '../../services/printer.service';

@Component({
  selector: 'printer-list',
  templateUrl: './printer-list.component.html',
  styleUrls: ['./printer-list.component.scss']
})
export class PrinterListComponent implements OnInit, OnDestroy {
  public printers: PrinterModel[] = new Array<PrinterModel>();
  private printerServiceSubscription: Subscription;

  constructor(private printerService: PrinterService) {

  }

  public ngOnInit(): void {
    this.printerServiceSubscription = this.printerService.getPrinters().subscribe(res => {
      this.printers = res;
    });
  }

  ngOnDestroy(): void {
    this.printerServiceSubscription.unsubscribe();
  }
}
