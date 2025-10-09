/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';
import { useRouter } from 'next/navigation';
import { saveTokenToLocalStorage } from '../utils/auth';

import Image from 'next/image';
import Logo from '../assets/logo-dark.svg';
import ErrorCaption from '../components/ErrorMsg/ErrorCaption';
import Loader from '../components/Loader/Loader';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    }
  }, [errorMessage]);

  const [login] = useMutation(LOGIN_USER);

  const handleLogin = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const { data } = await login({
        variables: {
          email,
          password,
        },
      });
      // Assuming the server returns a data.
      const loginData = data.login;
      // Save the token to local storage or a state management library like Redux.
      // For simplicity, we'll save it in local storage here.
      if (loginData.status === 0) {
        if (loginData.data?.role === 'pass_creator') {
          throw new Error("You don't have permission to signIn.");
        }
        router.push('/dashboard');
        localStorage.setItem('user', JSON.stringify(loginData.data));
        saveTokenToLocalStorage(loginData.data.token);
      }
    } catch (error: any) {
      setIsLoading(false);
      if (error instanceof ApolloError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Invalid credentials. Please try again.');
      }
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
        {isLoading ? (
          <div className="h-screen items-center justify-center flex">
            <Loader />
          </div>
        ) : (
          <>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <Image className="mx-auto" src={Logo} alt="logo" width={100} />

              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                AwarenessPass
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={handleLogin}
                    className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
                  >
                    Sign In
                  </button>
                </div>
              </form>
              {errorMessage && <ErrorCaption message={errorMessage} />}
            </div>
          </>
        )}
      </div>
    </>
  );
}
