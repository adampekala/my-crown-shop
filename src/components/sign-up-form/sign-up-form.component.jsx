import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  console.log(formFields);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetForm = () => {
      setFormFields(defaultFormFields);
  }

  const handlerSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('password do not match');
      return;
    }
    try {
      const response = await createAuthUserWithEmailAndPassword(email, password)
      console.log(response);
      const { user } = response;
      await createUserDocumentFromAuth(user, {displayName});
      resetForm();
    } catch (error) {
      console.log(error.code);
    }
  }

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handlerSubmit}>
        <label>Display name</label>
        <input
          required
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          autoComplete="true"
        />
        <label>Email</label>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          autoComplete="true"
        />
        <label>Password</label>
        <input
          required
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          autoComplete="true"
        />
        <label>Confirm password</label>
        <input
          required
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          autoComplete="true"
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
