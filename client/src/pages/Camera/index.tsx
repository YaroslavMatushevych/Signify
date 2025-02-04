import React, { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import Webcam from 'react-webcam';
import CameraFeed from '../../components/features/Camera/CameraFeed';
import DetectionDisplay from '../../components/features/Camera/DetectionDisplay';
import { detectObjects } from '../../utils/detectObjects';

const MODEL_URL = 'https://tensorflowlanguagesignmodel.s3.eu-gb.cloud-object-storage.appdomain.cloud/model.json';

const CameraPage: React.FC = () => {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [detection, setDetection] = useState<string>('Start detecting');

    useEffect(() => {
        const loadModel = async () => {
            try {
                const net = await tf.loadGraphModel(MODEL_URL);

                // Process every 100ms for smoother performance
                const detectionInterval = setInterval(() => {
                    detectObjects(net, webcamRef, canvasRef, setDetection);
                }, 100);

                return () => clearInterval(detectionInterval);
            } catch (error) {
                console.error('Error loading model:', error);
            }
        };

        loadModel();
    }, []);

    return (
        <div className="flex md:flex-col w-full h-screen pt-20 overflow-hidden">
            <CameraFeed webcamRef={webcamRef} canvasRef={canvasRef} />
            <DetectionDisplay detection={detection} />
        </div>
    );
};

export default CameraPage;
