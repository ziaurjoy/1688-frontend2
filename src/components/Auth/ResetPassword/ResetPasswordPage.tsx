//

"use client";
import { Alert } from "@/components/ui-elements/alert";
import {
  forgetPassword,
  verifyOTP,
  resetPassword,
} from "@/services/user.service"; // Ensure these names match your service
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // State for showing alerts
  const [alert, setAlert] = useState<{
    variant: "success" | "error";
    title: string;
    message: string;
  } | null>(null);

  // Helper to clear alert after a few seconds
  const showAlert = (
    variant: "success" | "error",
    title: string,
    message: string,
  ) => {
    setAlert({ variant, title, message });
    setTimeout(() => setAlert(null), 5000);
  };

  // Step 1: Request OTP
  const handleSendOTP = async (targetEmail: string) => {
    setLoading(true);
    try {
      const response = await forgetPassword({ email: targetEmail });
      setEmail(targetEmail);
      showAlert("success", response.title, response.message);
      setStep(2);
    } catch (error: any) {
      showAlert(
        "error",
        "Error",
        error.response?.data?.message || "Failed to send OTP.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (submittedOtp: string) => {
    setLoading(true);
    try {
      const response = await verifyOTP({ email, otp: submittedOtp });
      setOtp(submittedOtp);
      showAlert("success", response.title, response.message);
      setStep(3);
    } catch (error: any) {
      showAlert(
        "error",
        "Verification Failed",
        error.response?.data?.message || "Invalid OTP.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Final Reset
  const handleResetPassword = async (newPassword: string) => {
    setLoading(true);
    try {
      const response = await resetPassword({
        email,
        otp,
        new_password: newPassword,
      });
      showAlert("success", response.title, response.message);
      router.push("/sign-in");
      // Optional: Redirect to login after success
    } catch (error: any) {
      showAlert(
        "error",
        "Reset Failed",
        error.response?.data?.message || "Could not reset password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Dynamic Alert Rendering */}
      {alert && (
        <div className="mb-6">
          <Alert
            variant={alert.variant}
            title={alert.title}
            description={alert.message}
          />
        </div>
      )}

      {step === 1 && <StepSendEmail onNext={handleSendOTP} loading={loading} />}
      {step === 2 && (
        <StepVerifyOTP
          email={email}
          onNext={handleVerifyOTP}
          onBack={() => setStep(1)}
          loading={loading}
        />
      )}
      {step === 3 && (
        <StepNewPassword onFinish={handleResetPassword} loading={loading} />
      )}
    </div>
  );
}

// --- Sub-Components ---

const StepSendEmail = ({ onNext, loading }: any) => {
  const [val, setVal] = useState("");
  return (
    <div className="animate-fadeIn">
      <h2 className="mb-4 text-2xl font-bold text-dark dark:text-white">
        Forgot Password?
      </h2>
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 outline-none focus:border-primary dark:border-dark-3"
        onChange={(e) => setVal(e.target.value)}
      />
      <button
        disabled={loading}
        onClick={() => onNext(val)}
        className="mt-6 w-full rounded-lg bg-primary p-4 text-white hover:bg-opacity-90 disabled:bg-opacity-50"
      >
        {loading ? "Sending..." : "Send OTP"}
      </button>
    </div>
  );
};

const StepVerifyOTP = ({ email, onNext, onBack, loading }: any) => {
  const [val, setVal] = useState("");
  return (
    <div className="animate-fadeIn text-center">
      <h2 className="mb-4 text-2xl font-bold text-dark dark:text-white">
        Verify OTP
      </h2>
      <p className="mb-6">
        Sent to <span className="text-primary">{email}</span>
      </p>
      <input
        type="text"
        placeholder="6-digit code"
        className="w-full rounded-lg border border-stroke bg-transparent py-4 text-center text-2xl tracking-widest outline-none focus:border-primary dark:border-dark-3"
        onChange={(e) => setVal(e.target.value)}
      />
      <button
        disabled={loading}
        onClick={() => onNext(val)}
        className="mt-6 w-full rounded-lg bg-primary p-4 text-white hover:bg-opacity-90 disabled:bg-opacity-50"
      >
        {loading ? "Verifying..." : "Verify Code"}
      </button>
      <button onClick={onBack} className="mt-4 block w-full text-sm">
        Back
      </button>
    </div>
  );
};

const StepNewPassword = ({ onFinish, loading }: any) => {
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  return (
    <div className="animate-fadeIn">
      <h2 className="mb-4 text-2xl font-bold text-dark dark:text-white">
        New Password
      </h2>
      <input
        type="password"
        placeholder="New Password"
        className="mb-4 w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 outline-none focus:border-primary dark:border-dark-3"
        onChange={(e) => setPass(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm New Password"
        className="mb-4 w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 outline-none focus:border-primary dark:border-dark-3"
        onChange={(e) => setConfirmPass(e.target.value)}
      />

      <button
        disabled={loading || pass !== confirmPass || !pass}
        onClick={() => onFinish(pass, confirmPass, setError)}
        className="mt-6 w-full rounded-lg bg-primary p-4 text-white hover:bg-opacity-90 disabled:bg-opacity-50"
      >
        {loading ? "Updating..." : "Reset Password"}
      </button>
    </div>
  );
};
