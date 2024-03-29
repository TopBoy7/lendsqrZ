import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import Users from '../../pages/Dashboard/Users';
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { fetchUsers } from "../test/__mocks__/userMocks";

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));
jest.spyOn(window, 'alert').mockImplementation(() => {}); //mocks window alert to prevent error after test
jest.mock('axios');

const mockedAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;

const mockData = [
    {
        accountBalance: "496.00",
        accountNumber: "GWQUSEH1",
        createdAt: "2072-12-27T03:44:22.522Z",
        education: {level: "Bsc", employmentStatus: "Employed", sector: "FinTech", duration: "2 Years"},
        email: "Maverick.Hyatt83@gmail.com",
        guarantor: {firstName: "Celine", lastName: "Monahan", phoneNumber: "1-482-227-3654 x71086", gender: "Male"},
        id: "1",
        lastActiveDate: "2099-02-28T23:17:40.013Z",
        orgName: "labore-dolor-et",
        phoneNumber: "(553) 208-0727 x31321",
        profile: {firstName: "Darian", lastName: "Rolfson", phoneNumber: "494-278-0946"},
        socials: {facebook: "@lendsqr", instagram: "@lendsqr", twitter: "@lendsqr"},
        status: "Active",
        userName: "Wilburn.Rice",
    },
    {
        accountBalance: "496.00",
        accountNumber: "GWQUSEH1",
        createdAt: "2072-12-27T03:44:22.522Z",
        education: {level: "Bsc", employmentStatus: "Employed", sector: "FinTech", duration: "2 Years"},
        email: "Maverick.Hyatt83@gmail.com",
        guarantor: {firstName: "Celine", lastName: "Monahan", phoneNumber: "1-482-227-3654 x71086", gender: "Male"},
        id: "1",
        lastActiveDate: "2099-02-28T23:17:40.013Z",
        orgName: "labore-dolor-et",
        phoneNumber: "(553) 208-0727 x31321",
        profile: {firstName: "Darian", lastName: "Rolfson", phoneNumber: "494-278-0946"},
        socials: {facebook: "@lendsqr", instagram: "@lendsqr", twitter: "@lendsqr"},
        status: "Active",
        userName: "Wilburn.Rice",
    }
]

test('api call works', async () => {
    mockedAxiosGet.mockResolvedValueOnce({ data: mockData });
    
    render(
        <BrowserRouter>
            <Users />
        </BrowserRouter>
    );

    const users = await fetchUsers();
    expect(users).not.toHaveLength(0);
})