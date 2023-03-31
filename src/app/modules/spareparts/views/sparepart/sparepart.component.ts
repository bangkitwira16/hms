import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DynamicForm } from 'src/app/components/dynamic-form/dynamicForm.model';
import { FormDialogComponent } from 'src/app/components/form-dialog/form-dialog.component';
import { Options } from 'src/app/components/select/select.component';
import {
  locationsApiPath,
  sparePartsApiPath,
} from 'src/app/constants/api-const';
import { sparepartForm } from 'src/app/constants/sparepart-form-const';
import { BaseService } from 'src/app/services/base.service';
import { DataService } from 'src/app/services/data.service';
import { DownloadService } from 'src/app/services/download.service';
import { Location } from 'src/app/services/models/location.model';
import { SparePart } from '../../shared/models/sparepart.model';

@Component({
  selector: 'app-sparepart',
  templateUrl: './sparepart.component.html',
  styleUrls: ['./sparepart.component.scss'],
})
export class SparepartComponent implements OnInit {
  spareparts: SparePart[] = [];
  sparepartsForm: FormGroup;
  isSubmitting: boolean = false;
  locations: Options[] = [];
  constructor(
    private fb: FormBuilder,
    private baseService: BaseService,
    private downloadService: DownloadService,
    private dialog: MatDialog,
    private dataService: DataService,
    private datePipe: DatePipe
  ) {
    this.sparepartsForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.initForm();
    this.getSparepart();
    this.getLocation();
    this.listenData();
  }

  listenData(): void {
    this.dataService.currentData.subscribe((data) => {
      if (data) this.saveSparepart(data);
    });

    this.dataService.deleteData.subscribe((data) => {
      if (data) this.deleteSparepart(data);
    });

    this.dataService.editData.subscribe((data) => {
      if (data) this.updateSparepart(data);
    });
  }

  initForm(): FormGroup {
    return (this.sparepartsForm = this.fb.group({
      key: new FormControl(null, [Validators.required]),
    }));
  }

  getLocation() {
    this.baseService.getData(locationsApiPath).subscribe((res) => {
      this.locations = res.map((location: Location) => ({
        id: location.id,
        label: location.locationName,
      }));
      sparepartForm[3].options = this.locations;
      sparepartForm[5].options = this.locations;
    });
  }

  public getSparepart(key: string = '') {
    const params = {
      q: key,
      sort: 'id',
    };
    this.baseService
      .getData(`${sparePartsApiPath}/?_expand=location`, params)
      .subscribe((res) => {
        this.spareparts = res.map((sparepart: SparePart) => ({
          ...sparepart,
          locationName: sparepart.location?.locationName,
        }));
      });
  }

  public downloadCsv() {
    const params = {
      data: this.spareparts,
    };
    this.downloadService.downloadCSV(params);
  }

  public openForm() {
    let data = sparepartForm;
    data[3].options = this.locations;
    data[5].options = this.locations;
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

    dialogRef.afterClosed().subscribe((result: SparePart) => {});
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
    const sparepartFormVal = sparepartForm.map((sparepart, index) => ({
      ...sparepart,
      value: transformRow[sparepart.name],
    }));
    sparepartFormVal[0].disabled = true;
    this.openDialog(sparepartFormVal, true);
  }

  saveSparepart(result: SparePart) {
    const payload = {
      ...result,
      id: Number(result.id),
      manufacturer: this.locations.filter(
        (location) => location.id == result.manufacturer
      )[0].label,
      created_at: this.datePipe.transform(Date.now(), 'yyyy-MM-dd'),
    };
    this.dataService.onSubmitting(true);
    this.baseService.postData(sparePartsApiPath, payload).subscribe(
      (res) => {
        this.dialog.closeAll();
        this.getSparepart();
        this.dataService.onSubmitting(false);
      },
      (err) => {
        this.dataService.onSubmitting(false);
      }
    );
  }

  private deleteSparepart(id: any) {
    this.baseService.deleteData(`${sparePartsApiPath}/${id}`).subscribe((res) => {
      this.getSparepart();
      this.dialog.closeAll();
    });
  }

  private updateSparepart(data: SparePart) {
    const payload = {
      ...data,
      id: Number(data.id),
      manufacturer: this.locations.filter(
        (location) => location.id == data.manufacturer
      )[0].label,
    };
    this.baseService.putData(`${sparePartsApiPath}/${data.id}`, payload).subscribe((res) => {
      this.getSparepart()
      this.dialog.closeAll()
    })
  }
}
