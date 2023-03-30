import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableHeader } from 'src/app/components/table/TableHeader.model';
import { SparePart } from '../../shared/models/sparepart.model';

@Component({
  selector: 'cmp-sparepart-table',
  templateUrl: './sparepart-table.component.html',
  styleUrls: ['./sparepart-table.component.scss']
})
export class SparepartTableComponent implements OnInit {

  @Input() spareparts: SparePart[] = [];
  assetCol: TableHeader[] = [
    {
      label: 'Id',
      display: 'id'
    },
    {
      label: 'Name',
      display: 'sparepartName'
    },
    {
      label: 'Type',
      display: 'type'
    },
    {
      label: 'Location',
      display: 'locationName'
    },
    {
      label: 'Model Number',
      display: 'modelNumber'
    },
    {
      label: 'Manufacturer',
      display: 'manufacturer'
    },
    {
      label: 'Quantity',
      display: 'quantity'
    },
    {
      label: 'Current Status',
      display: 'currentStatus',
      template: true
    },
  ]
  @Output()
  public selectedData: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  rowClick(row: any) {
    this.selectedData.emit(row)
  }
}
