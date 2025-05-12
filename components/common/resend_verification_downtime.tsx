import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Typography from "./text-typography";

export function ResendVerificationDowntime() {
  const [timeLeft, setTimeLeft] = useState(30); // 30s

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <Typography
      type="body-small"
      weight="medium"
      textColor={timeLeft > 0 ? "#737373" : "#FF885D"}
      className={cn(
        "text-center mt-6",
        timeLeft === 0 && "border-b self-center border-[#FF885D]"
      )}
    >
      {timeLeft > 0
        ? `Resend code in ${minutes}:${seconds}`
        : "Resend verification code"}
    </Typography>
  );
}
