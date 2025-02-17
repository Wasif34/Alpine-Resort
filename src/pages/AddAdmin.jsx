import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";

function AddAdmin() {
  return (
    <>
      <Heading as="h1">Add Admin</Heading>
      <SignupForm />
    </>
  );
}

export default AddAdmin;
