import '../src/assets/styles/users.scss';
import icon1 from '../src/assets/icons/icon1.svg';
import icon2 from '../src/assets/icons/icon2.svg';
import icon3 from '../src/assets/icons/icon3.svg';
import icon4 from '../src/assets/icons/icon4.svg';
import { Stat } from '../utils/interfaces';
import UserStats from './UserStats';

function Users() {

    // Users stats 
    const userStats: Stat[] = [
        {
            image: icon1,
            title: 'USERS',
            value: '2,453'
        },
        {
            image: icon2,
            title: 'ACTIVE USERS',
            value: '2,453'
        },
        {
            image: icon3,
            title: 'USERS WITH LOANS',
            value: '12,453'
        },
        {
            image: icon4,
            title: 'USERS WITH SAVINGS',
            value: '102,453'
        },
    ]

    return (

        <div className="users">
            <h2>Users</h2>

            <div className="user-stats">
                {userStats.map((stat: Stat) => (
                    <UserStats stat={stat} />
                ))}
            </div>

            <div className="user-info">
                
            </div>

        </div>

    )
}

export default Users;