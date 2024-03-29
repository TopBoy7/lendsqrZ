import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Login from '../../pages/Login';
// import fireEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

test('form displays on page when page loads', () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    const form = screen.getByTestId('login-form') as HTMLElement;
    expect(form).toBeInTheDocument();
})

test('shows error message on invalid email input', () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
    const button = screen.getByText('LOG IN');
    fireEvent.click(emailInput);
    fireEvent.change(emailInput, { target: { value: 'wrongValue' } });
    fireEvent.click(button);

    const errorMessage = screen.getByText('Please enter a valid email');
    expect(errorMessage).toBeInTheDocument();
});

test('shows error message on invalid password input', () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
    const button = screen.getByText('LOG IN');
    fireEvent.click(emailInput);
    fireEvent.change(emailInput, { target: { value: 'obodedaniel3@gmail.com' } });
    fireEvent.click(passwordInput);
    fireEvent.change(passwordInput, { target: { value: 'wrong' } });
    fireEvent.click(button);

    const errorMessage = screen.getByText('Please enter a password up to 8 characters', { exact: false })
    expect(errorMessage).toBeInTheDocument();
});