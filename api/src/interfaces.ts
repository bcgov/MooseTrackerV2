export interface MooseSighting {
  clientSightingId: string;
  syncDate: Date;
  dateFrom: Date;
  dateTo: Date;
  region: number;
  subRegion: number;
  tickHairLoss: number;
  mooseCount: number;
}
