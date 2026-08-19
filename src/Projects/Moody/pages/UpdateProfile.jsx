import { 
    lazy, 
    useEffect, 
    useState, 
    Suspense, 
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

import { deleteUserAccountParmanent } from '../dataFetchFunctions'
import '../styles.css'

const DragAndDropImage = lazy(() => import('../components/DragAndDropImage'))
import TextRevealAnimation from '../components/TextRevealAnimation'
import PageTransition from '../components/PageTransition'

const UpdateProfile = () => {
    const { userData, setUserData } = useOutletContext();
    const navigation = useNavigation();

    const [isUploading, setIsUploading] = useState(false);

    const [avatarURL, setAvatarURL] = useState(() => ({
        photo_url: userData?.photoURL || '',
        public_id: userData?.data?.photo_public_id || ''
    }));

    const { data } = useLoaderData();
    const actionData = useActionData();

    useEffect(() => {
        if(actionData?.success) {
            message.success(actionData.message);
            if(setUserData) {
                setUserData(prevData => ({
                    ...prevData,
                    displayName: actionData.updatedData.name,
                    photoURL: actionData.updatedData.photoURL,
                    data: {
                        ...prevData?.data,
                        phone_number: actionData.updatedData.phoneNumber,
                        photo_public_id: actionData.updatedData.photoPublicID || prevData?.data?.photo_public_id
                    },
                }));
            }
        } 
        else if(actionData?.message && !actionData.success) {
            message.error(actionData.message);
        }
    }, [actionData, setUserData]);

    const handleDeleteUser = useCallback(async () => {
        const userDisplayName = userData?.displayName || userData?.email || 'User';

        Modal.confirm({
            title: 'Action confirmation needed',
            content: `Are you sure you want to permanently delete ${userDisplayName}'s account?`,
            className: 'delete-confirmation-modal',
            okText: 'Delete Account',
            cancelText: 'Cancel',
            onOk: async () => {
                message.open({
                    key: 'updatable',
                    type: 'loading',
                    content: 'Deleting account...'
                });

                const processData = await deleteUserAccountParmanent(userData?.uid);

                if(processData.success) {
                    message.open({
                        key: 'updatable',
                        type: 'success',
                        content: 'Account deleted permanently.'
                    });
                    if(setUserData) {
                        setUserData(null);
                    }
                    Modal.destroyAll();
                    window.location.reload();
                }
                else {
                    Modal.error({
                        title: "Deletion Failed",
                        content: "There was an error while deleting the account. Please try again.",
                    });
                }
            }
        });
    }, [userData, setUserData]);

    const handleImageUpload = useCallback(async (file) => {
        if(!file) return;

        setIsUploading(true);

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

            const uploadResult = await response.json();

            if (uploadResult.error) {
                throw new Error(uploadResult.error.message);
            }

            setAvatarURL({
                photo_url: uploadResult.secure_url || uploadResult.url,
                public_id: uploadResult.public_id
            });

            message.success('Avatar uploaded successfully!');
        }
        catch(error) {
            console.error('Error uploading image:', error);
            message.error(error.message || 'Failed to upload avatar. Please try again.');
        }
        finally {
            setIsUploading(false);
        }
    }, []);

    const isSubmitting = navigation.state === 'submitting';

    return (
        <PageTransition>
            <section 
                className='m-2 p-2 moody-login-container'
            >
                <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                    <h1 className='text-center'>
                        <TextRevealAnimation text='Update Profile' />
                    </h1>
                    <Suspense fallback={
                        <div className='text-center text-secondary my-5'>
                            <span className='moody-loading-text-style'>Loading Profile Data...</span>
                        </div>
                    }>
                        <Await resolve={data}>
                            {(resolvedData) => {
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
                                            placeholder='Email'
                                            id='email'
                                            className='form-control box-border'
                                            disabled={true}
                                        />
                                        <input
                                            type='tel'
                                            name='phone_number'
                                            defaultValue={resolvedData?.phone_number || ''}
                                            placeholder='Phone Number (required)'
                                            id='phone_number'
                                            className='form-control box-border'
                                            required
                                        />
                                        <div className='w-100'>
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
                                            value={avatarURL.photo_url}
                                            readOnly
                                        />
                                        <input
                                            type='hidden'
                                            name='photoPublicID'
                                            id='photoPublicID'
                                            value={avatarURL.public_id}
                                            readOnly
                                        />
                                        <div className='d-flex justify-content-center align-items-center mt-3'>
                                            <button
                                                type='submit'
                                                className='btn moody-primary-btn box-border mt-3'
                                                disabled={isSubmitting || isUploading}
                                            >
                                                {isSubmitting ? 'Updating...' : 'Update Profile'}
                                            </button>
                                        </div>
                                        <div className='d-flex justify-content-center align-items-center mt-3'>
                                            <button
                                                type='button'
                                                className='btn moody-secondary-btn box-border rounded w-100'
                                                onClick={handleDeleteUser}
                                                disabled={isSubmitting}
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
        </PageTransition>
    )
}

export default memo(UpdateProfile);