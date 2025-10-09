'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from '../utils/auth';
import NavBar from '../components/Navbar/Navbar';
import { LOGOUT_USER } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import UserList from '../components/UserList/UserList';
import Loader from '../components/Loader/Loader';

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [logoutUser] = useMutation(LOGOUT_USER);

  useEffect(() => {
    // Check if the user is logged in (token present in localStorage)
    const token = getTokenFromLocalStorage();
    if (!token) {
      // If no token, redirect to the login page
      router.push('/login');
    }
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      // Call the logout mutation to log the user out on the server
      await logoutUser();

      // Remove the token from localStorage
      removeTokenFromLocalStorage();

      // Redirect to the login page after logout
      router.push('/login');
    } catch (error) {
      setIsLoading(false);
      console.error('Logout failed', error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="h-screen items-center justify-center flex">
          <Loader />
        </div>
      ) : (
        <>
          <NavBar onLogout={handleLogout} />
          <UserList />
        </>
      )}
    </div>
  );
};

export default DashboardPage;
