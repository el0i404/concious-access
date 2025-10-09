'use client';

import { FC, useEffect, useState } from 'react';
import Image from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import Logo from '../../assets/logo.svg';

interface NavBarProps {
  onLogout: () => void;
}

interface UserProps {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

const NavBar: FC<NavBarProps> = ({ onLogout }) => {
  const [user, setUser] = useState<UserProps | null>(null);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user') || '{}'));
  }, []);

  return (
    <nav className="bg-black p-4 w-full">
      <div className="flex items-center justify-between">
        <div className="flex justify-center items-center text-white">
          <div className="pr-2">
            <Image src={Logo} alt="logo" />
          </div>
          AwarenessPass
        </div>
        {user?.email && (
          <div className="flex text-white items-center justify-between">
            <div className="mx-5">
              Welcome, {user?.first_name || user?.email}
            </div>
            <button
              className="flex items-center bg-transparent text-white border border-white rounded px-2 py-1"
              onClick={onLogout}
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              <div className="ml-1">Logout</div>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
