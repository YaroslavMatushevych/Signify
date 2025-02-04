import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Button from './index';

describe('Button Component', () => {
    it('renders correctly with children', () => {
        render(<Button>Click Me</Button>);
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('triggers onClick event when clicked', () => {
        const onClickMock = jest.fn();
        render(<Button onClick={onClickMock}>Click Me</Button>);
        fireEvent.click(screen.getByText('Click Me'));
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it('applies the correct styles for the "text" variant', () => {
        render(<Button variant="text">Text Button</Button>);
        const button = screen.getByText('Text Button');
        expect(button).toHaveClass('bg-transparent text-black');
    });

    it('disables the button when the disabled prop is true', () => {
        render(
            <Button disabled onClick={() => {}}>
                Disabled
            </Button>,
        );
        const button = screen.getByText('Disabled');
        expect(button).toBeDisabled();
    });
});
