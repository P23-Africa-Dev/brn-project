import React from "react";

interface InputErrorProps {
  message?: string;
  className?: string;
}

export default function InputError({ message, className = "" }: InputErrorProps) {
  if (!message) return null;

  return (
    <p className={`mt-1 text-sm text-red-600 ${className}`}>
      {message}
    </p>
  );
}
