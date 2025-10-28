/**
 * The create user page
 */

import { FC, useRef, useState } from "react";
import { AppState, User } from "../utils/dataTypes";
import { Button, FormGroup, InputGroup } from "@blueprintjs/core";
import { addUser, getUser } from "../utils/dataService";
import { useNavigate } from "react-router-dom";

interface Props {
   state: AppState;
}

interface State {
   showPassword: boolean;
   loading: boolean;
   emailValid: boolean;
   emailHelptext: string;
   firstNameValid: boolean;
   firstNameHelptext: string;
   lastNameValid: boolean;
   lastNameHelptext: string;
   passwordValid: boolean;
   passwordHelptext: string;
}

const defaultState : State = {
   showPassword: false,
   loading: false,
   emailValid: true,
   emailHelptext: "",
   firstNameValid: true,
   firstNameHelptext: "",
   lastNameValid: true,
   lastNameHelptext: "",
   passwordValid: true,
   passwordHelptext: "Password should be at least 8 characters and include a number, an uppercase letter, and a special character.",
}

const CreateUserPage: FC<Props> = (props: Props) => {
   const [state, setState] = useState<State>(defaultState);

   const navigate = useNavigate();

   const emailRef = useRef<HTMLInputElement>(null);
   const firstNameRef = useRef<HTMLInputElement>(null);
   const lastNameRef = useRef<HTMLInputElement>(null);
   const passwordRef = useRef<HTMLInputElement>(null);

   // Validates the given email and updates the given state object
   const validateEmail = async (email: string, newState: State) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.length === 0) {
         newState.emailValid = false;
         newState.emailHelptext = "Email cannot be blank";
      } else if (!emailRegex.test(email)) {
         newState.emailValid = false;
         newState.emailHelptext = "Invalid email";
      } else {
         let user : User | null = null;
         await getUser(email)
            .then((res: any) => {
               user = res.data;
            })
            .catch((e: Error) => {
               console.log(e);
            });
         if (user) {
            newState.emailValid = false;
            newState.emailHelptext = "There is already an account with this email"
         }
      }
   }

   // Validates the given name and updates the given state object
   const validateName = (firstName: string, lastName: string, newState: State) => {
      const nameRegex = /^[a-zA-Z]+$/;
      if (firstName.length === 0) {
         newState.firstNameValid = false;
         newState.firstNameHelptext = "First name cannot be blank";
      } else if (!nameRegex.test(firstName)) {
         newState.firstNameValid = false;
         newState.firstNameHelptext = "First name should only include letters";
      }
      if (lastName.length === 0) {
         newState.lastNameValid = false;
         newState.lastNameHelptext = "Last name cannot be blank";
      } else if (!nameRegex.test(lastName)) {
         newState.lastNameValid = false;
         newState.lastNameHelptext = "Last name should only include letters";
      }
   }

   // Validates the given password and updates the given state object
   const validatePassword = (password: string, newState: State) => {
      const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (password.length === 0) {
         newState.passwordValid = false;
         newState.passwordHelptext = "Password cannot be blank";
      } if (!passRegex.test(password)) {
         newState.passwordValid = false;
      }
   }

   const handleLogInClick = async () => {
      setState({ ...state, loading: true });
      const email = emailRef.current?.value || "";
      const firstName = firstNameRef.current?.value || "";
      const lastName = lastNameRef.current?.value || "";
      const password = passwordRef.current?.value || "";
      const newState = { ...defaultState };
      await validateEmail(email, newState);
      validateName(firstName, lastName, newState);
      validatePassword(password, newState);
      if (newState.emailValid && newState.firstNameValid &&
         newState.lastNameValid && newState.passwordValid) {
            const user: User = {
               user_email: email,
               first_name: firstName,
               last_name: lastName,
               user_password: password
            };
            await addUser(user);
            navigate(-1);
      } else {
         setState({ ...newState });
      }
   }

   // Shows or hides the password when the lock button is clicked
   const handleLockClick = () => {
      setState({ ...state, showPassword: !state.showPassword });
   }

   const lockButton =
      <Button
         className="bp5-minimal"
         icon={state.showPassword ? "unlock" : "lock"}
         onClick={handleLockClick}
      />;
   
   return (
      <div className="User-form">
         <div className="User-form-header">
            Create Account
         </div>
         <FormGroup
            id="signupEmailField"
            className="User-form-input"
            helperText={state.emailHelptext}
            intent={state.emailValid ? "none" : "danger"}>
            <InputGroup
               id="signupEmailInput"
               type="text"
               placeholder="Email"
               intent={state.emailValid ? "none" : "danger"}
               inputRef={emailRef}
               data-lpignore="true" />
         </FormGroup>
         <FormGroup
            id="signupFirstNameField"
            className="User-form-input"
            helperText={state.firstNameHelptext}
            intent={state.firstNameValid ? "none" : "danger"}>
            <InputGroup
               id="signupFirstNameInput"
               type="text"
               placeholder="First name"
               intent={state.firstNameValid ? "none" : "danger"}
               inputRef={firstNameRef}
               data-lpignore="true" />
         </FormGroup>
         <FormGroup
            id="signupLastNameField"
            className="User-form-input"
            helperText={state.lastNameHelptext}
            intent={state.lastNameValid ? "none" : "danger"}>
            <InputGroup
               id="signupLastNameInput"
               type="text"
               placeholder="Last name"
               intent={state.lastNameValid ? "none" : "danger"}
               inputRef={lastNameRef}
               data-lpignore="true" />
         </FormGroup>
         <FormGroup
            id="signupPassField"
            className="User-form-input"
            helperText={state.passwordHelptext}
            intent={state.passwordValid ? "none" : "danger"}>
            <InputGroup
               id="signupPassInput"
               placeholder="Password"
               rightElement={lockButton}
               type={state.showPassword ? "text" : "password"}
               intent={state.passwordValid ? "none" : "danger"}
               inputRef={passwordRef}
               data-lpignore="true" />
         </FormGroup>
         <Button
            id="submitCreateUserBtn"
            className="User-form-btn"
            text="Continue"
            intent="primary"
            rightIcon="arrow-right"
            loading={state.loading}
            onClick={handleLogInClick} />
      </div>
   );
}

 export default CreateUserPage;