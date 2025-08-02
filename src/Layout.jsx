import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="page">
            <div className="header">
                <div>
                    <p>Fish Forum</p>
                </div>                
                <Link to="/">
                    <p>Home</p>
                </Link>
                <Link to="/form">
                    <p>Create New Post</p>
                </Link>
            </div>
            <div className="mainContent">
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout;