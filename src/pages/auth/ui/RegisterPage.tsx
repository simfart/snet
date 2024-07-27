import { FC } from "react";
import { AuthForm } from "./auth-form";

export const RegisterPage: FC = () => {
  return (
    <div className="authContainer">
      <AuthForm
        mode="register"
        title="Create a new account"
        buttonText="Register"
        linkUrl="/login"
        linkText="Sign in"
      />
    </div>
  );
};
