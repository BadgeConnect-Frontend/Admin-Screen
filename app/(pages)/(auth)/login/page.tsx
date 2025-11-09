"use client"
import React, { useState, useEffect, ChangeEvent } from "react";
import { FaCertificate } from "react-icons/fa";

const Login: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);

  // Timer countdown logic
  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setResendEnabled(true);
    }
  }, [step, timer]);

  // Handle OTP input
  const handleOtpChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleSendOtp = () => {
    if (!identifier.trim()) {
      alert("Please enter your email or phone number.");
      return;
    }
    setStep(2);
    setTimer(60);
    setResendEnabled(false);
  };

  const handleResendOtp = () => {
    setTimer(60);
    setResendEnabled(false);
    alert("OTP resent!");
  };

  const handleLogin = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }
    alert(`Verifying OTP: ${enteredOtp}`);
  };

  const handleCancel = () => {
    setStep(1);
    setIdentifier("");
    setOtp(Array(6).fill(""));
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100 font-sans pt-5">
      <div className="bg-white rounded-xl shadow-md w-[400px] p-8 text-center">
        <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-[#0dcaf0] rounded-full text-white text-3xl font-bold">
        <FaCertificate size={55} /> 
        </div>

        <h2 className="text-2xl font-semibold text-gray-800  mb-2">
          Welcome to BadgeConnect
          <br />
          Admin Login
        </h2>

        {step === 1 ? (
          <>
            <p className="text-gray-500 mb-5 text-md">Sign in to continue</p>

            <div className="text-left mb-4 ">
              <label className="font-semibold text-md mb-4">Email or Phone</label>
              <input
                type="text"
                placeholder="Enter your email or phone..."
                value={identifier}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setIdentifier(e.target.value)
                }
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-400 outline-none"
              />
            </div>

            <button
              onClick={handleSendOtp}
              className="w-full py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 transition-all"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-600 mb-3 text-md">
              Please verify your login details
            </p>

            <div className="text-left mb-3">
              <label className="font-semibold text-md">
                {identifier.includes("@") ? "Email address" : "Phone number"}
              </label>
              <div className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                {identifier}
              </div>
            </div>

            {/* OTP boxes */}
            <div className="flex justify-between mb-4">
              {otp.map((val, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={val}
                  maxLength={1}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  className="w-10 h-10 border border-gray-300 rounded-md text-center text-lg focus:ring-2 focus:ring-sky-400 outline-none"
                />
              ))}
            </div>

            {/* Resend timer */}
            <div className="text-md text-gray-600 mb-4">
              {!resendEnabled ? (
                <>
                  Didn’t get the code?{" "}
                  <span className="text-gray-400 cursor-not-allowed">
                    Click to resend
                  </span>
                  <br />
                  <span className="text-gray-500">
                    Resend in 00:{timer < 10 ? `0${timer}` : timer}
                  </span>
                </>
              ) : (
                <>
                  Didn’t get the code?{" "}
                  <button
                    onClick={handleResendOtp}
                    className="text-sky-600 hover:underline"
                  >
                    Click to resend
                  </button>
                </>
              )}
            </div>

            <button
              onClick={handleLogin}
              className="w-full py-2 mb-3 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 transition-all"
            >
              Login
            </button>

            <button
              onClick={handleCancel}
              className="w-full py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
