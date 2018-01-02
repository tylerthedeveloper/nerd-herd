import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

//selector: 'dialog',
@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

    public title: string;
    public content: string;
    // public list: Array<any[]>;

    constructor(public dialogRef: MdDialogRef<DialogComponent>) {} //public dialogRef: MdDialogRef<DialogComponent>
    ngOnInit() {}
}

