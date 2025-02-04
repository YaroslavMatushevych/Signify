import React, { RefObject } from 'react';
import Webcam from 'react-webcam';

interface CameraFeedProps {
    webcamRef: RefObject<Webcam>;
    canvasRef: RefObject<HTMLCanvasElement>;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ webcamRef, canvasRef }) => (
    <div className="relative flex-grow md:flex-grow-0 md:h-1/2 bg-gray-800">
        <Webcam ref={webcamRef} mirrored muted className="absolute w-full" />
        <canvas ref={canvasRef} className="absolute w-full" data-testid="canvas-webcam" />
    </div>
);

export default CameraFeed;
