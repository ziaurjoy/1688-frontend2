// "use client";

// import { EmailIcon, PasswordIcon } from "@/assets/icons";
// import Link from "next/link";
// import React, { useState } from "react";
// import InputGroup from "../../FormElements/InputGroup";
// import { Checkbox } from "../../FormElements/checkbox";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function SignUpForm() {
//   const router = useRouter();

//   const [data, setData] = useState({
//     email: process.env.NEXT_PUBLIC_DEMO_USER_MAIL || "",
//     password: process.env.NEXT_PUBLIC_DEMO_USER_PASS || "",
//     remember: false,
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;

//     setData({
//       ...data,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     const res = await signIn("credentials", {
//       email: data.email,
//       password: data.password,
//       redirect: false,
//     });

//     setLoading(false);

//     if (res?.error) {
//       setError("Invalid email or password");
//       return;
//     }

//     router.push("/admin-dashboard");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <InputGroup
//         type="email"
//         label="Email"
//         className="mb-4 [&_input]:py-[15px]"
//         placeholder="Enter your email"
//         name="email"
//         handleChange={handleChange}
//         value={data.email}
//         icon={<EmailIcon />}
//         required
//       />

//       <InputGroup
//         type="password"
//         label="Password"
//         className="mb-5 [&_input]:py-[15px]"
//         placeholder="Enter your password"
//         name="password"
//         handleChange={handleChange}
//         value={data.password}
//         icon={<PasswordIcon />}
//         required
//       />

//       {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

//       <div className="mb-4.5">
//         <button
//           type="submit"
//           disabled={loading}
//           className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90 disabled:opacity-70"
//         >
//           Sign In
//           {loading && (
//             <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
//           )}
//         </button>
//       </div>
//     </form>
//   );
// }

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { EmailIcon, PasswordIcon } from "@/assets/icons"; // Removed invalid OTP检Icon
import InputGroup from "../../FormElements/InputGroup";
import { UserRegistration, verifyOTP } from "@/services/user.service";

type FormStep = "REGISTER" | "OTP";

export default function RegistrationFlow() {
  const router = useRouter();

  // --- State ---
  const [step, setStep] = useState<FormStep>("REGISTER");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
  });

  const [alert, setAlert] = useState<{
    variant: "success" | "error";
    message: string;
  } | null>(null);

  // --- Helpers ---
  const showAlert = (variant: "success" | "error", message: string) => {
    setAlert({ variant, message });
    // Auto-hide alert after 5 seconds
    setTimeout(() => setAlert(null), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // --- Logic: Step 1 (Registration) ---
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      const response = await UserRegistration({
        email: formData.email,
        password: formData.password,
      });

      showAlert("success", response.message || "OTP sent to your email!");
      setStep("OTP");
    } catch (error: any) {
      showAlert(
        "error",
        error.response?.data?.message || "Registration failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  // --- Logic: Step 2 (Verification) ---
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await verifyOTP({
        email: formData.email,
        otp: formData.otp,
      });

      showAlert("success", "Account verified successfully!");
      // Short delay so user sees success message before redirect
      setTimeout(() => router.push("/sign-in"), 1500);
    } catch (error: any) {
      showAlert("error", error.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[400px] p-4">
      {/* Alert Notification */}
      {alert && (
        <div
          className={`mb-4 rounded-lg p-4 text-sm ${
            alert.variant === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {alert.message}
        </div>
      )}

      {step === "REGISTER" ? (
        <form onSubmit={handleRegister} className="space-y-4">
          <header>
            <h2 className="text-2xl font-bold text-black">Create Account</h2>
            <p className="text-sm text-gray-500">Join us to get started.</p>
          </header>

          <InputGroup
            type="email"
            label="Email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            handleChange={handleChange}
            icon={<EmailIcon />}
            required
          />

          <InputGroup
            type="password"
            label="Password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            handleChange={handleChange}
            icon={<PasswordIcon />}
            required
          />

          <SubmitButton label="Get Verification Code" loading={loading} />
        </form>
      ) : (
        <form onSubmit={handleVerify} className="space-y-4">
          <header>
            <h2 className="text-2xl font-bold text-black">Verify Email</h2>
            <p className="text-sm text-gray-500">
              Enter the code sent to{" "}
              <span className="font-semibold text-black">{formData.email}</span>
            </p>
          </header>

          <InputGroup
            type="text"
            label="One-Time Password"
            name="otp"
            placeholder="6-digit code"
            value={formData.otp}
            handleChange={handleChange}
            required
          />

          <SubmitButton label="Verify & Complete" loading={loading} />

          <div className="flex flex-col gap-2 pt-2">
            <button
              type="button"
              onClick={() => setStep("REGISTER")}
              className="w-fit text-sm text-primary hover:underline"
            >
              ← Change Email
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

/**
 * Extracted Sub-component for consistency
 */
const SubmitButton = ({
  label,
  loading,
}: {
  label: string;
  loading: boolean;
}) => (
  <button
    type="submit"
    disabled={loading}
    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90 disabled:opacity-70"
  >
    {loading ? (
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
    ) : (
      label
    )}
  </button>
);
