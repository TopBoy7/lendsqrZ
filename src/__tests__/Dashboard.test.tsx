import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Dashboard from "../../pages/Dashboard";
import { BrowserRouter } from "react-router-dom";

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

test('side-nav shows up on page', () => {
    render(
        <BrowserRouter>
            <Dashboard />
        </BrowserRouter>
    );

    const sideNav = screen.getByTestId('side-nav') as HTMLElement;
    expect(sideNav).toBeInTheDocument();
})

test('navbar shows up on page', () => {
    render(
        <BrowserRouter>
            <Dashboard />
        </BrowserRouter>
    );

    const navBar = screen.getByTestId('navbar') as HTMLElement;
    expect(navBar).toBeInTheDocument();
})