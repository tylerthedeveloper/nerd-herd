import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { DialogComponent } from './dialog.component';
import { ProjectCategory } from '../../../_models/project';

@Component({
  templateUrl: './proj.cat.dialog.component.html',
  styleUrls: ['./proj.cat.dialog.component.css']
})
export class ProjCatDialogComponent { //extends DialogComponent

    public title: string;
    public content: string;
    public projectTypes : {value: string, viewValue: string }[] = [];

    constructor(public dialogRef: MdDialogRef<ProjCatDialogComponent>) {
        //super(dialogRef);
        this.projectTypes = Object.keys(ProjectCategory).map(cat => {
            return { value: ProjectCategory[cat], viewValue: cat };
        });
        //dialogRef.componentInstance.projectTypes = this.projectTypes;
    }
    ngOnInit() {}
}