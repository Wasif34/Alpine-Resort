import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "../../hooks/useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import { useForm } from "react-hook-form";
function LoginForm() {
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { errors } = formState;

  const { login, isLoading, error } = useLogin();

  function onSubmit(data) {
    console.log(data);
    login(
      { email: data.email, password: data.password },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }
  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRowVertical label="Email address" error={errors?.email?.message}>
        <Input
          type="text"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Provide a valid email address",
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical label="Password" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Login"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
