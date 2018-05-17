import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

import { PrinterListComponent } from './printer-list.component';
import { PrinterListItemComponent } from './printer-list-item/printer-list-item.component';
import { PrinterService } from '../../services/printer.service';
import { PrinterModel } from '../../models/printer.model';
import { StatusType } from '../../enums/status-type';
import { DownloadService } from '../../services/download.service';

describe('PrinterListComponent', () => {
  const testData = [{ "id": 1, "name": "Desktop Printer", "status": StatusType.Ready, "address": "192.168.0.191", "description": "Personal desktop printer" }, 
    { "id": 2, "name": "Unknown Printer", "status": StatusType.Unknown, "address": "192.168.0.199", "description": "A printer noone knows anything about" }, 
    { "id": 3, "name": "Color Printer", "status": StatusType.Ready, "address": "192.168.0.100", "description": "Powerful color printer in the main corridor"  }, 
    { "id": 4, "name": "Malfunctioned Printer", "status": StatusType.Error, "address": "192.168.0.190", "description": "A printer that is broken for a long time..."  }]
    
  beforeEach(async(() => {
    const printerServiceStub = {
      getPrinters(): Observable<Array<PrinterModel>> {
        return of(testData);
      },
      getPrinter: jasmine.createSpy('getPrinter'),
      addPrinter: jasmine.createSpy('addPrinter'),
      updatePrinter: jasmine.createSpy('updatePrinter'),
      deletePrinter: jasmine.createSpy('deletePrinter')
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        PrinterListComponent,
        PrinterListItemComponent
      ],
      providers: [
        {
          provide: PrinterService,
          useValue: printerServiceStub
        },
        {
          provide: DownloadService,
          useValue: {
            downloadFile: jasmine.createSpy('downloadFile')
          }
        }
      ]
    }).compileComponents();
  }));

  it('should create', async(() => {
    const fixture = TestBed.createComponent(PrinterListComponent);
    const instance = fixture.debugElement.componentInstance;
    expect(instance).toBeTruthy();
  }));
  
  it('should render title in a h2 tag', async(() => {
    const fixture = TestBed.createComponent(PrinterListComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Printer list');
  }));

  it('should download printers', async(() => {
    const service = TestBed.get(PrinterService);

    const fixture = TestBed.createComponent(PrinterListComponent);
    const instance = fixture.debugElement.componentInstance;
    fixture.detectChanges();

    expect(instance.printers).toBe(testData);
  }));
});
