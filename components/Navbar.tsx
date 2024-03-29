import logo from '../src/assets/images/logo.svg';
import userImg from '../src/assets/images/user-image.png';
import '../src/assets/styles/navbar.scss';
import { Search, NotificationsNoneOutlined, ArrowDropDown, Menu, CloseOutlined } from '@mui/icons-material';

function Navbar(props: {navIsOpen: boolean, toggleNav:() => void}) {


    return (
        <nav data-testid='navbar'>
            <div className="logo-div">
                <img src={logo} alt="company logo" className='desktop' />
                <div className="mid mobile">
                    <Menu onClick={props.toggleNav} style={{display: !props.navIsOpen? 'block': 'none'}} />
                    <CloseOutlined  onClick={props.toggleNav} style={{display: props.navIsOpen? 'block': 'none'}} />
                </div>
            </div>

            <div className="search-div">
                <div className="search desktop">
                    <input type="text" placeholder='Search for anything' />
                    <button><Search /></button>
                </div>
                <img src={logo} alt="company logo" className='mid mobile' />
            </div>

            <div className="nav-right">
                <div className="user-items">
                    <p>Docs</p>
                    <NotificationsNoneOutlined className='notifications' />
                    <img src={userImg} alt="user image" className="user-img" />
                    <div className="username">
                        <h5>Adedeji</h5>
                        <ArrowDropDown />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;