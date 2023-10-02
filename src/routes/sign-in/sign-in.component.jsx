import { Fragment } from "react"
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

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
        <Fragment>
            <div className="sign-in">
                <h1>Sign in with Google</h1>
                <form onSubmit={handleSubmit}>
                <label>user</label>
                <input required autoComplete="false" type='text' name="user" palceholder="type login"/>
                <label>password</label>
                <input required autoComplete="false" type='password' name="password" palceholder="type password"/>
                <button type="submit">Sign In</button>
                </form>
                <button type="button" onClick={logGoogleUsers}>Sign In With Google</button>
            </div>
        </Fragment>
    )
}

export default SignIn;