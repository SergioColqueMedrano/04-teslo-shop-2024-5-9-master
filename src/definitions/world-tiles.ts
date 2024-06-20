export enum TileTypes {
    WATER,
    GROUND
};

export interface TileDef {
    x: number;
    y: number;
    height: number;
    type: TileTypes;
};

export const TILE_SIZE = 100;