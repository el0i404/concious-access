/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  ADD_USER_MUTATION,
  UPDATE_USER_MUTATION,
} from '../../graphql/mutations';

import Loader from '../Loader/Loader';

import ErrorCaption from '../ErrorMsg/ErrorCaption';

export interface UserDataProps {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  organization: string;
  password: string;
  isVerified?: boolean;
}

export interface ToastMessageProps {
  type?: string;
  message?: string;
}

interface AddUserModalProps {
  initialUserData?: UserDataProps | null; // Optional initial user data for editing
  type?: string;
  onClose: (toastMessage: ToastMessageProps) => void;
}

const AddUserModal = ({
  onClose,
  initialUserData,
  type,
}: AddUserModalProps) => {
  const [userData, setUserData] = useState<UserDataProps>({
    first_name: '',
    last_name: '',
    email: '',
    organization: '',
    password: '',
    ...initialUserData, // If initialUserData is provided, merge it into the state
  });

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Hide Toast message after 3 seconds
  useEffect(() => {
    if (showError) {
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  }, [showError]);

  // Change input values handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Mutation for adding a new user
  const [addUserMutation, { loading: addUserLoading }] =
    useMutation(ADD_USER_MUTATION);

  // Mutation for editing an existing user
  const [updateUserMutation, { loading: editUserLoading }] =
    useMutation(UPDATE_USER_MUTATION);

  // Save or update the user Handler
  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (type === 'edit') {
        // Editing an existing user
        const { first_name, last_name, organization, password, email } =
          userData;
        const { data } = await updateUserMutation({
          variables: {
            updateUserId: initialUserData?.id,
            input: {
              first_name,
              email,
              last_name,
              organization,
              password,
            },
          },
        });
        if (data?.updateUser) {
          onClose({
            type: 'success',
            message: 'User updated successfully.',
          });
        } else {
          onClose({
            type: 'error',
            message: 'Failed to update user.',
          });
        }
      } else {
        // Adding a new user
        const { data } = await addUserMutation({
          variables: {
            input: userData,
          },
        });

        if (data?.createUser) {
          onClose({
            type: 'success',
            message: 'User added successfully.',
          });
        } else {
          onClose({
            type: 'error',
            message: 'Failed to add user.',
          });
        }
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      setShowError(true);

      console.error('Error saving user:', error);
    }
  };

  return (
    <>
      <div className="fixed top-0 inset-0 z-10 left-0 w-full h-full flex justify-center items-center bg-opacity-75 bg-gray-500">
        <div className="bg-white rounded-lg shadow-lg md:w-5/12 w-11/12">
          <h2 className="px-4 pt-4 text-2xl font-bold mb-4">
            {type === 'edit' ? 'Update User' : 'Add User'}
          </h2>

          <hr className="my-4 h-0.5 border-t-0 bg-neutral-300 opacity-100 dark:opacity-50" />

          <form onSubmit={handleSaveUser}>
            {addUserLoading || editUserLoading ? (
              <div className="my-48">
                <Loader />
              </div>
            ) : (
              <>
                <div className="p-4 pt-0">
                  {/* FIRST NAME */}
                  <div className="my-2 sm:col-span-4">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        value={userData.first_name || ''}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* LAST NAME */}
                  <div className="my-2 sm:col-span-4">
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        value={userData.last_name || ''}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="my-2 sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address{' '}
                      {type === 'add' && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={userData.email || ''}
                        required={type === 'add'}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* ORGANIZATION */}
                  <div className="my-2 sm:col-span-4">
                    <label
                      htmlFor="organization"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Organization{' '}
                      {type === 'add' && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    <div className="mt-2">
                      <input
                        id="organization"
                        name="organization"
                        type="text"
                        value={userData.organization || ''}
                        onChange={handleInputChange}
                        required={type === 'add'}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div className="my-2 sm:col-span-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password{' '}
                      {type === 'add' && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={userData.password || ''}
                        onChange={handleInputChange}
                        required={type === 'add'}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 ">
                  <button
                    type="submit"
                    disabled={addUserLoading || editUserLoading}
                    className="flex items-center w-full justify-center 
                              px-3 py-2 text-sm font-semibold 
                              text-white shadow-sm sm:ml-3 
                              sm:w-auto rounded-md 
                              bg-black hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
                  >
                    {type === 'edit' ? 'Update User' : 'Add User'}
                  </button>
                  <button
                    onClick={onClose}
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
      {showError && <ErrorCaption message={errorMessage} />}
    </>
  );
};
export default AddUserModal;
