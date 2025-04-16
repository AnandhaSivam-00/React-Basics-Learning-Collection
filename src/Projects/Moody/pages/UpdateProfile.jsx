import React, { 
    lazy, 
    useEffect, 
    useState, 
    Suspense, 
    useMemo,
    useCallback,
    memo
} from 'react'
import crypto from 'crypto-js'
import {
    Form,
    useLoaderData,
    useOutletContext,
    Await,
    useActionData,
    useNavigation
} from 'react-router-dom'
import { Modal, message } from 'antd'

import {
    deleteUserAccountParmanent,
    updateUserProfileData,
    getUserData
} from '../dataFetchFunctions'

import '../styles.css'
import { auth } from '../../../config/firebaseConfig'
import { requireFirebaseAuth } from '../requireFirebaseAuth'

const DragAndDropImage = lazy(() => import('../components/DragAndDropImage'))

export const moodyUpdateProfileLoader = async ({ request }) => {
    await requireFirebaseAuth(request);
    
    return {
        data: getUserData(auth.currentUser.uid)
    }
}

export const moodyUpdateProfileAction = async ({ request }) => {
    const userData = await request.formData();

    const name = userData.get('name');
    const phoneNumber = userData.get('phone_number').toString();
    const photoURL = userData.get('photoURL');
    const photoPublicID = userData.get('photoPublicID');

    try {
        const response = await updateUserProfileData({
            name,
            phoneNumber,
            photoURL,
            photoPublicID
        });

        if (!response.success) {
            throw new Error(response.message);
        }
        message.success(response.message);

        return {
            success: true,
            message: 'User profile updated successfully',
            updatedData: {
                name,
                phoneNumber,
                photoURL,
                photoPublicID
            }
        }
    }
    catch (error) {
        console.log('Error updating user profile:', error);
        return {
            success: false,
            message: 'Error updating user profile. Please try again.',
            code: error.code
        }
    }
}

const UpdateProfile = () => {
    const { userData, setUserData } = useOutletContext();
    const navigation = useNavigation();

    const [isUploading, setIsUploading] = useState(false);

    const [avatarURL, setAvatarURL] = useState({
        photo_url: "",
        public_id: ""
    });

    const { data } = useLoaderData();
    const actionData = useActionData();

    useEffect(() => {
        if(!avatarURL.photo_url || avatarURL?.photo_url.length <= 0) {
            setAvatarURL({
                photo_url: userData?.photoURL || '',
                public_id: userData?.data?.photo_public_id || ''
            });
        }
        
        // if(data) {
        //     setUserData(prevData => ({
        //         ...prevData,
        //         data
        //     }));
        // }
    }, [userData?.photoURL, userData?.displayName, data?.phone_number, setUserData]);
    
    useEffect(() => {
        if (actionData?.success) {
            setUserData(prevData => ({
                ...prevData,
                displayName: actionData.updatedData.name,
                photoURL: actionData.updatedData.photoURL,
                data: {
                    ...prevData.data,
                    phone_number: actionData.updatedData.phoneNumber,
                    photo_public_id: actionData.updatedData.photoPublicID || prevData.data?.photo_public_id
                },
            }));
        }
    }, [actionData, setUserData]);

    const handleDeleteUser = useCallback(async () => {
        Modal.confirm({
            title: 'Action confirmation needed',
            content: `Are you sure you want to delete the 
                ${userData.displayName || userData.email}'s account permanently`,
            className: 'delete-confirmation-modal',
            okText: 'Delete',
            cancelText: 'Cancel',
            onOk: async () => {
                message.open({
                    key: 'updatable',
                    type: 'loading',
                    content: 'Loading...'
                })

                const processData = await deleteUserAccountParmanent(userData.uid, userData.data.photo_public_id);

                if (processData.success) {
                    message.open({
                        key: 'updatable',
                        type: 'success',
                        content: 'Account deleted'
                    })
                    setUserData(null);
                    Modal.destroyAll();

                    window.location.reload();
                }
                else {
                    Modal.error({
                        title: "Deletion fail",
                        content: "There was an error during deleting the account. Please try again.",
                    });
                }
            }
        })
    }, [userData, setUserData]);

    const handleImageUpload = useCallback(async (file) => {
        setIsUploading(true);

        if (!file) return;

        const timestamp = Math.round(new Date().getTime() / 1000);
        const folder = 'avatars';

        try {
            const paramsToSign = `folder=${folder}&timestamp=${timestamp}${import.meta.env.VITE_CLOUDINARY_API_SECRET_KEY}`;
            const signature = crypto.SHA1(paramsToSign).toString();

            const formData = new FormData();
            formData.append('file', file);
            formData.append('timestamp', timestamp);
            formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);
            formData.append('signature', signature);
            formData.append('folder', folder);

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            const data = await response.json();

            if(data.error) {
                throw new Error(data.error.message);
            }
            setAvatarURL({
                photo_url: data.secure_url,
                public_id: data.public_id
            });

            message.success('Avatar uploaded successfully!');

            console.log(data);
        }
        catch (error) {
            console.error('Error uploading image:', error);
            message.error('Failed to upload avatar. Please try again.');
            return null;
        }
        finally {
            setIsUploading(false);
        }
    }, []);

    return (
        <section 
            className='m-2 p-2 moody-login-container'
        >
            <div style={{ width: '400px', margin: '0 auto'  }}>
                <h1 className='text-center'>Update Profile</h1>
                <Suspense fallback={
                  <div className='text-center text-secondary my-5'>
                    <span className='moody-loading-text-style'>Loading my Mood...</span>
                  </div>
                }>
                    <Await resolve={data}>
                        {(data) => {
                            return (
                                <Form
                                    method='post'
                                    className='d-flex flex-column gap-3 mt-4'
                                >
                                    <input
                                        type='text'
                                        name='name'
                                        defaultValue={userData?.displayName || ''}
                                        placeholder='Name (required)'
                                        id='name'
                                        className='form-control box-border'
                                        required
                                    />
                                    <input
                                        type='email'
                                        name='email'
                                        defaultValue={userData?.email || ''}
                                        placeholder='email'
                                        id='email'
                                        className='form-control box-border'
                                        disabled={true}
                                    />
                                    <input
                                        type='number'
                                        name='phone_number'
                                        defaultValue={data?.phone_number || ''}
                                        placeholder='Phone Number (required)'
                                        id='phone_number'
                                        className='form-control box-border'
                                        required
                                    />
                                    {/* <input
                                        type='file'
                                        placeholder='Photo URL'
                                        className='form-control form-control-lg box-border text-sm'
                                        onChange={(e) => handleImageUpload(e.target.files[0])}
                                    /> */}
                                    <div className=''>
                                        <DragAndDropImage 
                                            handleImageUpload={handleImageUpload} 
                                            avatarUrl={avatarURL.photo_url}
                                            uploadStatus={isUploading} 
                                            setAvatarURL={setAvatarURL}
                                        />
                                    </div>
                                    <input
                                        type='hidden'
                                        name='photoURL'
                                        id='photoURL'
                                        defaultValue={avatarURL?.photo_url}
                                        readOnly={true}
                                    />
                                    <input
                                        type='hidden'
                                        name='photoPublicID'
                                        id='photoPublicID'
                                        defaultValue={avatarURL?.public_id}
                                        readOnly={true}
                                    />
                                    <div className='d-flex justify-content-center align-items-center mt-3'>
                                        <button
                                            type='submit'
                                            className='btn moody-primary-btn box-border mt-3'
                                            disabled={navigation.state === 'submitting'}
                                        >
                                            {navigation.state === 'submitting' ? 'Updating...' : 'Update Profile'}
                                        </button>
                                    </div>
                                    <div className='d-flex justify-content-center align-items-center mt-3'>
                                        <button
                                            type='button'
                                            className='btn moody-secondary-btn box-border rounded w-100'
                                            onClick={handleDeleteUser}
                                            disabled={navigation.state === 'submitting'}
                                        >
                                            Delete Account
                                        </button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Await>
                </Suspense>
            </div>
        </section>
    )
}

export default React.memo(UpdateProfile);