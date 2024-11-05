import ReactCanvasConfetti from 'react-canvas-confetti';
import { useRef } from 'react';

import type {
  CreateTypes as TCanvasConfettiInstance,
  GlobalOptions as TCanvasConfettiGlobalOptions,
} from 'canvas-confetti';

const globalOptions: TCanvasConfettiGlobalOptions = {
  resize: true,
  useWorker: true,
};

export const useConfettiAction = () => {
  const confettiInstance = useRef<TCanvasConfettiInstance | null>(null);

  const onInit = ({ confetti }: { confetti: TCanvasConfettiInstance }) => {
    confettiInstance.current = confetti;
  };

  const handleShootConfetti = () => {
    if (confettiInstance.current) {
      confettiInstance.current({
        particleCount: 500,
        angle: 270,
        spread: 175,
        startVelocity: 80,
        decay: 0.9,
        gravity: 1.0,
        drift: 0,
        ticks: 600,
        origin: { x: 0.5, y: -0.5 },
        shapes: ['circle', 'square'],
        scalar: 0.8,
      });
    }
  };

  return {
    handleShootConfetti,
    ConfettiComponent: <ReactCanvasConfetti onInit={onInit} globalOptions={globalOptions} />,
  };
};
