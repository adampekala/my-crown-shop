import { Fragment } from "react"
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const logGoogleUsers = async() => {
        const response = await signInWithGooglePopup();
        const { user } = response;

        // modyfikacja i przemieszczenie do Kontekstu -- UserContext
        // const userDocRef = await createUserDocumentFromAuth(user);
        // console.log(userDocRef);
    }

   
    
    return (
        
            <div className="sign-in">
                <h1>Sign in page</h1>
                <button onClick={logGoogleUsers}>Sign In With Google Popup</button>
                <SignUpForm />
            </div>
        
    )
}

export default SignIn;