import icon1 from '../src/assets/icons/icon1.svg';
import icon2 from '../src/assets/icons/icon2.svg';
import icon3 from '../src/assets/icons/icon3.svg';
import icon4 from '../src/assets/icons/icon4.svg';
import { Stat } from '../utils/interfaces';

export const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional: smooth scrolling animation
    });
};

// Users stats 
export const userStats: Stat[] = [
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

export const tableHeaders = [ 'organization', 'username', 'email', 'phone number', 'date joined', 'status' ]

export const emptyForm = {
    organization: '',
    username: '',
    email: '',
    date: '',
    phoneNumber: '',
    status: ''
}