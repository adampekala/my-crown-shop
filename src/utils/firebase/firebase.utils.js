import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCPCnlo_5BVXcyc315ZIosDogW4qu45-8g",
  authDomain: "my-crown-shop-a6dfa.firebaseapp.com",
  projectId: "my-crown-shop-a6dfa",
  storageBucket: "my-crown-shop-a6dfa.appspot.com",
  messagingSenderId: "1090348274916",
  appId: "1:1090348274916:web:bf5625dccf7b25dca308f1"
};

//firebase config
const firebaseApp = initializeApp(firebaseConfig);

//auth config

export const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);


//firestore config

export const db = getFirestore();

export const addColectionAndDocuments = async (collectionKey, objectToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toUpperCase());
    batch.set(docRef, object)
  })
  await batch.commit();
  console.log('done');
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = await querySnapshot.docs.reduce(
    (acc, docSnapshot) => {
      const { title, items } = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc
    }, {}
  )
  return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt
      });
    } catch (err) {
      console.log("Error:" + err);
    }
  }
  return userSnapshot;

}

//onAuthStateChange

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
}

export const signOutUser = () => signOut(auth);

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password); 
}