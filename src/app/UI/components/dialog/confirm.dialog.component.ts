import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { DialogComponent } from './dialog.component';

@Component({
  templateUrl: './confirm.dialog.component.html',
  styleUrls: ['./confirm.dialog.component.css']
})
export class ConfirmDialogComponent { //extends DialogComponent

    public title: string;
    public content: string;

    constructor(public dialogRef: MdDialogRef<ConfirmDialogComponent>) {
        //super(dialogRef);
    }
    ngOnInit() {}
}