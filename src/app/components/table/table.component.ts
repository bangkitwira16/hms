import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TableHeader } from './TableHeader.model';

@Component({
  selector: 'cmp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [MatTableModule, CommonModule, MatSortModule],
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() columns: TableHeader[] = [];
  displayedColumns: string[] = [];
  @Input() dataSource: any = [];
  dataSrc!: MatTableDataSource<any>
  @Input() id: string = '';
  @ContentChild(TemplateRef)
  public templateRef!: TemplateRef<any>;
  @Output()
  public selectedData: EventEmitter<any> = new EventEmitter();
  
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSrc.sort = sort;
  }

  constructor() {
  }
  
  ngOnInit(): void {
    this.dataSrc = new MatTableDataSource(this.dataSource);
    this.displayedColumns = this.columns.map((col: TableHeader) => col.display);
  }
  
  ngAfterViewInit() {
    // this.dataSrc.sort = this.sort;
  }

  onRowClick(row: any) {
    this.selectedData.emit(row)
  }
}
