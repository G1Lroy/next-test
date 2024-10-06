'use client'

import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

export default function Navbar() {

  const { logout, isLoading } = useAuth();
  const pathname = usePathname();
  const isPaymentsPage = pathname === '/payments';
  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">NextApp</a>
        <div className="d-flex">
          {isPaymentsPage &&
            <button disabled={isLoading} className="btn btn-outline-danger" onClick={logout}>
              {isLoading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                "Logout"
              )}
            </button>
          }
        </div>
      </div>
    </nav>

  );
}
