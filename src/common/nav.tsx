import { useNavigate } from "react-router-dom";
import authProvider from "../provider/auth-provider";

function Nav() {
    const navigate = useNavigate();
    function logout() {
        authProvider.logout();
        navigate('/login');
    }
    return (
        <div className="topNav">
            <h1>{authProvider.getUserName()}</h1>
            <button onClick={() => logout()}>Logout</button>
        </div>
    );
}

export default Nav;