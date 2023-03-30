import { SparePart } from 'src/app/modules/spareparts/shared/models/sparepart.model';
import { Location } from 'src/app/services/models/location.model';

export interface Asset extends Partial<SparePart> {
  assetName: string;
  serialNumber: string;
}
