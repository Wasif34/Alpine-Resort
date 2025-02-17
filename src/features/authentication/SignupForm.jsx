import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import { useSignup } from "../../hooks/useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, handleSubmit, formState, watch, reset, getValues } =
    useForm({
      defaultValues: {
        fullName: "",
        email: "",
        password: "",
        passwordConfirm: "",
      },
    });
  const { errors } = formState;

  const { signup, isLoading } = useSignup();

  const passwordValue = watch("password", "");

  function onSubmit(data) {
    signup(
      {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      },
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
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "Full name is required",
            minLength: {
              value: 6,
              message: "Full name needs to be at least 6 characters",
            },
            maxLength: {
              value: 30,
              message: "Full name needs to be at most 30 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="text"
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow label="Password" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password needs to be at least 8 characters",
            },
            maxLength: {
              value: 15,
              message: "Password needs to be at most 30 characters",
            },
            pattern: {
              value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
              message:
                "Password needs to contain at least one number, one lowercase and one uppercase letter",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={!passwordValue}
          {...register("passwordConfirm", {
            required: "Confirm Password is required",
            validate: (value) =>
              value === getValues("password") || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new Admin</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
