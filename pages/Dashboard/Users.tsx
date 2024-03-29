import '../../src/assets/styles/users.scss';
import UserStats from '../../components/UserStats';
import {
    FilterListOutlined as FilterListOutlinedIcon,
    MoreVertOutlined as MoreVertOutlinedIcon,
} from '@mui/icons-material';
import api from '../../api/api';
import { Pagination } from '@mui/material';
import { UserObject, Stat, FilterFormObject } from '../../utils/interfaces';
import { Fragment, useEffect, useState } from 'react';
import FilterForm from '../../components/FilterForm';
import Loader from '../../components/Loader';
import { userStats, tableHeaders, emptyForm, initialFilterPopupState as initialState } from '../../utils/constants';
import view from '../../src/assets/icons/view.png';
import blacklist from '../../src/assets/icons/blacklist.png';
import activate from '../../src/assets/icons/activate.png';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

function Users() {


    // to store all users retrieved from api call 
    const [users, setUsers] = useState<UserObject[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // function to format date from user object 
    const formattedDate = (dateFromData: string): string => {
        const date = new Date(dateFromData);
        const newFormat = date.toString()
        return `${newFormat.slice(4, 9)}, ${newFormat.slice(10, 21)}`
    }
    // function to format phone number from user object
    const formattedPhoneNumber = (phoneNumber: string): string => {
        return `${phoneNumber.slice(0, 13)}`
    }
    // function to format organization name from user object
    // this function is not necessary and is strictly for visual consistency 
    const formattedOrgName = (orgName: string): string => {
        return `${orgName.slice(0, 20)}`
    }

    useEffect(() => {

        // check local storage for users array and use it available 
        if (localStorage.getItem('users')) {
            const data = JSON.parse(localStorage.getItem('users')!);
            // mockapi.io allows only 100 mock responses for each endpoint 
            // that is why I repeated the same 100 responses 5 times 
            setUsers([
                ...data,
                ...data,
                ...data,
                ...data,
                ...data,
            ]); 
            return;
        } else {
            // if nothing in local Storage, get user data through api call 
            const getUsers = async () => {
                try {
                    setIsLoading(true);
                    const res = await api.get('users');
                    for (let i = 0; i < res.data.length; i++) {
                        if (i % 2 === 0 || i % 3 === 0 ) {
                            res.data[i].status = 'Active';
                        } else if (i % 4 === 0 || i % 5 === 0 ) {
                            res.data[i].status = 'Blacklisted';
                        } else if (i % 6 === 0 || i % 7 === 0 ) {
                            res.data[i].status = 'Inactive';
                        } else {
                            res.data[i].status = 'Pending'
                        }
                    }
                    localStorage.setItem('users', JSON.stringify(res.data))
                    setUsers([
                        ...res.data,
                        ...res.data,
                        ...res.data,
                        ...res.data,
                        ...res.data,
                    ]);
                } catch (error) {
                    alert(error);
                } finally {
                    setIsLoading(false);
                }
            }
            getUsers();
        }
        
    }, []);


    // ------------------------------pagination functionality here------------------------------ 
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const displayed = queryParams.get('usersDisplayed');
    const pageNo = queryParams.get('page');
    // state to store number of users currently being displayed
    // if there is a query parameter, the default should be set to that on page load 
    const defaultToDisplay = displayed? displayed : '10'
    const [usersToDisplay, setUsersToDisplay] = useState<string>(defaultToDisplay);
    // number of pages for pagination 
    const pagesNumber = displayed? 500 / +displayed : 50;
    const[numberOfPages, setNumberOfPages] = useState<number>(pagesNumber);
    // state to store page number for pagination 
    // if there is a query parameter, the default should be set to that on page load 
    const defaultIndex = pageNo? +pageNo : 1;
    const [currentPageIndex, setCurrentPageIndex] = useState<number>(defaultIndex);
    // first and second index for users array slice 
    const firstIndex: number = (currentPageIndex - 1) * +usersToDisplay;
    const secondIndex: number = currentPageIndex * +usersToDisplay;
    // array of users to be displayed (as selected at the bottom) 
    const usersOnPage: UserObject[] = users.slice(firstIndex, secondIndex);
    const [searchParams, setSearchParams] = useSearchParams();
    // Create a new URLSearchParams object from the current search parameters
    const params = new URLSearchParams(searchParams.toString());
    // set number of users to display and update the number of pages for pagination 
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setUsersToDisplay(`${event.target.value}`);
        setNumberOfPages(users.length/+event.target.value);
        params.set('usersDisplayed', `${event.target.value}`)
        // reset page index after number of displayed users is changed 
        setCurrentPageIndex(1);
        params.set('page', '1');
        setSearchParams(params);
    }
    // jump to page function for pagination component 
    const changePage = (event: React.ChangeEvent<unknown>,val: number): void => {
        setCurrentPageIndex(val);
        params.set('page', `${val}`)
        setSearchParams(params);
        event.preventDefault();
        // scrollToTop();
    }
    // -----------------------------pagination functionality ends here------------------------------ 


    // -------------------------------filter popup functionality----------------------------
    const [ isOpen, setIsOpen ] = useState(initialState);
    const [formEntries, setFormEntries] = useState<FilterFormObject>(emptyForm);

    const handleFilterSelect = (event:React.ChangeEvent<HTMLSelectElement>, input: string): void => {
        setFormEntries((prevValue) => ({
            ...prevValue,
            [input]: `${event.target.value}`
        }))
    }

    const handleFilterChange = (event:React.ChangeEvent<HTMLInputElement>, input: string): void => {
        setFormEntries((prevValue) => ({
            ...prevValue,
            [input]: `${event.target.value}`
        }))
    }

    const openFilter = (column: string): void => {
        if (!isOpen[column]) {
            setIsOpen({
                ...initialState,
                [column]: true
            })
        } else {
            setIsOpen(initialState);
        }
    }
    const filter = (event: React.FormEvent<HTMLFormElement>): void => {
        const filteredList = users.filter((user) => {
            const validUsers = (user.orgName.includes(formEntries.organization? formEntries.organization : users[0].orgName)) ||
                            (user.userName.includes(formEntries.username)) ||
                            (user.email.includes(formEntries.email)) ||
                            (user.phoneNumber.includes(formEntries.phoneNumber)) ||
                            (user.createdAt.includes(formEntries.date)) ||
                            (user.status.includes(formEntries.status? formEntries.status : 'Any'))
            return validUsers
        })
        setUsers(filteredList);
        setCurrentPageIndex(1);
        setUsersToDisplay('10');
        searchParams.delete('page');
        setSearchParams(searchParams);
        searchParams.delete('usersDisplayed');
        setSearchParams(searchParams);
        const newNumberOfPages = Math.ceil(filteredList.length / 10); // Calculate the new number of pages based on the filtered list
        setNumberOfPages(newNumberOfPages);
        
        event.preventDefault()
        setIsOpen(initialState)
    }
    const resetFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
        setFormEntries(emptyForm)
        const data = JSON.parse(localStorage.getItem('users')!);
        setUsers([
            ...data,
            ...data,
            ...data,
            ...data,
            ...data,
        ]);
        setUsersToDisplay('10');
        setNumberOfPages(50);
        setIsOpen(initialState);
        event.preventDefault();
    }
    // --------------------------filter popup functionality ends here-----------------------
    

    // -------------------------------user options functionality here-------------------------------------
    const navigate = useNavigate();
    const [showOptions, setShowOptions] = useState<number>(0)
    // i used index instead of ID here because some IDs are repeated 
    // (as I stated above, I had to spread the same response 5 times because there are only a hundred responses )
    const toggleUserOptions = (index: number): void => {
        if (index === showOptions) {
            setShowOptions(0);
        } else {
            setShowOptions(index)
        }
    }
    const viewUser = (user: UserObject): void => {
        navigate(`${user.id}`);
    }
    const blacklistUser = (user: UserObject): void => {
        user['status'] = 'Blacklisted';
        setShowOptions(0);
    }
    const activateUser = (user: UserObject): void => {
        user['status'] = 'Active';
        setShowOptions(0);
    }
    // -------------------------------user options functionality ends here-----------------------------


    return (
        <Fragment>
            
            <div className="users">
                <h2>Users</h2>

                {isLoading && (
                    <div className="loading">
                        <Loader />
                    </div>
                )}

                {!isLoading && (
                    <div>
                        <div className="user-stats">
                            {userStats.map((stat: Stat, index) => (
                                <UserStats stat={stat} key={index} />
                            ))}
                        </div>

                        <div className="user-info">
                            <table>
                                <thead>
                                    <tr>
                                        {tableHeaders.map((header, index) => (
                                            <th key={index}>
                                                <div className="head">
                                                    <h6>{header}</h6>
                                                    <FilterListOutlinedIcon className='filter-icon'  onClick={() => openFilter(header)} />
                                                </div>
                                                { isOpen[header] && (
                                                    <div className="filter">
                                                        <FilterForm 
                                                            users={users} 
                                                            filter={filter} 
                                                            resetFilter={resetFilter} 
                                                            formEntries={formEntries}
                                                            handleChange={handleFilterChange}
                                                            handleSelect={handleFilterSelect}
                                                        />
                                                    </div>
                                                )}
                                            </th>
                                        ))}
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersOnPage.map((user, index) => (
                                        <tr role='table-body-row' key={index}>
                                            <td>{ formattedOrgName(user.orgName) }</td>
                                            <td>{ user.userName }</td>
                                            <td>{ user.email }</td>
                                            <td>{ formattedPhoneNumber(user.phoneNumber) }</td>
                                            <td>{ formattedDate(user.createdAt) }</td>
                                            <td>
                                                <div className={user.status}>
                                                    <p>{ user.status }</p>
                                                </div>
                                            </td>
                                            <td>
                                                <MoreVertOutlinedIcon className='options' onClick={() => toggleUserOptions(index + 1)} />
                                                
                                            {/* default is 0 and when it is not 0, the options for the user at that index should show  */}
                                            { (showOptions === index + 1) && (
                                                <div className="user-options">
                                                    <div className="option" onClick={() => viewUser(user)}>
                                                        <img src={view} alt="view details icon" />
                                                        <p>View Details</p>
                                                    </div>
                                                    <div className="option" onClick={() => blacklistUser(user)} >
                                                        <img src={blacklist} alt="blacklist user icon"/>
                                                        <p>Blacklist User</p>
                                                    </div>
                                                    <div className="option" onClick={() => activateUser(user)} >
                                                        <img src={activate} alt="activate user icon" />
                                                        <p>Activate User</p>
                                                    </div>
                                                </div>
                                            )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="pagination-row">
                            <div className="pagination-col">
                                <p>Showing 
                                    <select value={ usersToDisplay } onChange={ handleSelect }>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="25">25</option>
                                    </select>
                                    out of { users.length }
                                </p>
                            </div>
                            <div className="pagination-col">
                                <Pagination count={numberOfPages} shape="rounded" page={defaultIndex} onChange={(event, val)=> changePage(event, val)} />
                                {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}
                            </div>
                        </div>

                    </div>
                )}
            </div>
            
        </Fragment>
    )
}

export default Users;