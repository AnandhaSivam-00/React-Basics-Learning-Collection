import {
    app,
    db,
    auth
} from '../../config/firebaseConfig';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    deleteUser,
    updateProfile
} from 'firebase/auth';
import {
    collection,
    addDoc,
    setDoc,
    doc,
    updateDoc,
    getDoc,
    getDocs,
    deleteDoc,
    serverTimestamp,
    query,
    where,
    orderBy,
} from 'firebase/firestore/lite';

export const getUserData = async (id) => {
    try {
        const userRef = doc(db, 'Moody', 'moody-users-data', 'Users', id);
        const userSnapshot = await getDoc(userRef);

        if(userSnapshot.exists()) {
            return userSnapshot.data();
        } 
        else {
            console.log('No such document!');
            return null;
        }
    }
    catch(error) {
        console.error('Error fetching user data:', error);
        return;
    }
}

export const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
        .then(async (result) => {
            console.log('Google login successful:', result.user.uid);

            //await addNewUserData(result.user.uid);

            return {
                success: true,
                message: 'Google login successful!',
                credential: result.credential
            }
        })
        .catch((error) => {
            console.error('Error during Google login:', error);
            return {
                success: false,
                message: 'Google login failed. Please try again!',
                error: error.message
            }
        })
}

export const loginAuthProvider = async ({ email, password }) => {
    try {
        //setPersistence(auth, browserLocalPersistence)
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        return {
            success: true,
            message: 'Login successful',
            credential: userCredential
        }
    }
    catch (error) {
        // console.error('Error during login:', error);
        return {
            success: false,
            code: error.code,
            message: 'Login failed. Please check your credentials!',
            credential: null
        }
    }
}

export const createNewUserProvider = async ({ email, password }) => {
    try {
        //setPersistence(auth, browserLocalPersistence)
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        const userRef = doc(db, 'Moody', 'moody-users-data', 'Users', userCredential.user.uid);
        await setDoc(userRef, {
            user_id: userCredential.user.uid,
            user_name: "",
            phone_number: "",
            email: email,
            created_at: new Date(),
            updated_at: new Date(),
        })

        return {
            success: true,
            message: 'User created successfully',
            credential: userCredential
        }
    }
    catch(error) {
        console.error('Error during user creation:', error);
        return {
            success: false,
            message: 'User creation failed. Please try again!',
            error: error.message
        }
    }
}

export const handleLoggedOut = () => {
    signOut(auth).then(() => {
      console.log('User signed out successfully!');
    }).catch((error) => {
      console.error('Error signing out user:', error);
    });
}

export const isUserloggedIn = () => {
    try {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                return user;
            }
            else {
                console.log('No user is logged in');
                return false;
            }
        })
    }
    catch (error) {
        console.error('Error checking user login status:', error);
        return false;
    }
}

export const deleteUserAccountParmanent = async (id, photo_public_id) => {
    const user = auth.currentUser;

    try {
        await deleteUser(user)

        await deleteDoc(doc(db, 'Moody', 'moody-users-data', 'Users', id))

        return {
            success: true,
            message: 'User account deleted permanently deleted from the database'
        }
    }
    catch (error) {
        console.error('Error occured during delete the user account from the database');
        return {
            success: false,
            message: 'Try again...',
            code: error.code
        }
    }
}

export const deleteAvatar = async (id) => {
    try {
        const userRef = doc(db, 'Moody', 'moody-users-data', 'Users', id);

        await updateProfile(auth.currentUser, {
            photoURL: ""
        });

        await updateDoc(userRef, {
            photo_public_id: "",
        })

        console.log('Avatar deleted successfully!');
        return {
            success: true,
            message: 'Avatar deleted successfully!'
        }
    }
    catch(error) {
        console.error('Error deleting avatar:', error);
        return {
            success: false,
            message: 'Failed to delete avatar. Please try again!',
            error: error.message
        }
    }
}

export const updateUserProfileData = async ({ name, phoneNumber, photoURL, photoPublicID }) => {
    try {
        const user = auth.currentUser;

        await updateProfile(user, {
            displayName: name,
            photoURL: photoURL
        });

        console.log('User profile updated successfully:', user.displayName, user.photoURL);

        const userRef = doc(db, 'Moody', 'moody-users-data', 'Users', user.uid);

        await updateDoc(userRef, {
            updated_at: new Date(),
            phone_number: phoneNumber,
            user_name: name,
            photo_public_id: photoPublicID,
        });

        return {
            success: true,
            message: 'User profile updated successfully'
        }
    }
    catch(error) {
        console.error('Error updating user profile:', error);
        return {
            success: false,
            message: 'User profile update failed. Please try again!',
            error: error.message
        }
    }
}

export const addNewPostData = async ({ mood, post }) => {
    const user = auth.currentUser;

    try {
        const collectionRef = collection(db, 'Moody', 'moody-users-data', 'Post Data');

        await addDoc(collectionRef, {
            user_id: user.uid,
            user_mood: mood,
            body: post,
            created_at: serverTimestamp(),
        })

        return {
            success: true,
            message: 'New post data added successfully!',
        }
    }
    catch(error) {
        console.error('Error adding new post data:', error);
        return {
            success: false,
            message: 'Failed to add new post data. Please try again!',
            error: error.message
        }
    }

}

export const getUserPosts = async (id) => {
    try {
        // await new Promise(resolve => setTimeout(resolve, 19000));
        const collectionRef = collection(db, 'Moody', 'moody-users-data', 'Post Data');
        const postsQuery = query(collectionRef, where('user_id', '==', id), orderBy('created_at', 'desc'));

        const postsSnapshot = await getDocs(postsQuery);

        if(postsSnapshot.empty) {
            console.log('No posts found for this user!');
            return null;
        }

        const posts = postsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));


        return posts;
    }
    catch(error) {
        console.error('Error fetching user posts:', error);
        return null;
    }
}
