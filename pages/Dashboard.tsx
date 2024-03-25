import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Users from '../components/Users';
import UserDetails from '../components/UserDetails';
import Navbar from '../components/Navbar';
import SideMenu from '../components/SideMenu';
import '../src/assets/styles/dashboard.scss';
// import { Search, NotificationsNoneOutlined, ArrowDropDown, Menu, CloseOutlined } from '@mui/icons-material';


function Dashboard() {

    const [navIsOpen, setNavIsOpen] = useState<boolean>(false);

    function toggleNav() {
        if (navIsOpen) {
            setNavIsOpen(false);
        } else {
            setNavIsOpen(true);
        }
    }

    const normalClass = 'side-menu'
    const conditionalClass = navIsOpen? 'show-nav': 'none';

    return (
        <div className="main">

            <div className="header">
                <Navbar navIsOpen={navIsOpen} toggleNav={toggleNav} />
            </div>

            <div className="row">
                <aside className={`${normalClass} ${conditionalClass}`}>
                    <SideMenu />
                </aside>

                <div className="routes">
                    <Routes>
                        <Route path="/" element={<Users />}  />
                        <Route path="/users/:id" element={<UserDetails />}  />
                    </Routes>
                </div>
            </div>

        </div>
    )
}

export default Dashboard;