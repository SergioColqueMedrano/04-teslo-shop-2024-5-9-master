import { useState } from "react";
import Image from 'next/image';
import { Product } from '@/interfaces';

interface Props {
  products: Product[];
}

export const MapEditor = ({ products }: Props) => {
  const [selectedTile, setSelectedTile] = useState([0, 0]); // Selección inicial de la baldosa

  // Capas del mapa (bottom, middle, top)
  const layers = [[], [], []];

  // Función para manejar el clic en el lienzo del mapa
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const clickedTileX = Math.floor(offsetX / 32);
    const clickedTileY = Math.floor(offsetY / 32);
    const key = `${clickedTileX}-${clickedTileY}`;

    if (event.shiftKey) {
      // Eliminar la baldosa si se presiona Shift
      layers.forEach(layer => delete layer[key]);
    } else {
      // Agregar la baldosa seleccionada al layer actual
      layers[selectedLayer][key] = selectedTile;
    }
    draw(); // Volver a dibujar el mapa
  };

  // Dibujar las baldosas en el lienzo del mapa
  const draw = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    layers.forEach(layer => {
      Object.keys(layer).forEach(key => {
        const [tileX, tileY] = layer[key];
        ctx.drawImage(
          tilesetImage,
          tileX * 32,
          tileY * 32,
          32,
          32,
          parseInt(key.split("-")[0]) * 32,
          parseInt(key.split("-")[1]) * 32,
          32,
          32
        );
      });
    });
  };

  // Seleccionar una baldosa del tileset
  const selectTile = (event: React.MouseEvent<HTMLImageElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;
    setSelectedTile([Math.floor(offsetX / 32), Math.floor(offsetY / 32)]);
  };

  // Variables de estado para el editor de mapas
  const [selectedLayer, setSelectedLayer] = useState(0);
  const tilesetImage = new Image();
  tilesetImage.src = "/path/to/tileset.png";
  tilesetImage.onload = () => draw(); // Dibujar el mapa inicial cuando se cargue el tileset

  // Cambiar la capa de edición
  const setLayer = (layerIndex: number) => {
    setSelectedLayer(layerIndex);
  };

  // Limpiar el lienzo del mapa
  const clearCanvas = () => {
    layers.forEach(layer => Object.keys(layer).forEach(key => delete layer[key]));
    draw();
  };

  // Exportar la imagen del mapa
  const exportImage = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    const data = canvas.toDataURL();
    const image = new Image();
    image.src = data;
    const newWindow = window.open("");
    if (newWindow) newWindow.document.write(image.outerHTML);
  };

  return (
    <div className="card">
      <header>
        <h1>Tile Map Editor</h1>
        <div>
          <button className="button-as-link" onClick={clearCanvas}>Clear Canvas</button>
          <button className="primary-button" onClick={exportImage}>Export Image</button>
        </div>
      </header>
      <div className="card_body">
        <aside>
          <label>Tiles</label>
          <div className="tileset-container">
            <img
              id="tileset-source"
              src="/path/to/tileset.png"
              alt="Tileset"
              onClick={selectTile}
              className="cursor-pointer"
            />
            <div
              className="tileset-container_selection"
              style={{ left: `${selectedTile[0] * 32}px`, top: `${selectedTile[1] * 32}px` }}
            ></div>
          </div>
        </aside>
        <div className="card_right-column">
          <canvas
            width={480}
            height={480}
            onClick={handleCanvasClick}
            style={{ background: "#f4f8f9", border: "1px solid #ddd" }}
          ></canvas>
          <p className="instructions">
            <strong>Click</strong> to paint.
            <strong>Shift+Click</strong> to remove.
          </p>
          <div>
            <label>Editing Layer:</label>
            <ul className="layers">
              <li>
                <button onClick={() => setLayer(2)} className={selectedLayer === 2 ? "layer active" : "layer"}>
                  Top Layer
                </button>
              </li>
              <li>
                <button onClick={() => setLayer(1)} className={selectedLayer === 1 ? "layer active" : "layer"}>
                  Middle Layer
                </button>
              </li>
              <li>
                <button onClick={() => setLayer(0)} className={selectedLayer === 0 ? "layer active" : "layer"}>
                  Bottom Layer
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
