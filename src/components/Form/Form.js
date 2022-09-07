import React, { useState } from "react";
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
import validateForm from "./validateForm";
// import { registerUser } from "./../DbData";

const Form = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const resultError = validateForm({
      firstname,
      lastname,
      email,
      password,
    });

    if (resultError !== null) {
      setError(resultError);
      return;
    } else {
      registerUser();
      async function registerUser() {
        const response = await fetch("http://localhost:3001/users/register", {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            firstName: firstname,
            lastName: lastname,
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
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setError(null);
          setSuccess("Application was submitted!");
        } else {
          setError("email already exists");
          return;
        }
      }
    }
  };

  const messageVariants = {
    hidden: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4 } },
  };

  const formData = [
    {
      label: "FirstName",
      value: firstname,
      onChange: (e) => setFirstName(e.target.value),
      type: "text",
    },
    {
      label: "LastName",
      value: lastname,
      onChange: (e) => setLastName(e.target.value),
      type: "text",
    },

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
            <FormTitle>Sign up</FormTitle>
            <FormWrapper onSubmit={handleSubmit}>
              {formData.map((el, index) => (
                <FormInputRow key={index}>
                  <FormLabel>{el.label}</FormLabel>
                  <FormInput
                    type={el.type}
                    placeholder={`Enter your ${el.label.toLocaleLowerCase()}`}
                    value={el.value}
                    onChange={el.onChange}
                  />
                </FormInputRow>
              ))}

              <FormButton type="submit">Signup</FormButton>
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
            {success && (
              <FormMessage
                variants={messageVariants}
                initial="hidden"
                animate="animate"
              >
                {success}
              </FormMessage>
            )}
          </FormColumn>
        </FormRow>
      </Container>
    </FormSection>
  );
};

export default Form;
