import { BG_GRADIENT } from "../../lib/const";
export default function LoginPage({ children }) {
  return (
    <div
      className={`flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10 ${BG_GRADIENT}`}
    >
      <div className="w-full max-w-sm md:max-w-3xl">{children}</div>
    </div>
  );
}
