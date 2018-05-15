import { StatusType } from "../enums/status-type";

export class PrinterModel {
    public id: number;
    public name: string;
    public status: StatusType;
    public address: string;
    public description: string;
}