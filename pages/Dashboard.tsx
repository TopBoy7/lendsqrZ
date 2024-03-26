import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Users from '../components/Users';
import UserDetails from '../components/UserDetails';
import Navbar from '../components/Navbar';
import SideMenu from '../components/SideMenu';
import '../src/assets/styles/dashboard.scss';


function Dashboard() {

    const [navIsOpen, setNavIsOpen] = useState<boolean>(false);

    function toggleNav() {
        if (navIsOpen) {
            setNavIsOpen(false);
        } else {
            setNavIsOpen(true);
        }
    }

    const normalAsideClass = 'side-menu'
    const conditionalAsideClass = navIsOpen? 'show-nav': '';

    const normalRowClass = 'row';
    const conditionalRowClass = navIsOpen? 'no-wrap': '';

    return (
        <div className="main">

            <div className="header">
                <Navbar navIsOpen={navIsOpen} toggleNav={toggleNav} />
            </div>

            <div className={`${normalRowClass} ${conditionalRowClass}`}>
                <div className="aside-wrapper" onClick={ toggleNav } >
                    <aside className={`${normalAsideClass} ${conditionalAsideClass}`}>
                        <SideMenu />
                    </aside>
                </div>

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