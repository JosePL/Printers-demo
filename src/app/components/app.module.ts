import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PrinterListComponent } from './printer-list/printer-list.component';
import { PrinterListItemComponent } from './printer-list/printer-list-item/printer-list-item.component';
import { PrinterEditComponent } from './printer-edit/printer-edit.component';

const routes: Routes = [
  { path: '', component: PrinterListComponent },
  { path: 'edit', component: PrinterEditComponent },
  { path: 'edit/:id', component: PrinterEditComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PrinterListComponent,
    PrinterListItemComponent,
    PrinterEditComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
