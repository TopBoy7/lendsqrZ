import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Login from '../../pages/Login';
import userEvent from '@testing-library/user-event';
import React from "react";

test('form displays on page when page loads', () => {
    render(<Login />);

    const form = screen.getByTestId('login-form') as HTMLElement;
    expect(form).toBeInTheDocument();
})

test('shows error message on invalid email input', () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
    userEvent.type(emailInput, 'Obode Daniel');

    const errorMessage = screen.getByText('Please enter a valid email');
    expect(errorMessage).toBeInTheDocument();
});

test('shows error message on invalid password input', () => {
    render(<Login />);

    const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
    userEvent.type(passwordInput, 'Hello');

    const errorMessage = screen.getByText('Please enter a password up to 8 characters')
    expect(errorMessage).toBeInTheDocument();
});