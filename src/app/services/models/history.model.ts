import { Asset } from 'src/app/modules/assets/shared/models/asset.model';
import { User } from 'src/app/modules/login/shared/models/user.model';

export interface History {
  id: number;
  assetId: number;
  configId: number;
  sparepartId: number;
  userId: number;
  details: string;
  created_at: string;
  asset?: Asset;
  user?: User;
  userName?: string;
  assetName?: string;
}
