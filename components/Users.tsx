import '../src/assets/styles/users.scss';
import icon1 from '../src/assets/icons/icon1.svg';
import icon2 from '../src/assets/icons/icon2.svg';
import icon3 from '../src/assets/icons/icon3.svg';
import icon4 from '../src/assets/icons/icon4.svg';
import { Stat } from '../utils/interfaces';
import UserStats from './UserStats';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Clients } from '../api/api';
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

    const [users, setUsers] = useState<UserObject[]>([]);

    // useEffect(() => {

    //     // check local storage for users array and use it available 
    //     if (localStorage.getItem('users')) {

    //         const data = JSON.parse(localStorage.getItem('users')!);
    //         setUsers(data);
    //         return;

    //     } else {

    //         // API call to get user data 
    //         Clients.getClients().then(res => {
    //             for (let i = 0; i < res.length; i++) {
    //                 if (i % 2 === 0 || i % 3 === 0 ) {
    //                     res[i].status = 'Active';
    //                 } else if (i % 4 === 0 || i % 5 === 0 ) {
    //                     res[i].status = 'Blacklisted';
    //                 } else if (i % 6 === 0 || i % 7 === 0 ) {
    //                     res[i].status = 'Inactive';
    //                 } else {
    //                     res[i].status = 'Pending'
    //                 }
    //             }

    //             localStorage.setItem('users', JSON.stringify(res));
    //             // setUsers(res: UserObject[]);
    //             console.log(res);
                
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
            
    //     }

    // }, []);

    return (

        <div className="users">
            <h2>Users</h2>

            <div className="user-stats">
                {userStats.map((stat: Stat) => (
                    <UserStats stat={stat} key={stat.id} />
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
                        <tr>
                            <td>Lendsqr</td>
                            <td>Adedeji</td>
                            <td>Adedeji@Lendsqr.com</td>
                            <td>09039335002</td>
                            <td>May 15, 2020 10:00 AM</td>
                            <td>
                                <div className="Active">
                                    <p>Active</p>
                                </div>
                            </td>
                            <td><MoreVertOutlinedIcon className='options' /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

    )
}

export default Users;