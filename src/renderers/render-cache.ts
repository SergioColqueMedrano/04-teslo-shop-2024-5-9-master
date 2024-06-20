import { loader } from "zcanvas";

const ASSET_FOLDER: string = "./assets/sprites/";
const ASSETS = {
    CURSORS : "cursors.png",
    TILES   : "tiles.png"
};

type Cache = {
    sprites: {
        [key: string]: HTMLImageElement;
    },
    map: {
        flat: HTMLCanvasElement;
        isometric: HTMLImageElement; // more performant than canvas when using .drawImage() on Safari
    }
};

const CACHE: Cache = {
    sprites: {
        CURSORS : new Image(),
        TILES   : new Image(),
    },
    map: {
        flat: document.createElement( "canvas" ),
        isometric: new Image(),
    }
};
export default CACHE;

export const initCache = (): Promise<void> => {
    return new Promise( async ( resolve, reject ) => {
        const entries = Object.entries( ASSETS );
        for ( let i = 0; i < entries.length; ++i ) {
            const [ key, path ] = entries[ i ];
            try {
                await loader.loadImage( `${ASSET_FOLDER}${path}`, CACHE.sprites[ key ]);
            } catch ( e ) {
                reject( e );
            }
        }
        resolve();
    });
}
