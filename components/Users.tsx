import '../src/assets/styles/users.scss';
import icon1 from '../src/assets/icons/icon1.svg';
import icon2 from '../src/assets/icons/icon2.svg';
import icon3 from '../src/assets/icons/icon3.svg';
import icon4 from '../src/assets/icons/icon4.svg';
import { Stat } from '../utils/interfaces';
import UserStats from './UserStats';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import api from '../api/api';
import { UserObject } from '../utils/interfaces';
import { useEffect, useState } from 'react';

function Users() {

    // Users stats 
    const userStats: Stat[] = [
        {
            id: 1,
            image: icon1,
            title: 'USERS',
            value: '2,453'
        },
        {
            id: 2,
            image: icon2,
            title: 'ACTIVE USERS',
            value: '2,453'
        },
        {
            id: 3,
            image: icon3,
            title: 'USERS WITH LOANS',
            value: '12,453'
        },
        {
            id: 4,
            image: icon4,
            title: 'USERS WITH SAVINGS',
            value: '102,453'
        },
    ]

    // to store all users retrieved from api call 
    const [users, setUsers] = useState<UserObject[]>([]);
    // to store users currently being displayed 
    const [usersOnPage, setUsersOnPage] = useState<UserObject[]>([]);
    // to store number of users currently being displayed 
    const [usersToDisplay, setUsersToDisplay] = useState<number>(25);
    // page number for pagination 
    const [currentPageIndex, setCurrentPageIndex] = useState<number>(3)
    // number of pages for pagination 
    const[numberOfPages, setNumberOfPages] = useState<number>(20)
    let currentUsers = [];

    const showUsers = () => {
        const firstIndex = (currentPageIndex - 1) * usersToDisplay;
        const secondIndex = currentPageIndex * usersToDisplay;
        setUsersOnPage(users.slice(firstIndex, secondIndex));
        
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

    // function to format date 
    const formattedDate = (dateFromData: string) => {
        const date = new Date(dateFromData);
        const newFormat = date.toString()
        return `${newFormat.slice(4, 9)}, ${newFormat.slice(10, 21)}`
    }

    // function to format phone number 
    const formattedPhoneNumber = (phoneNumber: string) => {
        return `${phoneNumber.slice(0, 13)}`
    }

    // function to format organization name 
    // this function is not necessary and is strictly for visual consistency 
    const formattedOrgName = (orgName: string) => {
        return `${orgName.slice(0, 20)}`
    }

    

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
                                    <FilterListOutlinedIcon className='filter' />
                                </div>
                            </th>
                            <th>
                                <div className="head">
                                    <h6>USERNAME</h6>
                                    <FilterListOutlinedIcon className='filter' />
                                </div>
                            </th>
                            <th>
                                <div className="head">
                                    <h6>EMAIL</h6>
                                    <FilterListOutlinedIcon className='filter' />
                                </div>
                            </th>
                            <th>
                                <div className="head">
                                    <h6>PHONE NUMBER</h6>
                                    <FilterListOutlinedIcon className='filter' />
                                </div>
                            </th>
                            <th>
                                <div className="head">
                                    <h6>DATE JOINED</h6>
                                    <FilterListOutlinedIcon className='filter' />
                                </div>
                            </th>
                            <th>
                                <div className="head">
                                    <h6>STATUS</h6>
                                    <FilterListOutlinedIcon className='filter' />
                                </div>
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
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

        </div>

    )
}

export default Users;