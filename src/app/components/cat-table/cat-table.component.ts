import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CatsApiService } from 'src/app/services/cats-api/cats-api.service';
import { ICat } from 'src/app/services/cats-api/cats-response.interface';
import { CatFormComponent } from '../cat-form/cat-form.component';

@Component({
  selector: 'app-cat-table',
  templateUrl: './cat-table.component.html',
  styleUrls: ['./cat-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class CatTableComponent implements OnInit {
  public catList: ICat[] = [];
  public dataSource = new MatTableDataSource<ICat>();
  public displayedColumns: string[] = ['info.name', 'info.age', 'options'];
  public expandedCat: ICat | null;
  public fetching: boolean = false;
  @ViewChild(MatSort, { static: false }) set _content(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  @ViewChild(MatPaginator, { static: false }) set _paginator(
    paginator: MatPaginator
  ) {
    this.dataSource.paginator = paginator;
  }

  constructor(
    private _catsApiService: CatsApiService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTable();
  }

  public loadTable(): void {
    this.fetching = true;
    this._catsApiService.listCats().subscribe((response) => {
      this.catList = response.data;
      this.dataSource.data = this.catList;
      this.dataSource.sortingDataAccessor = (item, property) => {
        const propPath = property.split('.');
        const value: any = propPath.reduce(
          (curObj, property) => curObj[property],
          item
        );
        return !isNaN(value) ? Number(value) : value;
      };
      this.fetching = false;
    });
  }

  public openEdit(event: Event, cat: ICat) {
    event.stopPropagation();
    this._dialog
      .open(CatFormComponent, {
        width: '50%',
        data: cat,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.loadTable();
        }
      });
  }

  public deleteCat(event: Event, cat: ICat): void {
    event.stopPropagation();
    this._catsApiService.deleteCat(cat.id).subscribe(() => {
      this.loadTable();
    });
  }
}
