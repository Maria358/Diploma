import { useState } from 'react';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  sendEmailVerification
} from 'firebase/auth';
import { auth, googleProvider, db } from '../index';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';


export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState('');

  const signInWithGoogle = async () => {
    try {
      setError('');
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      setError(error.message);
    }
  };

  const signUpWithGoogle = async (role) => {
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!(docSnap.exists())) {
        await setDoc(doc(db, "users", user.uid), {
          role,
          verified: false,
          createdAt: serverTimestamp(),
        });
        // router.push('/profile')
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const signInWithCredentials = async (email, password) => {
    try {
      setError('');
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      if (!user.emailVerified) {
        throw new Error(
          'You need to confirm your email address before you can access your account.'
        );
      }
      setUser(user);
    } catch (error) {
      setError(error.message);
    }
  };

  const signUpWithEmailAndPassword = async (email, password, role) => {
    try {
      setError('');
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      await setDoc(doc(db, "users", user.uid), {
        role,
        verified: false,
        createdAt: serverTimestamp(),
      });


      // await sendEmailVerification(user);
      // alert(
      //   'We have sent an email with a confirmation link to your email address.'
      // );

    //   router.push('/login');

    } catch (error) {
      setError(error.message);
      return new Error(error.message);
    }
  };

  const signOutFromAccount = async () => {
    try {
      await signOut(auth);
    //   router.push('/login');
    } catch (error) {
    //   setError(error.message);

    //   alert(error.message);
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);

      alert('A password reset link was sent.');

    //   router.push('/login');
    } catch (error) {
      setError(error.message);


      alert(error.message);
    }
  };
 

  return {
    user,
    isInitializing,
    signInWithCredentials,
    signInWithGoogle,
    signUpWithEmailAndPassword,
    signOutFromAccount,
    signUpWithGoogle,
    error
  };
};
