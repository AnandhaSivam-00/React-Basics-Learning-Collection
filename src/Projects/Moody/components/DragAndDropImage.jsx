import React, { useState, useCallback } from 'react'
import { Avatar, Button, Tooltip } from 'antd'
import { motion } from 'framer-motion'

import { AvatarDefaultIcon } from '../../../assets/Icons'
import { DeleteBucketIcon, UploadCloudIcon } from '../assets/Icons'
import { auth } from '../../../config/firebaseConfig'

const DragAndDropImage = ({ handleImageUpload, avatarUrl, uploadStatus, setAvatarURL }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, [setIsDragging]);

    const handleDragLeave = useCallback(() => {
        setIsDragging(false);
    }, [setIsDragging]);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        handleImageUpload(e.dataTransfer.files[0]);
        setIsDragging(false);
    }, [handleImageUpload, setIsDragging]);

    const handleDeleteAvatar = useCallback(async () => {
        try {
            // await deleteAvatar(auth.currentUser.uid); 
            setAvatarURL({
                photo_url: "",
                public_id: ""
            });
            console.log('Avatar deleted successfully!');
        }
        catch(error) {
            console.error('Error deleting avatar:', error);
            return;
        }
    }, [setAvatarURL]);

    return (
        <div className='w-[400px] h-[60px] rounded-sm flex flex-row justify-between items-center'>
            <Tooltip title="Drag and Drop to upload a Image" placement="bottom">
            <label
                className={`w-1/2 px-2 py-3 cursor-pointer rounded-sm ${isDragging
                        ? 'border-2 border-dashed border-black bg-gray-300'
                        : 'border-2 border-dashed border-gray-900 bg-gray-200 hover:bg-gray-300'
                    }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="flex flex-row justify-center items-center gap-2">
                    <UploadCloudIcon width={30} height={30} />
                    <span className='text-xs text-gray-700'>Upload your Avatar</span>
                </div>
                <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                />
            </label>
            </Tooltip>
            <div className='mx-2'>
                <div className='flex flex-row justify-center items-center gap-2'>
                    {uploadStatus ? (
                        <div class="spinner-border spinner-border-sm text-warning" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        <Tooltip title="Delete Avatar" placement="bottom">
                            <Button
                                type='text'
                                className='p-1'
                                danger
                                onClick={handleDeleteAvatar}
                            >
                                <DeleteBucketIcon width={30} height={30} />
                            </Button>
                        </Tooltip>
                    )}
                    {avatarUrl ? (
                        <motion.div
                            whileHover={{
                                scale: 1.8,
                                transition: {
                                    duration: 0.2,
                                    type: 'spring',
                                    stiffness: 100,
                                    damping: 10,
                                }
                            }}
                        >
                            <Avatar
                                src={avatarUrl}
                                size={62}
                                alt='Uploaded Avatar'
                                style={{ border: '1px solid #FFDE00' }}
                                className='shadow-sm'
                            />
                        </motion.div>
                    ) : (
                        <Avatar
                            size={62}
                            icon={<AvatarDefaultIcon width={40} height={40} />}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default React.memo(DragAndDropImage);