'use client'

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout()
    router.replace('/');
  };


  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">NextApp</a>
        <div className="d-flex">
          {isLoggedIn &&
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          }
        </div>
      </div>
    </nav>

  );
}
