import { render, screen } from '@testing-library/react';
import * as tf from '@tensorflow/tfjs';
import CameraPage from './index';
import { detectObjects } from '../../utils/detectObjects';

// Mock dependencies
jest.mock('@tensorflow/tfjs', () => ({
    loadGraphModel: jest.fn(),
}));

jest.mock('../../utils/detectObjects', () => ({
    detectObjects: jest.fn(),
}));

jest.mock('react-webcam', () => {
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    const React = require('react'); // Lazy load React
    const Webcam = React.forwardRef((props, ref) => <div ref={ref} data-testid="webcam" {...props} />);
    Webcam.displayName = 'Webcam';
    return Webcam;
});

describe('CameraPage', () => {
    const mockNet = {
        executeAsync: jest.fn(),
    };

    beforeEach(() => {
        jest.useFakeTimers();
        jest.clearAllMocks();
        (tf.loadGraphModel as jest.Mock).mockResolvedValue(mockNet);
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('renders the CameraFeed and DetectionDisplay components', () => {
        render(<CameraPage />);

        expect(screen.getByTestId('webcam')).toBeInTheDocument();
        expect(screen.getByText('Start detecting')).toBeInTheDocument();
    });

    it('loads the model on mount', async () => {
        render(<CameraPage />);

        expect(tf.loadGraphModel).toHaveBeenCalledWith('https://tensorflowlanguagesignmodel.s3.eu-gb.cloud-object-storage.appdomain.cloud/model.json');
    });

    it('clears the interval on unmount', async () => {
        const { unmount } = render(<CameraPage />);

        unmount();

        jest.advanceTimersByTime(300);

        expect(detectObjects).not.toHaveBeenCalled();
    });
});
