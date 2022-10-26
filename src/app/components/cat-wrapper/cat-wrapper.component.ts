import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CatFormComponent } from '../cat-form/cat-form.component';
import { CatTableComponent } from '../cat-table/cat-table.component';

@Component({
  selector: 'app-cat-wrapper',
  templateUrl: './cat-wrapper.component.html',
  styleUrls: ['./cat-wrapper.component.scss'],
})
export class CatWrapperComponent implements OnInit {
  @ViewChild(CatTableComponent) catTable: CatTableComponent;
  constructor(private _dialog: MatDialog) {}
  ngOnInit(): void {}

  public openCreate(): void {
    this._dialog
      .open(CatFormComponent, { width: '50%', disableClose: true })
      .afterClosed()
      .subscribe((result) => {
        if (result) this.catTable.loadTable();
      });
  }
}
