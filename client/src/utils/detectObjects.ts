/* eslint-disable prefer-destructuring */
import * as tf from '@tensorflow/tfjs';
import Webcam from 'react-webcam';
import { LABEL_MAP } from './constants';

export const detectObjects = async (
    net: tf.GraphModel,
    webcamRef: React.RefObject<Webcam>,
    canvasRef: React.RefObject<HTMLCanvasElement>,
    setDetection: React.Dispatch<React.SetStateAction<string>>,
): Promise<void> => {
    try {
        if (webcamRef.current && webcamRef.current.video.readyState === 4 && canvasRef.current) {
            const video = webcamRef.current.video;
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;

            // Set video and canvas dimensions
            video.width = videoWidth;
            video.height = videoHeight;
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            // Preprocess the frame for the model
            const img = tf.browser.fromPixels(video);
            const resized = tf.image.resizeBilinear(img, [320, 240]); // Use lower resolution
            const casted = resized.cast('int32');
            const expanded = casted.expandDims(0);

            // Run inference
            const predictions = await net.executeAsync(expanded);

            // Extract outputs
            const boxes: number[][][] = (await predictions[1]?.array()) || [];
            const classes: number[][] = (await predictions[2]?.array()) || [];
            const scores: number[][] = (await predictions[4]?.array()) || [];

            const ctx = canvasRef.current.getContext('2d');
            if (!ctx) throw new Error('Failed to get canvas 2D context.');

            requestAnimationFrame(() => {
                ctx.clearRect(0, 0, videoWidth, videoHeight);

                if (scores[0]?.length && classes[0]?.length) {
                    for (let i = 0; i < scores[0].length; i++) {
                        const score = scores[0][i];
                        if (score > 0.8) {
                            // Threshold for confidence
                            const [y, x, h, w] = boxes[0][i];
                            const classId = classes[0][i];
                            const label = LABEL_MAP[classId]?.name || 'Unknown';
                            const color = LABEL_MAP[classId]?.color || 'red';

                            // Draw bounding box
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 4;
                            ctx.beginPath();
                            ctx.rect(x * videoWidth, y * videoHeight, (w - x) * videoWidth, (h - y) * videoHeight);
                            ctx.stroke();

                            // Draw label
                            ctx.fillStyle = color;
                            ctx.font = '16px Arial';
                            ctx.fillText(`${label} (${(score * 100).toFixed(1)}%)`, x * videoWidth, y * videoHeight - 10);

                            // Update detection
                            setDetection(label);
                        }
                    }
                }
            });

            // Dispose tensors to free memory
            tf.dispose([img, resized, casted, expanded, predictions]);
        } else {
            console.warn('Webcam or canvas is not ready.');
        }
    } catch (error) {
        console.error('Error during object detection:', error);
    }
};
