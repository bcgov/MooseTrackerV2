export interface MooseSightingPayload {
  clientSightingId: string;
  dateFrom: Date;
  dateTo: Date;
  region: number;
  subRegion: number;
  tickHairLoss: number;
  mooseCount: number;
}
export interface PreparedMooseSighting extends MooseSightingPayload {
  syncDate: Date;
}
