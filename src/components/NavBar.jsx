import { useUser } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  return (
    <nav className="bg-green-500 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">COUNTRY EXPLORER</Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm">👤 {user.username}</span>
              <button onClick={() => { logout(); navigate('/'); }} className="hover:underline text-sm">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:underline text-sm">LOGIN</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;