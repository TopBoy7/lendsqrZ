import '../src/assets/styles/users.scss';
import UserStats from './UserStats';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import api from '../api/api';
import { Pagination } from '@mui/material';
import { UserObject, OpenFilterObject, Stat } from '../utils/interfaces';
import { useEffect, useState } from 'react';
import FilterForm from '../components/FilterForm';
import { scrollToTop, userStats } from '../utils/constants';

function Users() {


    // to store all users retrieved from api call 
    const [users, setUsers] = useState<UserObject[]>([]);
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


    // -------------------------------filter popup functionality----------------------------
    // state to store if filter is open 
    const initialState: OpenFilterObject = {
        organization: false,
        username: false,
        email: false,
        phoneNumber: false,
        dateJoined: false,
        status: false,
    }
    const [ isOpen, setIsOpen ] = useState(initialState);
    // function to close filter popup 
    const closePopup = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        setIsOpen(initialState)
    }
    // functions to display filters 
    const openOrgFilter = (): void => {
        if ( !isOpen.organization ) {
            setIsOpen({
                ...initialState,
                organization: true,
            })
        } else {
            setIsOpen(initialState);
        }
    }
    const openUsernameFilter = (): void => {
        if ( !isOpen.username ) {
            setIsOpen({
                ...initialState,
                username: true,
            })
        } else {
            setIsOpen(initialState)
        }
    }
    const openEmailFilter = (): void => {
        if ( !isOpen.email ) {
            setIsOpen({
                ...initialState,
                email: true,
            })
        } else {
            setIsOpen(initialState);
        }
    }
    const openPhoneNumberFilter = (): void => {
        if ( !isOpen.phoneNumber ) {
            setIsOpen({
                ...initialState,
                phoneNumber: true,
            })
        } else {
            setIsOpen(initialState);
        }
    }
    const openDateJoinedFilter = (): void => {
        if ( !isOpen.dateJoined ) {
            setIsOpen({
                ...initialState,
                dateJoined: true,
            })
        } else {
            setIsOpen(initialState);
        }
    }
    const openStatusFilter = (): void => {
        if ( !isOpen.status ) {
            setIsOpen({
                ...initialState,
                status: true,
            })
        } else {
            setIsOpen(initialState);
        }
    }
    // --------------------------filter popup functionality ends here-----------------------


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
                    console.log(error);
                }
            }

            getUsers();
            
        }
        
    }, []);


    // ------------------------------pagination functionality here------------------------------  
    // to store number of users currently being displayed 
    const [usersToDisplay, setUsersToDisplay] = useState<string>('10');
    // page number for pagination 
    const [currentPageIndex, setCurrentPageIndex] = useState<number>(1);
    // number of pages for pagination 
    const[numberOfPages, setNumberOfPages] = useState<number>(50);
    // first and second index for users array slice 
    const firstIndex: number = (currentPageIndex - 1) * +usersToDisplay;
    const secondIndex: number = currentPageIndex * +usersToDisplay;
    // array of users to be displayed (as selected at the bottom) 
    const usersOnPage: UserObject[] = users.slice(firstIndex, secondIndex);
    // set number of users to display and update the number of pages for pagination 
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setUsersToDisplay(`${event.target.value}`);
        // if (usersToDisplay === '10') {
        //     setNumberOfPages(50);
        // } else if (usersToDisplay === '25') {
        //     setNumberOfPages(20);
        // } else {
        //     setNumberOfPages(10);
        // }
        setNumberOfPages(users.length/+event.target.value);
        console.log( numberOfPages );
    }
    // jump to page function for pagination component 
    const changePage = (val: number): void => {
        setCurrentPageIndex(val);
        scrollToTop();
    }
    // -----------------------------pagination functionality ends here------------------------------  


    return (

        <div className="users">
            <h2>Users</h2>

            <div className="user-stats">
                {userStats.map((stat: Stat, index) => (
                    <UserStats stat={stat} key={index} />
                ))}
            </div>

            <div className="user-info">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <div className="head">
                                    <h6>ORGANIZATION</h6>
                                    <FilterListOutlinedIcon className='filter-icon'  onClick={openOrgFilter} />
                                </div>
                                { isOpen.organization? (
                                    <div className="filter">
                                        <FilterForm closePopup={closePopup} />
                                    </div>
                                ): (<div></div>)}
                            </th>
                            <th>
                                <div className="head">
                                    <h6>USERNAME</h6>
                                    <FilterListOutlinedIcon className='filter-icon' onClick={openUsernameFilter} />
                                </div>
                                { isOpen.username? (
                                    <div className="filter">
                                        <FilterForm closePopup={closePopup} />
                                    </div>
                                ): (<div></div>)}
                            </th>
                            <th>
                                <div className="head">
                                    <h6>EMAIL</h6>
                                    <FilterListOutlinedIcon className='filter-icon' onClick={openEmailFilter} />
                                </div>
                                { isOpen.email? (
                                    <div className="filter">
                                        <FilterForm closePopup={closePopup} />
                                    </div>
                                ): (<div></div>)}
                            </th>
                            <th>
                                <div className="head">
                                    <h6>PHONE NUMBER</h6>
                                    <FilterListOutlinedIcon className='filter-icon' onClick={openPhoneNumberFilter} />
                                </div>
                                { isOpen.phoneNumber? (
                                    <div className="filter">
                                        <FilterForm closePopup={closePopup} />
                                    </div>
                                ): (<div></div>)}
                            </th>
                            <th>
                                <div className="head">
                                    <h6>DATE JOINED</h6>
                                    <FilterListOutlinedIcon className='filter-icon' onClick={openDateJoinedFilter} />
                                </div>
                                { isOpen.dateJoined? (
                                    <div className="filter">
                                        <FilterForm closePopup={closePopup} />
                                    </div>
                                ): (<div></div>)}
                            </th>
                            <th>
                                <div className="head">
                                    <h6>STATUS</h6>
                                    <FilterListOutlinedIcon className='filter-icon' onClick={openStatusFilter} />
                                </div>
                                { isOpen.status? (
                                    <div className="filter last">
                                        <FilterForm closePopup={closePopup} />
                                    </div>
                                ): (<div></div>)}
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersOnPage.map((user, index) => (
                            <tr key={index}>
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
                                <td><MoreVertOutlinedIcon className='options' /></td>
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
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                        out of { users.length }
                    </p>
                </div>
                <div className="pagination-col">
                    <Pagination count={numberOfPages} shape="rounded" onChange={(event, val)=> changePage(val)} />
                    {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}
                </div>
            </div>

        </div>

    )
}

export default Users;