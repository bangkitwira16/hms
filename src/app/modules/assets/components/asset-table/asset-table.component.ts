import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableHeader } from 'src/app/components/table/TableHeader.model';
import { Asset } from '../../shared/models/asset.model';

@Component({
  selector: 'cmp-asset-table',
  templateUrl: './asset-table.component.html',
  styleUrls: ['./asset-table.component.scss']
})
export class AssetTableComponent implements OnInit {

  @Input() assets: Asset[] = [];
  assetCol: TableHeader[] = [
    {
      label: 'Id',
      display: 'id'
    },
    {
      label: 'Name',
      display: 'assetName'
    },
    {
      label: 'Serial Number',
      display: 'serialNumber'
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
      label: 'Current Status',
      display: 'currentStatus',
      template: true
    },
  ]
  @Output()
  public selectedData: EventEmitter<any> = new EventEmitter();
  constructor() { 
  }
  
  ngOnInit(): void {
  }

  rowClick(row: any) {
    this.selectedData.emit(row)
  }
}
