import { Component, OnInit } from '@angular/core';
import { TableHeader } from 'src/app/components/table/TableHeader.model';
import {
  assetsApiPath,
  historyApiPath,
  sparePartsApiPath,
} from 'src/app/constants/api-const';
import { Asset } from 'src/app/modules/assets/shared/models/asset.model';
import { BaseService } from 'src/app/services/base.service';
import { History } from 'src/app/services/models/history.model';
import { SparePart } from '../../../spareparts/shared/models/sparepart.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  emptySpareparts: SparePart[] = [];
  inactiveAssets: Asset[] = [];
  emptySparepartsCol: TableHeader[] = [
    {
      label: 'Spare parts name',
      display: 'sparepartName',
    },
    {
      label: 'Location',
      display: 'locationName',
    },
    {
      label: 'Status',
      display: 'quantity',
      template: true,
    },
  ];
  inactiveAssetsCol: TableHeader[] = [
    {
      label: 'Asset name',
      display: 'assetName',
    },
    {
      label: 'Location',
      display: 'locationName',
    },
    {
      label: 'Status',
      display: 'currentStatus',
      template: true,
    },
  ];
  history: History[] = [];
  isSubmitting: boolean = false;
  constructor(private baseService: BaseService) {}

  ngOnInit(): void {
    this.getSpareparts();
    this.getAssets();
    this.getHistory()
  }

  private getSpareparts() {
    const params = {
      currentStatus: ['low', 'empty'],
    };
    this.baseService.getData(`${sparePartsApiPath}/?_expand=location`, params).subscribe((res) => {
      this.emptySpareparts = res.map((spareParts: SparePart) => ({
        sparepartName: spareParts.sparepartName,
        locationName: spareParts.location?.locationName,
        currentStatus: spareParts.currentStatus,
        quantity: spareParts.quantity,
      }));
    });
  }

  private getAssets() {
    const params = {
      currentStatus: ['stopped', 'maintenance'],
    };
    this.baseService.getData(`${assetsApiPath}/?_expand=location`, params).subscribe((res) => {
      this.inactiveAssets = res.map((asset: Asset) => ({
        assetName: asset.assetName,
        locationName: asset.location?.locationName,
        currentStatus: asset.currentStatus,
      }));
    });
  }
  public getHistory(key: string = '') {
    this.isSubmitting = true
    const params = {
      q: key,
    };
    this.baseService.getData(`${historyApiPath}?_expand=asset&_expand=user`, params).subscribe((res) => {
      this.isSubmitting = false
      this.history = res.map((history: History) => ({
        ...history,
        assetName: history.asset?.assetName,
        userName: history.user?.username,
      }));
    });
  }
}
