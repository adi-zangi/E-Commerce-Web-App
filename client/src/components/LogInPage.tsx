/**
 * The log in page
 */

import { Button, FormGroup, InputGroup } from "@blueprintjs/core";
import { FC, useRef, useState } from "react";
import { AppState, User } from "../utils/dataTypes";
import { getUser, isExistingUser } from "../data/dataService";
import { Link, useNavigate } from "react-router-dom";
import { comparePassword } from "../utils/dataUtils";
import { AxiosError, AxiosResponse } from "axios";

interface Props {
   state: AppState;
   setUser: (user: User) => void;
}

interface State {
   showPassword: boolean;
   loading: boolean;
   emailValid: boolean;
   emailHelptext: string;
   passwordValid: boolean;
   passwordHelptext: string;
}

const defaultState : State = {
   showPassword: false,
   loading: false,
   emailValid: true,
   emailHelptext: "",
   passwordValid: true,
   passwordHelptext: "",
}

const LogInPage: FC<Props> = (props: Props) => {
   const [state, setState] = useState<State>(defaultState);

   const navigate = useNavigate();

   const emailRef = useRef<HTMLInputElement>(null);
   const passwordRef = useRef<HTMLInputElement>(null);

   // Returns true if the form has enough information to validate the login
   // credentials and false otherwise
   // Updates the error status and helptext on the form
   const validateLogInForm = async (email: string, password: string) : Promise<boolean> => {
      if (email.length === 0) {
         const emailHelptext = "Enter your email";
         setState({
            ...defaultState,
            emailValid: false,
            emailHelptext: emailHelptext,
         });
         return false;
      } else {
         let userExists = false;
         await isExistingUser(email)
            .then((res: any) => {
               userExists = res.data;
            })
            .catch((e: AxiosError) => {
               console.log(e);
            });
         if (!userExists) {
            const emailHelptext = "We couldn't find a user with this email";
            setState({
               ...defaultState,
               emailValid: false,
               emailHelptext: emailHelptext,
            });
            return false;
         } else if (password.length === 0) {
            const passwordHelptext = "Enter your password";
            setState({
               ...defaultState,
               passwordValid: false,
               passwordHelptext: passwordHelptext,
            });
            return false;
         }
      }
      return true;
   }

   // Validates the login credentials entered
   // Updates the error status and helptext on the form
   const validateLogInCredentials = async (email: string, password: string) => {
      let user;
      let tooManyAttempts;
      await getUser(email)
         .then((res: AxiosResponse<User>) => {
            user = res.data;
         })
         .catch((e: AxiosError) => {
            console.log(e);
            tooManyAttempts = e.status === 429;
         });
      if (tooManyAttempts) {
         const passwordHelptext = "Too many login attempts for this user. Please try again in 15 minutes.";
         setState({
            ...defaultState,
            passwordValid: false,
            passwordHelptext: passwordHelptext,
         });
      } else if (!user) {
         const passwordHelptext = "Something went wrong. Please try again later.";
         setState({
            ...defaultState,
            emailValid: false,
            passwordHelptext: passwordHelptext,
         });
      } else {
         const isPasswordMatch = await comparePassword(password, user['user_password']);
         if (isPasswordMatch) {
            props.setUser(user);
            navigate("/");
         } else {
            const passwordHelptext = "This password is incorrect. Please try again.";
            setState({
               ...defaultState,
               passwordValid: false,
               passwordHelptext: passwordHelptext,
            });
         }
      }
   }

   const handleLogInClick = async () => {
      setState({ ...state, loading: true });
      const email = emailRef.current?.value || "";
      const password = passwordRef.current?.value || "";
      if (await validateLogInForm(email, password)) {
         await validateLogInCredentials(email, password);
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
            Log In
         </div>
         <FormGroup
            id="loginEmailField"
            helperText={state.emailHelptext}
            intent={state.emailValid ? "none" : "danger"}>
            <InputGroup
               id="loginEmailInput"
               className="User-form-input"
               type="text"
               placeholder="Email"
               intent={state.emailValid ? "none" : "danger"}
               inputRef={emailRef} />
         </FormGroup>
         <FormGroup
            id="loginPassField"
            helperText={state.passwordHelptext}
            intent={state.passwordValid ? "none" : "danger"}>
            <InputGroup
               id="loginPassInput"
               className="User-form-input"
               placeholder="Password"
               rightElement={lockButton}
               type={state.showPassword ? "text" : "password"}
               intent={state.passwordValid ? "none" : "danger"}
               inputRef={passwordRef} />
         </FormGroup>
         <Button
            id="submitLogInBtn"
            className="User-form-btn"
            text="Continue"
            intent="primary"
            rightIcon="arrow-right"
            loading={state.loading}
            onClick={handleLogInClick} />
         <div className="Create-user-link">
            New here? <Link to="/signup">Create an account</Link>
         </div>
      </div>
   );
}

export default LogInPage;