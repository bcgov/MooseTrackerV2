export interface MooseSighting {
    region: string,
    subRegion: string,
    bullCount: number,
    cowCount: number,
    calfCount: number,
    unknownCount: number,
    tickHairLoss: number,
    date: Date | null,
    hoursOut: number,
    id: string,
    status: string,
    syncDate: Date | null
}