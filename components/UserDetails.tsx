import '../src/assets/styles/user-details.scss';
import back from '../src/assets/icons/back.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserObject } from '../utils/interfaces';
import api from '../api/api';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

function UserDetails() {

    // to store all users retrieved from api call in case link is enter into browser directly
    const [users, setUsers] = useState<UserObject[]>([]);
    // const [user, setUser] = useState<UserObject>()

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

    const { id } = useParams<{ id: string }>();
    const foundUser = users.find((user: UserObject) => {
        return user.id === id;
    })
    console.log(foundUser);

    const navigate = useNavigate();

    const goToDashboard = () => {
        navigate('/dashboard', { replace: true })
    }

    return (
        <div className='user-details'>

            <div className="back" onClick={ goToDashboard }>
                <img src={back} alt="previous page icon" />
                <p>Back to Users</p>
            </div>

            <div className="head">
                <h2>User Details</h2>

                <div className="buttons">
                    <button>BLACKLIST USER</button>
                    <button>ACTIVATE USER</button>
                </div>
            </div>

            <div className="basic-info">
                <div className="info">
                    <div className="name-and-avatar">
                        <img src={ foundUser?.profile.avatar } alt="" className="avatar" />
                        <div className="name">
                            <h3>{ foundUser?.profile.firstName } { foundUser?.profile.lastName }</h3>
                            <p>{ foundUser?.accountNumber }</p>
                        </div>
                    </div>

                    <div className="tier">
                        <p>User's Tier</p>

                        <div className="stars">
                            <StarOutlinedIcon className='star' />
                            <StarBorderOutlinedIcon className='star' />
                            <StarBorderOutlinedIcon className='star' />
                        </div>
                    </div>

                    <div className="balance">
                        <h3><span>N</span>200,000.00</h3>
                        <p>{ foundUser?.profile.bvn }/{ foundUser?.orgName }</p>
                    </div>
                </div>

                <div className="links">
                    <div className="link active">
                        <p>General Details</p>
                    </div>
                    <div className="link">
                        <p>Documents</p>
                    </div>
                    <div className="link">
                        <p>Bank Details</p>
                    </div>
                    <div className="link">
                        <p>Loans</p>
                    </div>
                    <div className="link">
                        <p>Savings</p>
                    </div>
                    <div className="link">
                        <p>App and System</p>
                    </div>
                </div>
            </div>

            <div className="additional-info">
                <section>
                    <h4>Personal Information</h4>
                    <div className="data-wrapper">
                        <div className="data">
                            <p>FULL NAME</p>
                            <h5>{ foundUser?.profile.firstName } { foundUser?.profile.lastName }</h5>
                        </div>
                        <div className="data">
                            <p>PHONE NUMBER</p>
                            <h5>{ foundUser?.profile.phoneNumber }</h5>
                        </div>
                        <div className="data">
                            <p>EMAIL ADDRESS</p>
                            <h5>{ foundUser?.email }</h5>
                        </div>
                        <div className="data">
                            <p>BVN</p>
                            <h5>{ foundUser?.profile.bvn }</h5>
                        </div>
                        <div className="data">
                            <p>GENDER</p>
                            <h5>{ foundUser?.profile.gender }</h5>
                        </div>
                        <div className="data">
                            <p>MARITAL STATUS</p>
                            <h5>Married</h5>
                        </div>
                        <div className="data">
                            <p>CHILDREN</p>
                            <h5>NONE</h5>
                        </div>
                        <div className="data">
                            <p>TYPE OF RESIDENCE</p>
                            <h5>Parent's Apartment</h5>
                        </div>
                    </div>
                </section>

                <section>
                    <h4>Education and Employment</h4>
                    <div className="data-wrapper">
                        <div className="data">
                            <p>LEVEL OF EDUCATION</p>
                            <h5>{ foundUser?.education.level }</h5>
                        </div>
                        <div className="data">
                            <p>EMPLOYMENT STATUS</p>
                            <h5>{ foundUser?.education.employmentStatus }</h5>
                        </div>
                        <div className="data">
                            <p>SECTOR OF EMPLOYMENT</p>
                            <h5>{ foundUser?.education.sector }</h5>
                        </div>
                        <div className="data">
                            <p>DURATION OF EMPLOYMENT</p>
                            <h5>{ foundUser?.education.duration }</h5>
                        </div>
                        <div className="data">
                            <p>OFFICE EMAIL</p>
                            <h5>{ foundUser?.email }</h5>
                        </div>
                        <div className="data">
                            <p>MONTHLY INCOME</p>
                            <h5>{ foundUser?.education.monthlyIncome }</h5>
                        </div>
                        <div className="data">
                            <p>LOAN REPAYMENT</p>
                            <h5>{ foundUser?.education.loanRepayment }</h5>
                        </div>
                    </div>
                </section>

                <section>
                    <h4>Socials</h4>
                    <div className="data-wrapper">
                        <div className="data">
                            <p>TWITTER</p>
                            <h5>{ foundUser?.socials.twitter }</h5>
                        </div>
                        <div className="data">
                            <p>FACEBOOK</p>
                            <h5>{ foundUser?.socials.facebook }</h5>
                        </div>
                        <div className="data">
                            <p>INSTAGRAM</p>
                            <h5>{ foundUser?.socials.instagram }</h5>
                        </div>
                    </div>
                </section>

                <section>
                    <h4>Guarantor</h4>
                    <div className="data-wrapper">
                        <div className="data">
                            <p>FULL NAME</p>
                            <h5>{ foundUser?.guarantor.firstName } { foundUser?.guarantor.lastName }</h5>
                        </div>
                        <div className="data">
                            <p>PHONE NUMBER</p>
                            <h5>{ foundUser?.guarantor.phoneNumber }</h5>
                        </div>
                        <div className="data">
                            <p>ADDRESS</p>
                            <h5>{ foundUser?.guarantor.address }</h5>
                        </div>
                        <div className="data">
                            <p>GENDER</p>
                            <h5>{ foundUser?.guarantor.gender }</h5>
                        </div>
                    </div>
                </section>

                <section>
                    <h4></h4>
                    <div className="data-wrapper">
                        <div className="data">
                            <p>FULL NAME</p>
                            <h5>{ foundUser?.guarantor.firstName } { foundUser?.guarantor.lastName }</h5>
                        </div>
                        <div className="data">
                            <p>PHONE NUMBER</p>
                            <h5>{ foundUser?.guarantor.phoneNumber }</h5>
                        </div>
                        <div className="data">
                            <p>ADDRESS</p>
                            <h5>{ foundUser?.guarantor.address }</h5>
                        </div>
                        <div className="data">
                            <p>GENDER</p>
                            <h5>{ foundUser?.guarantor.gender }</h5>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    )
}

export default UserDetails;