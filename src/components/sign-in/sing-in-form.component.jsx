import { signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/fiebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

/* --- Styled Components --- */
import { SignInContainer, ButtonsContainer } from "./sign-in.style";

import { useState } from "react";


const defaultFormFields = { //we make default fields for all inputs
    email: '',
    password: '',
}

const SignInForm = () => {

    const [ formFields, setFormFields] = useState(defaultFormFields); // set formFields to take defaultFormFields
    const { email, password } = formFields;

    const resetFormFields = () => {
      setFormFields(defaultFormFields);
    }

    const SignInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    const handlerSubmit = async (event) => {
        event.preventDefault(); 

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            // console.log(response); control uid -- access token
            resetFormFields();
        } catch (error) {
            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                    default:
                        console.log(error);
            }
        }
    }

    const handleChange = (event) => { //we want to make one hanlder for all inputs
      const { name, value } = event.target; // by name, we will know what value is for which input
        setFormFields({...formFields, [name]:value })
    }

  return(
    <SignInContainer>
        <h2>Already have an account?</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handlerSubmit}>
            <FormInput 
                label={"Email"} 
                type="email" 
                required 
                onChange={handleChange} 
                name="email" 
                value={email} 
            />
            <FormInput 
                label={"Password:"} 
                type="password" 
                required 
                onChange={handleChange} 
                name="password" 
                value={password} 
            />
            <ButtonsContainer>
                <Button type="submit"> Sign In </Button>
                <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={SignInWithGoogle}>Google sign in</Button>
            </ButtonsContainer>
        </form>
    </SignInContainer>
  )
}

export default SignInForm;