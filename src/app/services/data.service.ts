import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private submitData = new BehaviorSubject<any | undefined>(undefined);
  private doSubmitting = new BehaviorSubject<boolean>(false);
  currentData = this.submitData.asObservable();
  isSubmitting = this.doSubmitting.asObservable();
  private onDeleteData = new BehaviorSubject<string>('');
  deleteData = this.onDeleteData.asObservable();
  private onEditData = new BehaviorSubject<any | undefined>(undefined);
  editData = this.onEditData.asObservable();

  constructor() {}

  onSubmitData(data: any) {
    this.submitData.next(data);
  }

  onSubmitting(value: boolean) {
    this.doSubmitting.next(value);
   }

   onDelete(value: string) {
    this.onDeleteData.next(value)
   }

   onEdit(value: any) {
    this.onEditData.next(value)
   }
}
