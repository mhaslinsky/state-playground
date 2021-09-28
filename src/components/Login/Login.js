import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../store/auth-context";
import Input from "../UI/Input/Input";

function emailReducer(state, action) {
  //state is always the last state of the object
  //action is passed by the dispatch function, we are using .type here
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.val, isValid: action.val.includes("@") };
    case "INPUT_BLUR":
      return { value: state.value, isValid: state.value.includes("@") };
    default:
      return { value: "", isValid: false };
  }
}

function passwordReducer(state, action) {
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.val, isValid: action.val.trim().length > 6 };
    case "INPUT_BLUR":
      return { value: state.value, isValid: state.value.trim().length > 6 };
    default:
      return { value: "", isValid: false };
  }
}

const Login = () => {
  const ctx = useContext(AuthContext);
  console.log("test change");
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: undefined,
  });

  useEffect(() => {
    const rateLimiter = setTimeout(() => {
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 250);
    //runs before above code, cleans up previous iteration of timer, only allowing
    //one timer in memory at a time.
    return () => {
      clearTimeout(rateLimiter);
    };
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (e) => {
    dispatchEmail({ type: "USER_INPUT", val: e.target.value });
  };

  const passwordChangeHandler = (e) => {
    dispatchPassword({ type: "USER_INPUT", val: e.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value);
    } else if (!emailState.isValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  function wowee() {
    console.log("imma test");
  }

  wowee();

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        />
        <Input
          ref={emailInputRef}
          label='E-mail'
          id='email'
          isValid={emailState.isValid}
          type='email'
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          label='Password'
          id='password'
          isValid={passwordState.isValid}
          type='password'
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type='submit' className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
