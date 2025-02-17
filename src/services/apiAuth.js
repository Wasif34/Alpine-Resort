import supabase from "./supabase";

export async function login({ email, password }) {
  let { data, error, status } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.error(error);
    throw new Error("Email or password is incorrect");
  }

  return data;
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session) {
    return null;
  }
  const { data, error } = await supabase.auth.getUser();

  console.log(data, error);

  if (error) {
    console.error(error);
    throw new Error("User could not be found");
  }
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw new Error("User could not be logged out");
  }
}

export async function signup({ fullName, email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        fullName: fullName,
        avatar_url: null,
      },
    },
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}
