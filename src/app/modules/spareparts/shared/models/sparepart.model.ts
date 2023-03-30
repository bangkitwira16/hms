import { Location } from "src/app/services/models/location.model";

export interface SparePart {
  id: number;
  sparepartName: string;
  quantity: number;
  type: string;
  locationId: number;
  modelNumber: string;
  manufacturer: string;
  currentStatus: string;
  created_at: string;
  location?: Location;
  locationName?: string;
}
