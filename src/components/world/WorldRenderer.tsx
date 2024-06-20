'use client'

import React, { useEffect, useRef } from 'react';
import { canvas } from 'zcanvas';
import WorldRenderer from '@/renderers/world-renderer';// Importa tu store de zustand
import { useWorldStore } from '@/stores/useWorldStore';

const MIN_AMOUNT_OF_TILES = 9; // minimum amount of tiles visible on the dominant axis of the screen
const renderer = new WorldRenderer();

const WorldRendererComponent: React.FC = () => {
  const terrain = useWorldStore(state => state.terrain); // Obtiene el estado del terreno desde zustand
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const handlers = useRef<Array<{ event: string, callback: () => void }>>([]);
  const zcanvasInstance = useRef<any>(null);

  useEffect(() => {
    // Set up the zCanvas instance
    zcanvasInstance.current = new canvas({
      width: window.innerWidth,
      height: window.innerHeight,
      animate: true,
      smoothing: false,
      fps: 60,
      onUpdate: updateGame,
      backgroundColor: '#0066ff',
    });

    // Attach event handlers
    const resizeEvent = 'onorientationchange' in window ? 'orientationchange' : 'resize';
    handlers.current.push({ event: resizeEvent, callback: handleResize });

    handlers.current.forEach(({ event, callback }) => {
      window.addEventListener(event, callback);
    });

    if (canvasContainerRef.current) {
      zcanvasInstance.current.insertInPage(canvasContainerRef.current);
      zcanvasInstance.current.addChild(renderer);
    }

    return () => {
      // Cleanup
      handlers.current.forEach(({ event, callback }) => {
        window.removeEventListener(event, callback);
      });
      handlers.current = [];
      zcanvasInstance.current.dispose();
    };
  }, []);

  useEffect(() => {
    // Handle terrain updates
    if (terrain.length > 0) {
      renderer.setTerrain([...terrain]);
    }
  }, [terrain]);

  const handleResize = () => {
    const tileWidth = 20;
    const tileHeight = 20; // TODO list somewhere
    const { clientWidth, clientHeight } = document.documentElement;
    let tilesInWidth, tilesInHeight;

    if (clientWidth > clientHeight) {
      // landscape
      tilesInHeight = tileHeight * MIN_AMOUNT_OF_TILES;
      tilesInWidth = Math.round((clientWidth / clientHeight) * tilesInHeight);
    } else {
      // portrait
      tilesInWidth = tileWidth * MIN_AMOUNT_OF_TILES;
      tilesInHeight = Math.round((clientHeight / clientWidth) * tilesInWidth);
    }

    zcanvasInstance.current.setDimensions(tilesInWidth, tilesInHeight);
    zcanvasInstance.current.scale(clientWidth / tilesInWidth, clientHeight / tilesInHeight);
  };

  const updateGame = () => {
    // Update game logic here
  };

  return <div ref={canvasContainerRef} className="world-renderer"></div>;
};

export default WorldRendererComponent;
