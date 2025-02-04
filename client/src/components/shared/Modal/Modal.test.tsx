import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './index';

describe('Modal Component', () => {
    it('renders children when isOpen is true', () => {
        render(
            <Modal isOpen onClose={() => {}}>
                <p>Modal Content</p>
            </Modal>,
        );
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    it('does not render anything when isOpen is false', () => {
        render(
            <Modal isOpen={false} onClose={() => {}}>
                <p>Hidden Content</p>
            </Modal>,
        );
        expect(screen.queryByText('Hidden Content')).not.toBeInTheDocument();
    });

    it('triggers onClose when the close button is clicked', () => {
        const onCloseMock = jest.fn();
        render(
            <Modal isOpen onClose={onCloseMock}>
                <p>Modal Content</p>
            </Modal>,
        );
        const closeButton = screen.getByText('✕');
        fireEvent.click(closeButton);
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('applies the correct styles to the modal container', () => {
        render(
            <Modal isOpen onClose={() => {}}>
                <p>Styled Modal</p>
            </Modal>,
        );
        const modal = screen.getByText('Styled Modal').parentElement;
        expect(modal).toHaveClass('bg-white');
    });
});
