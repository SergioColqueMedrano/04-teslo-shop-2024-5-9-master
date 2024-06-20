'use client'
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { canvas } from 'zcanvas';
import { initCache } from '@/renderers/render-cache';
import WorldRenderer from '@/renderers/world-renderer';
import { AppDispatch, RootState } from './store';
import { TileTypes } from '@/definitions/world-tiles';

interface TileDef {
    x: number;
    y: number;
    height: number;
    type: TileTypes;
    // Añadir otras propiedades si es necesario
  }

const MIN_AMOUNT_OF_TILES = 9;

const WorldRendererComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const terrain = useSelector((state: RootState) => state.world.terrain) as TileDef[];
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const handlers = useRef<Array<{ event: string, callback: () => void }>>([]);
  const zcanvasInstance = useRef<canvas | null>(null);
  const renderer = useRef<WorldRenderer | null>(null); // Definir renderer como useRef<WorldRenderer | null>(null)

  useEffect(() => {
    const setupCanvas = async () => {
      try {
        await initCache();

        zcanvasInstance.current = new canvas({
          width: window.innerWidth,
          height: window.innerHeight,
          animate: true,
          smoothing: false,
          fps: 60,
          onUpdate: updateGame,
          backgroundColor: '#0000FF',
        });

        const resizeEvent = 'onorientationchange' in window ? 'orientationchange' : 'resize';
        const handleResize = () => {
          // Lógica de redimensionamiento
        };
        window.addEventListener(resizeEvent, handleResize);

        handlers.current.push({ event: resizeEvent, callback: handleResize });

        handlers.current.forEach(({ event, callback }) => {
          window.addEventListener(event, callback);
        });

        if (canvasContainerRef.current && zcanvasInstance.current) {
          zcanvasInstance.current.insertInPage(canvasContainerRef.current);
          if (renderer.current) { // Acceder correctamente a renderer.current
            zcanvasInstance.current.addChild(renderer.current);
          }
        }
      } catch (error) {
        console.error('Error initializing cache:', error);
      }
    };

    setupCanvas();

    return () => {
      handlers.current.forEach(({ event, callback }) => {
        window.removeEventListener(event, callback);
      });
      handlers.current = [];
      if (zcanvasInstance.current) {
        zcanvasInstance.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (renderer.current && terrain.length > 0) {
      renderer.current.setTerrain([...terrain]);
    }
  }, [terrain]);

  const updateGame = () => {
    // Lógica de actualización del juego aquí
  };

  return <div ref={canvasContainerRef} className="world-renderer"></div>;
};

export default WorldRendererComponent;
