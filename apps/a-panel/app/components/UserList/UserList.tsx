'use client';

import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useQuery, useMutation, ApolloError } from '@apollo/client';
import { USER_LIST_QUERY } from '../../graphql/queries';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import Loader from '../Loader/Loader';
import ErrorCaption from '../ErrorMsg/ErrorCaption';
import SuccessCaption from '../SuccessMsg/SuccessCaption';

import DialogModal from '../Modal/DialogModal';

import AddUserModal, {
  ToastMessageProps,
  UserDataProps,
} from '../User/AddEditUser';
import { DELETE_USER_MUTATION } from '../../graphql/mutations';

const UserList: FC = () => {
  const router = useRouter();

  const [type, setType] = useState<string>('add');
  const [selectedUser, setSelectedUser] = useState<UserDataProps | null>(null);
  const [userToDelete, setUserToDelete] = useState<UserDataProps | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Fetch users
  const {
    loading,
    error: errorUserListing,
    data,
    refetch,
  } = useQuery(USER_LIST_QUERY);

  // Check if token is not expired.
  useEffect(() => {
    if (errorUserListing?.graphQLErrors[0].extensions?.code === '401') {
      router.push('/');
    }
  }, [errorUserListing, router]);

  // Hide Toast message after 3 seconds
  useEffect(() => {
    if (showError || showSuccess) {
      setTimeout(() => {
        setShowError(false);
        setShowSuccess(false);
      }, 3000);
    }
  }, [showError, showSuccess]);

  const [deleteUser, { loading: deleteLoading }] =
    useMutation(DELETE_USER_MUTATION);

  // Add user handler
  const handleAddUser = () => {
    setType('add');
    setIsModalOpen(true);
  };

  // Close user add/edit modal handler
  const handleCloseModal = (toastMessage: ToastMessageProps) => {
    // Show error message
    if (toastMessage?.type === 'error' && toastMessage?.message) {
      setShowError(true);
      setErrorMessage(toastMessage?.message);
    } else if (toastMessage?.type === 'success' && toastMessage.message) {
      setShowSuccess(true);
      setSuccessMessage(toastMessage?.message);
    }
    setIsModalOpen(false);
    setSelectedUser(null); // Clear selectedUser when closing the modal
    refetch();
  };

  // Edit user handler
  const handleEditUser = (user: UserDataProps, type: string) => {
    setSelectedUser(user);
    setType(type);
    setIsModalOpen(true);
  };

  // Delete user Handler
  const handleDeleteUser = async (user: UserDataProps) => {
    try {
      const userId = user.id;
      const { data } = await deleteUser({
        variables: {
          id: userId,
        },
      });

      if (data?.deleteUser) {
        setSuccessMessage('User deleted successfully.');
        setShowSuccess(true);
      } else {
        setErrorMessage('Failed to delete user.');
        setShowError(true);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMessage(error.message);
      setShowError(true);
      console.error('Error deleting user:', error);
    } finally {
      refetch();
    }
  };

  // Function to show the confirmation popup
  const showDeleteConfirmation = (user: UserDataProps) => {
    setUserToDelete(user);
    setShowConfirmation(true);
  };

  // Function to handle user confirmation or cancel
  const handleConfirmation = (confirm: boolean) => {
    if (confirm && userToDelete) {
      handleDeleteUser(userToDelete);
    }

    setShowConfirmation(false);
    setUserToDelete(null);
  };

  return (
    <div className="container mx-auto mt-8 p-10">
      {loading || deleteLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-center mb-4">
            <h1 className="text-3xl font-bold">User List</h1>
            <button
              className="flex items-center ml-auto px-4 py-2 bg-black text-white rounded"
              onClick={handleAddUser}
            >
              <FontAwesomeIcon icon={faPlus} />
              <div className="ml-1">Add User</div>
            </button>
          </div>
          <div className="overflow-x-auto">
            {data?.getUsers.length ? (
              <table className="w-full table-auto">
                <thead>
                  <tr className="border">
                    <th className="px-4 py-2 border-r">First Name</th>
                    <th className="px-4 py-2 border-r">Last Name</th>
                    <th className="px-4 py-2 border-r">Is Verified</th>
                    <th className="px-4 py-2 border-r">Email</th>
                    <th className="px-4 py-2 border-r">Organization</th>
                    <th className="px-4 py-2 border-r">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.getUsers.map((user: UserDataProps, index: number) => (
                    <tr
                      key={index}
                      className={user.isVerified ? 'bg-green-100' : 'bg-white'}
                    >
                      <td className="border px-4 py-2">{user.first_name}</td>
                      <td className="border px-4 py-2">{user.last_name}</td>
                      <td className="border px-4 py-2">
                        {user.isVerified ? 'Yes' : 'No'}
                      </td>
                      <td className="border px-4 py-2">{user.email}</td>
                      <td className="border px-4 py-2">{user.organization}</td>
                      <td className="border px-4 py-2 flex justify-evenly items-center">
                        <button
                          onClick={() => handleEditUser(user, 'edit')}
                          className="flex items-center px-2 py-1 bg-blue-600 hover:bg-blue-500 sm:w-auto text-white rounded-md font-semibold"
                        >
                          <FontAwesomeIcon size="sm" icon={faPen} />
                          <div className="ml-2">Edit</div>
                        </button>
                        <button
                          onClick={() => showDeleteConfirmation(user)}
                          className="flex items-center ml-2 px-2 py-1 rounded-md bg-red-600 font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        >
                          <FontAwesomeIcon size="sm" icon={faTrash} />
                          <div className="ml-2">Delete</div>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h1 className="text-center m-16 text-4xl">
                {' '}
                Users Not available.
              </h1>
            )}
          </div>
        </>
      )}

      {/* Show Error and Success Toast Msgs */}
      {showSuccess && <SuccessCaption message={successMessage} />}
      {showError && <ErrorCaption message={errorMessage} />}

      {/* User Modal For Add/Edit User */}
      {isModalOpen && (
        <AddUserModal
          onClose={handleCloseModal}
          initialUserData={selectedUser} // Pass the selected user data for editing
          type={type}
        />
      )}

      {/* DELETE Confirmation popup */}
      {showConfirmation && (
        <DialogModal
          isOpen={showConfirmation}
          handleConfirmation={handleConfirmation}
        />
      )}
    </div>
  );
};

export default UserList;
