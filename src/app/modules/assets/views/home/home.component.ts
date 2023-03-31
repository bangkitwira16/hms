import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from 'src/app/components/form-dialog/form-dialog.component';
import { Options } from 'src/app/components/select/select.component';
import { assetsApiPath, locationsApiPath } from 'src/app/constants/api-const';
import { assetForm } from 'src/app/constants/asset-form-const';
import { DataService } from 'src/app/services/data.service';
import { BaseService } from 'src/app/services/base.service';
import { DownloadService } from 'src/app/services/download.service';
import { Location } from 'src/app/services/models/location.model';
import { Asset } from '../../shared/models/asset.model';
import { DynamicForm } from 'src/app/components/dynamic-form/dynamicForm.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  assets: Asset[] = [];
  assetsForm: FormGroup;
  isSubmitting: boolean = false;
  locations: Options[] = [];
  isSaving: boolean = false;

  constructor(
    private baseService: BaseService,
    private fb: FormBuilder,
    private downloadService: DownloadService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private dataService: DataService
  ) {
    this.assetsForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.getAssets();
    this.getLocation();
    this.listenData();
    this.initForm()
  }

  listenData(): void {
    this.dataService.currentData.subscribe((data) => {
      if (data) this.saveAsset(data);
    });

    this.dataService.deleteData.subscribe((data) => {
      if (data) this.deleteAsset(data);
    });

    this.dataService.editData.subscribe(data => {
      if (data) this.updateAsset(data);
    })
  }

  initForm(): FormGroup {
    return (this.assetsForm = this.fb.group({
      key: new FormControl(null, [Validators.required]),
    }));
  }

  public getAssets(key: string = '') {
    const params = {
      q: key,
      sort: 'id'
    };
    this.baseService
      .getData(`${assetsApiPath}/?_expand=location`, params)
      .subscribe((res) => {
        this.assets = res.map((asset: Asset) => ({
          ...asset,
          locationName: asset.location?.locationName,
        }));
      });
  }

  getLocation() {
    this.baseService.getData(locationsApiPath).subscribe((res) => {
      this.locations = res.map((location: Location) => ({
        id: location.id,
        label: location.locationName,
      }));
      assetForm[4].options = this.locations;
      assetForm[6].options = this.locations;
    });
  }

  public downloadCsv() {
    const params = {
      data: this.assets,
    };
    this.downloadService.downloadCSV(params);
  }

  public openForm() {
    let data = assetForm;
    data[4].options = this.locations;
    data[6].options = this.locations;
    this.openDialog(data);
  }

  public openDialog(data: DynamicForm[], isEdit: boolean = false) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        data: data,
        isEdit,
      },
      width: '75%',
    });

    dialogRef.afterClosed().subscribe((result: Asset) => {
      if (result) this.saveAsset(result);
    });
  }

  private saveAsset(result: Asset) {
    const payload = {
      ...result,
      id: Number(result.id),
      manufacturer: this.locations.filter(
        (location) => location.id == result.manufacturer
      )[0].label,
      created_at: this.datePipe.transform(Date.now(), 'yyyy-MM-dd'),
    };
    this.dataService.onSubmitting(true);
    this.baseService.postData(assetsApiPath, payload).subscribe(
      (res) => {
        this.dialog.closeAll();
        this.getAssets();
        this.dataService.onSubmitting(false);
      },
      (err) => {
        this.dataService.onSubmitting(false);
      }
    );
  }

  public onClickRow(row: any) {
    const transformRow = {
      ...row,
      manufacturer: this.locations.filter(
        (location) => location.label === row.manufacturer
      )[0].id,
    };
    delete transformRow.location;
    delete transformRow.locationName;
    const assetFormVal = assetForm.map((asset, index) => ({
      ...asset,
      value: transformRow[asset.name],
    }));
    assetFormVal[0].disabled = true;
    this.openDialog(assetFormVal, true);
  }

  private deleteAsset(id: any) {
    this.baseService.deleteData(`${assetsApiPath}/${id}`).subscribe((res) => {
      this.getAssets();
      this.dialog.closeAll();
    });
  }

  private updateAsset(data: Asset) {
    const payload = {
      ...data,
      id: Number(data.id),
      manufacturer: this.locations.filter(
        (location) => location.id == data.manufacturer
      )[0].label,
    };
    this.baseService.putData(`${assetsApiPath}/${data.id}`, payload).subscribe((res) => {
      this.getAssets()
      this.dialog.closeAll()
    })
  }
}
