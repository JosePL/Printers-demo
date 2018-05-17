import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { PrinterModel } from '../models/printer.model';
import { StatusType } from '../enums/status-type';

@Injectable()
export class PrinterService {
    private printers: BehaviorSubject<Array<PrinterModel>> = new BehaviorSubject<Array<PrinterModel>>(null);
    private lastMockId: number = 4;

    constructor(private http: Http) {
        
    }

    getPrinters(): Observable<Array<PrinterModel>> {
        return this.preloadData();
    }

    getPrinter(id: number): Observable<PrinterModel> {
        const collection = this.printers.getValue();
        if(!collection || collection.length === 0) {
            return this.getPrinterMockData(id);
        } else {
            return this.printers.pipe(map(res => (<Array<PrinterModel>> res).filter(printer => printer.id == id)[0]));
        }
    }

    addPrinter(printer: PrinterModel): void {
        this.preloadData().subscribe(res => {
            const collection = this.printers.getValue();
            printer.id = this.generateNextMockId();
            console.log(printer.id);
            collection.push(printer);
            this.printers = new BehaviorSubject<Array<PrinterModel>>(collection);
        })
    }

    updatePrinter(printer: PrinterModel): void {
        this.preloadData().subscribe(res => {
            const collection = this.printers.getValue();
            const index = collection.findIndex((item) => item.id === printer.id);
            const newCollection = collection.slice(0, index)
                .concat([printer])
                .concat(collection.slice(index + 1));
            this.printers = new BehaviorSubject<Array<PrinterModel>>(newCollection);
        });
    }

    deletePrinter(id: number): void {
        this.preloadData().subscribe(res => {
            const collection = this.printers.getValue();
            const index = collection.findIndex((item) => item.id === id);
            const newCollection = collection.slice(0, index).concat(collection.slice(index + 1));
            this.printers = new BehaviorSubject<Array<PrinterModel>>(newCollection);
        });
    }

    private preloadData(): Observable<Array<PrinterModel>> {
        const collection = this.printers.getValue();
        if(!collection || collection.length === 0) {
            return this.getAllPrintersMockData().pipe(tap(res => {
                this.printers = new BehaviorSubject<Array<PrinterModel>>(res);
            }));
        } else {
            return this.printers.asObservable();
        }
    }

    private generateNextMockId(): number {
        return ++this.lastMockId;
    }

    private getAllPrintersMockData(): Observable<Array<PrinterModel>> {
        return this.http.get('./assets/printers.json').pipe(map(res => {
            const response = res.json();
            return response.map(response => <Array<PrinterModel>> response);
        }));
    }

    private getPrinterMockData(id: number): Observable<PrinterModel> {
        return this.getAllPrintersMockData().pipe(map(res => (<Array<PrinterModel>> res).filter(printer => printer.id == id)[0]));
    }
}