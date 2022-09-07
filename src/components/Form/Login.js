import React, { useState, useContext } from "react";
import {
  FormColumn,
  FormWrapper,
  FormInput,
  FormSection,
  FormRow,
  FormLabel,
  FormInputRow,
  FormMessage,
  FormButton,
  FormTitle,
} from "./FormStyles";
import { Container } from "../../globalStyles";
import validateForm from "./validateLoginForm";
import { useNavigate } from "react-router-dom";



const LoginForm = ({setUserId}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const resultError = validateForm({
      email,
      password,
    });

    if (resultError !== null) {
      setError(resultError);
      return;
    } else {
      registerUser();
      async function registerUser() {
        await fetch("http://localhost:3001/users/login", {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((data) => data.json())
          .then((json) =>
            json._id != null
              ? (setUserId(json._id),
                console.log(message),
                setEmail(""),
                setPassword(""),
                setError(null),
                localStorage.setItem("userId", null),
                localStorage.setItem("userId", JSON.stringify(json._id)),

                localStorage.setItem("userName", null),
                localStorage.setItem("userName", JSON.stringify(json.firstName)),
                navigate("/dashboard"))
                // (window.location = "/dashboard"))
              : (setUserId(null), console.log(JSON.stringify(json)))
          );
      }

      /* const response = await fetch("http://localhost:3001/users/register", {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const message = await response.json();
        setMessage(message);
        console.log(message);

        if (message.success === true) {
          console.log(message);
          setEmail("");
          setPassword("");
          setError(null);
          setSuccess("Application was submitted!");
        } else {
          setError("email already exists");
          return;
        } */
    }
  };

  const messageVariants = {
    hidden: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4 } },
  };

  const formData = [
    {
      label: "Email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      type: "email",
    },
    {
      label: "Password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      type: "password",
    },
  ];
  return (
    <FormSection>
      <Container>
        <FormRow>
          <FormColumn small>
            <FormTitle>Sign in</FormTitle>
            <FormWrapper onSubmit={handleSubmit}>
              {formData.map((el, index) => (
                <FormInputRow key={index}>
                  <FormLabel>{el.label}</FormLabel>
                  <FormInput
                    type={el.type}
                    placeholder={`Enter your ${el.label.toLocaleLowerCase()}`}
                    value={el.value.toLocaleLowerCase()}
                    onChange={el.onChange}
                  />
                </FormInputRow>
              ))}

              <FormButton type="submit">Sign In</FormButton>
            </FormWrapper>
            {error && (
              <FormMessage
                variants={messageVariants}
                initial="hidden"
                animate="animate"
                error
              >
                {error}
              </FormMessage>
            )}
          </FormColumn>
        </FormRow>
      </Container>
    </FormSection>
  );
};

export default LoginForm;
