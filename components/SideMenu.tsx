import '../src/assets/styles/side-menu.scss';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import briefcase from '../src/assets/icons/briefcase.svg';
import home from '../src/assets/icons/home.svg';
import userFriends from '../src/assets/icons/user-friends.svg';
import users from '../src/assets/icons/users.svg';
import sack from '../src/assets/icons/sack.svg';
import handshakeRegular from '../src/assets/icons/handshake-regular.svg';
import piggyBank from '../src/assets/icons/piggy-bank.svg';
import handSack from '../src/assets/icons/hand-sack.svg';
import userCheck from '../src/assets/icons/user-check.svg';
import userTimes from '../src/assets/icons/user-times.svg';
import bank from '../src/assets/icons/bank.svg';
import coins from '../src/assets/icons/coins.svg';
import transactions from '../src/assets/icons/transactions.svg';
import services from '../src/assets/icons/services.svg';
import userCog from '../src/assets/icons/user-cog.svg';
import scroll from '../src/assets/icons/scroll.svg';
import chartBar from '../src/assets/icons/chart-bar.svg';
import preference from '../src/assets/icons/preference.svg';
import badgePercentage from '../src/assets/icons/badge-percent.svg';
import clipboardList from '../src/assets/icons/clipboard-list.svg';
import signOut from '../src/assets/icons/sign-out.svg';
import { useNavigate } from 'react-router-dom';


function SideMenu() {

    const navigate = useNavigate();
    const logOut = (): void => {
        navigate('/login', { replace: true })
    }

    return (
        <div className='aside'>

            <div className="link">
                <img src={briefcase} alt="briefcase" />
                <p className='switch'>Switch Organization</p>
                <KeyboardArrowDownOutlinedIcon className='dropdown-icon' />
            </div>

            <div className="link">
                <img src={home} alt="home" />
                <p className='inactive'>Dashboard</p>
            </div>

            {/* customers section  */}
            <h4>CUSTOMERS</h4>

            <div className="link active">
                <img src={userFriends} alt="user friends" />
                <p className='inactive'>Users</p>
            </div>

            <div className="link">
                <img src={users} alt="users" />
                <p className='inactive'>Guarantors</p>
            </div>

            <div className="link">
                <img src={sack} alt="sack" />
                <p className='inactive'>Loans</p>
            </div>

            <div className="link">
                <img src={handshakeRegular} alt="handshake" />
                <p className='inactive'>Decision Models</p>
            </div>

            <div className="link">
                <img src={piggyBank} alt="piggy bank" />
                <p className='inactive'>Savings</p>
            </div>

            <div className="link">
                <img src={handSack} alt="hand sack" />
                <p className='inactive'>Loan Requests</p>
            </div>

            <div className="link">
                <img src={userCheck} alt="user check" />
                <p className='inactive'>Whitelist</p>
            </div>

            <div className="link">
                <img src={userTimes} alt="user times" />
                <p className='inactive'>Karma</p>
            </div>

            {/* businesses section  */}

            <h4>BUSINESSES</h4>

            <div className="link">
                <img src={briefcase} alt="briefcase" />
                <p className='inactive'>Organization</p>
            </div>

            <div className="link">
                <img src={handSack} alt="hand sack" />
                <p className='inactive'>Loan Products</p>
            </div>

            <div className="link">
                <img src={bank} alt="bank" />
                <p className='inactive'>Savings Products</p>
            </div>

            <div className="link">
                <img src={coins} alt="coins" />
                <p className='inactive'>Fees and Charges</p>
            </div>

            <div className="link">
                <img src={transactions} alt="transactions" />
                <p className='inactive'>Transactions</p>
            </div>

            <div className="link">
                <img src={services} alt="services" />
                <p className='inactive'>Services</p>
            </div>

            <div className="link">
                <img src={userCog} alt="user cog" />
                <p className='inactive'>Service Account</p>
            </div>

            <div className="link">
                <img src={scroll} alt="scroll" />
                <p className='inactive'>Settlements</p>
            </div>

            <div className="link">
                <img src={chartBar} alt="chart bar" />
                <p className='inactive'>Reports</p>
            </div>

            {/* settings section  */}

            <h4>SETTINGS</h4>

            <div className="link">
                <img src={preference} alt="preference image" />
                <p className='inactive'>Preferences</p>
            </div>

            <div className="link">
                <img src={badgePercentage} alt="badge percentage" />
                <p className='inactive'>Fees and Pricing</p>
            </div>

            <div className="link">
                <img src={clipboardList} alt="clipboard list" />
                <p className='inactive'>Audit Logs</p>
            </div>

            <div className="link" onClick={logOut} >
                <img src={signOut} alt="signout icon" />
                <p className="inactive">Logout</p>
            </div>

            <p className='version'>v1.2.0</p>

        </div>
    )
}

export default SideMenu;