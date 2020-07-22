import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCpQeALBd_0R1M3VIuP5MJJc2izjZCfgjs",
    authDomain: "crw-db-fd193.firebaseapp.com",
    databaseURL: "https://crw-db-fd193.firebaseio.com",
    projectId: "crw-db-fd193",
    storageBucket: "crw-db-fd193.appspot.com",
    messagingSenderId: "330899711446",
    appId: "1:330899711446:web:2a846a592173b522ca3077",
    measurementId: "G-EG2SZS1E9W"
  };

  
export const createUserProfileDocument = async(userAuth, additionalData) => {

    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapshot = await userRef.get();

    if (!snapshot.exists){
        const { displayName , email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })

        }

        catch(error) {
                console.log('error creating user',error.message);
        }

    }

    return userRef;

}

export const addCollectionAndDocuments = async(collectionKey,objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj =>{
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef,obj);
    });
    return await batch.commit()
};

  firebase.initializeApp(config);

export const convertCollectionsSnapshotToMap = (collections) =>{
    const transformedcollections = collections.docs.map((doc) =>{
        const {title,items} = doc.data();

        return{
            routeName:encodeURI(title.toLowerCase()),
            id:doc.id,
            title,
            items
        }
    });

    return transformedcollections.reduce((accumulator,collection)=>{
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator; 
    },{});
}

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;


