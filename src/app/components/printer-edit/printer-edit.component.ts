import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { PrinterModel } from '../../models/printer.model';
import { StatusType } from '../../enums/status-type';
import { PrinterService } from '../../services/printer.service';

@Component({
  selector: 'printer-edit',
  templateUrl: './printer-edit.component.html',
  styleUrls: ['./printer-edit.component.scss']
})
export class PrinterEditComponent implements OnInit, OnDestroy {
  public printer: PrinterModel;
  public StatusType = StatusType;
  public isEditMode: boolean = false;
  public isLoading: boolean = true;
  public printerForm: FormGroup;

  private activatedRouteSubscription: Subscription;
  private printerServiceSubscription: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private printerService: PrinterService) {
    
  }

  ngOnInit(): void {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id && id > 0) {
        this.isEditMode = true;
        
        this.printerServiceSubscription = this.printerService.getPrinter(id).subscribe(res => {
          this.printer = res;
          this.initForm();
          this.isLoading = false;
        });
      } else {
        this.printer = this.createEmptyPrinter();
        this.initForm();
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription.unsubscribe();
    if (this.printerServiceSubscription) {
      this.printerServiceSubscription.unsubscribe();
    }
  }

  onSave(): void {
    console.log('Saving...');
    const newPrinter = this.getFormData();
    if (newPrinter.id == 0) {
      this.printerService.addPrinter(newPrinter);
    } else {
      this.printerService.updatePrinter(newPrinter);
    }
    this.router.navigateByUrl('/');
  }

  onDelete(): void {
    this.printerService.deletePrinter(this.printer.id);
    this.router.navigateByUrl('/');
  }

  private initForm(): void {
    this.printerForm = new FormGroup({
      'id': new FormControl(this.printer.id),
      'name': new FormControl(this.printer.name),
      'status': new FormControl(this.printer.status),
      'address': new FormControl(this.printer.address),
      'description': new FormControl(this.printer.description)
    });
  }

  private createEmptyPrinter(): PrinterModel {
    const model = new PrinterModel();
    model.id = 0;

    return model;
  }

  private getFormData(): PrinterModel {
    const printer = new PrinterModel();
    printer.id = this.printerForm.controls.id.value;
    printer.name = this.printerForm.controls.name.value;
    printer.status = this.printerForm.controls.status.value;
    printer.address = this.printerForm.controls.address.value;
    printer.description = this.printerForm.controls.description.value;

    return printer;
  }
}
