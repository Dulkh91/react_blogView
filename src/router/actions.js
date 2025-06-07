import { redirect } from "react-router-dom";

const URL_API = "https://realworld.habsidev.com/api";

export const CreateUserAction = async ({ request }) => {
  const formData = await request.formData();
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const repeadPassword = formData.get("repeadPassword");

    const errors = [];

    if (!name) {
      errors.name = "Insert name";
    }
    if (!email) {
      errors.email = "Insert email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Checks the email format";
    }
    if (!password) {
      errors.password = "Please insert password";
    } else if (password !== repeadPassword) {
      errors.repeadPassword = "Passwords do not match";
    }

    //ប្រសិនមាន error ណាមួយនោះវានឹង return errors
    if (Object.keys(errors).length > 0) {
      return { errors };
    }

    const response = await fetch(`${URL_API}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     user: {
      //       username: formData.get("name"),
      //       email: formData.get("email"),
      //       password: formData.get("password"),
      //     },
      //   }),
    });
    if (!response.ok) return errors;
    console.log(response.json());
    return redirect("/sign_up");
  } catch (error) {
    return error;
  }
};

//  Action with Login
export const LoginAction = async ({ request }) => {
  const formData = await request.formData();

  try {
    const response = await fetch(`${URL_API}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          email: formData.get("email"),
          password: formData.get("password"),
        },
      }),
    });

    if (!response.ok) {
      const erorrResult = await response.json();
      return { error: erorrResult.erros || { message: "Login failed" } };
    }
    const result = await response.json();

    // Optional: Save token in localStorage
    localStorage.setItem("token", result.user.token);
    localStorage.setItem("user", JSON.stringify(result.user));

    return redirect("/login");
  } catch (error) {
    return { error: { message: error.message } };
  }
};
