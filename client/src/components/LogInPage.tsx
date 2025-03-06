/**
 * The log in page
 */

import { Button, FormGroup, InputGroup } from "@blueprintjs/core";
import { FC, useRef, useState } from "react";
import { AppState, User } from "../utils/dataTypes";
import { getUser } from "../utils/dataService";
import { Link, useNavigate } from "react-router-dom";

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
   const validateLogInForm = (email: string) : boolean => {
      if (email.length === 0) {
         const emailHelptext = "Enter your email";
         setState({
            ...defaultState,
            emailValid: false,
            emailHelptext: emailHelptext,
         });
         return false;
      }
      return true;
   }

   // Validates the login credentials entered
   const validateLogInCredentials = async (email: string, password: string) => {
      let user : User | null = null;
      await getUser(email)
         .then((res: any) => {
            user = res.data;
         })
         .catch((e: Error) => {
            console.log(e);
         });
      if (!user) {
         const emailHelptext = "We couldn't find a user with this email";
         setState({
            ...defaultState,
            emailValid: false,
            emailHelptext: emailHelptext,
         });
      } else if (password.length === 0) {
         const passwordHelptext = "Enter your password";
         setState({
            ...defaultState,
            passwordValid: false,
            passwordHelptext: passwordHelptext,
         });
      } else if (user['user_password'] === password) {
         props.setUser(user);
         navigate(-1);
      } else {
         const passwordHelptext = "This password is incorrect. Please try again.";
         setState({
            ...defaultState,
            passwordValid: false,
            passwordHelptext: passwordHelptext,
         });
      }
   }

   const handleLogInClick = async () => {
      setState({ ...state, loading: true });
      const email = emailRef.current?.value || "";
      const password = passwordRef.current?.value || "";
      if (validateLogInForm(email)) {
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
            helperText={state.emailHelptext}
            intent={state.emailValid ? "none" : "danger"}>
            <InputGroup
               className="User-form-input"
               type="text"
               placeholder="Email"
               intent={state.emailValid ? "none" : "danger"}
               inputRef={emailRef} />
         </FormGroup>
         <FormGroup
            helperText={state.passwordHelptext}
            intent={state.passwordValid ? "none" : "danger"}>
            <InputGroup
               className="User-form-input"
               placeholder="Password"
               rightElement={lockButton}
               type={state.showPassword ? "text" : "password"}
               intent={state.passwordValid ? "none" : "danger"}
               inputRef={passwordRef} />
         </FormGroup>
         <Button
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