import React from "react";

interface VerificationEmailProps {
  verificationCode?: string;
}

export default function VerificationEmail({
  verificationCode,
}: VerificationEmailProps) {
  return (
    <div>
      <div>
        <h3>Your Verification Code:</h3>
        <p style={{ textAlign: "center" }}>{verificationCode}</p>
      </div>
      <div>
        <p>If you didn&apos;t request this, please ignore this email.</p>
        <p>
          Best,
          <br />
          Team PocketBridge
        </p>
      </div>
    </div>
  );
}
