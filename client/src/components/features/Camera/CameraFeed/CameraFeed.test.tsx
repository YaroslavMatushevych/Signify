import { render, screen } from '@testing-library/react';
import CameraFeed from './index';

jest.mock('react-webcam', () => {
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    const React = require('react'); // Lazily require React
    return React.forwardRef((props, ref) => (
        <div ref={ref} {...props} data-testid="mock-webcam">
            Mock Webcam
        </div>
    ));
});

describe('CameraFeed Component', () => {
    it('should render the Webcam component', () => {
        const mockWebcamRef = { current: null };
        const mockCanvasRef = { current: null };

        render(<CameraFeed webcamRef={mockWebcamRef} canvasRef={mockCanvasRef} />);

        expect(screen.getByTestId('mock-webcam')).toBeInTheDocument();
    });

    it('should render the canvas element', () => {
        const mockWebcamRef = { current: null };
        const mockCanvasRef = { current: null };

        render(<CameraFeed webcamRef={mockWebcamRef} canvasRef={mockCanvasRef} />);

        expect(screen.getByTestId('canvas-webcam')).toBeInTheDocument();
    });

    it('should apply correct classes for layout', () => {
        const mockWebcamRef = { current: null };
        const mockCanvasRef = { current: null };

        const { container } = render(<CameraFeed webcamRef={mockWebcamRef} canvasRef={mockCanvasRef} />);

        expect(container.firstChild).toHaveClass('relative flex-grow md:flex-grow-0 md:h-1/2 bg-gray-800');
    });
});
