// render-cache.ts
import { loader } from "zcanvas";

const ASSET_FOLDER = "./assets/sprites/";
const ASSETS = {
    TILES: "tiles.png"
};

interface Cache {
    TILES: HTMLImageElement;
}

const CACHE: Cache = {
    TILES: new Image()
};

export const initCache = async () => {
    const entries = Object.entries(ASSETS);
    for (const [key, path] of entries) {
        try {
            await loader.loadImage(`${ASSET_FOLDER}${path}`, CACHE[key as keyof Cache]);
        } catch (e) {
            throw new Error(`Failed to load image ${path}: ${e}`);
        }
    }
};

export default CACHE;
