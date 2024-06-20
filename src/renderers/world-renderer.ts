import { sprite } from "zcanvas";
import { TileDef, TileTypes, TILE_SIZE } from "../definitions/world-tiles";
import CACHE from "./render-cache";

const { TILES } = CACHE;

export default class WorldRenderer extends sprite {
    terrain: TileDef[] = [];
    pos: { x: number; y: number } = { x: 0, y: 0 };

    setTerrain(terrain: TileDef[]) {
        this.terrain = terrain;
    }

    handleInteraction(x: number, y: number, event: MouseEvent): boolean {
        this.pos.x = x;
        this.pos.y = y;
        return true; // Devuelve true para cumplir con la firma esperada
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        const MARGIN = 5;
        for (const tile of this.terrain) {
            const { x, y, height, type } = tile;
            let spriteX = 0;
            switch (type) {
                case TileTypes.WATER:
                    spriteX = 384;
                    break;
                case TileTypes.GROUND:
                    spriteX = 128;
                    break;
            }
            const hover = this.pos.x > (x * TILE_SIZE) && this.pos.x < ((x + 1) * TILE_SIZE) &&
                this.pos.y > (y * TILE_SIZE) && this.pos.y < ((y + 1) * TILE_SIZE);
            ctx.globalAlpha = hover ? 0.5 : 1;
            ctx.drawImage(
                TILES,
                spriteX, 0,
                128, 127,
                x * TILE_SIZE + x * MARGIN,
                y * TILE_SIZE + y * MARGIN,
                TILE_SIZE,
                TILE_SIZE
            );
        }
    }
}
