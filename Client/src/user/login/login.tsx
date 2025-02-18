import { useState } from "react";
import EnterEmail from "./enterEmail/EnterEmail";
import EnterVerificationCode from "./enterVerificationCode/EnterVerificationCode";
import SignUp from "./signup/SignUp";

const Login = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [stage, setStage] = useState<
    "enterEmail" | "enterVerificationCode" | "signUp"
  >("enterEmail");
  return (
    <>
      {stage == "enterEmail" && (
        <EnterEmail
          setEmail={setEmail}
          goToNextStage={() => setStage("enterVerificationCode")}
        />
      )}
      {stage == "enterVerificationCode" && (
        <EnterVerificationCode
          email={email || ""}
          goToNextStage={() => setStage("signUp")}
          goToPreviousStage={() => setStage("enterEmail")}
        />
      )}
      {stage == "signUp" && <SignUp email={email || ""} />}
    </>
  );
};

export default Login;
