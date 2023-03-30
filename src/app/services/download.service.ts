import { Injectable } from '@angular/core';
import csvDownload from 'json-to-csv-export'
import { ExportCsv } from './models/exportCSV.model';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor() { }

  downloadCSV(data: ExportCsv) {
    csvDownload(data)
  }
}
