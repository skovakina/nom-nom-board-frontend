export default function MainLayout({ children }) {
  return (
    <div
      className={`flex min-h-svh flex-col items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#f2f2f2]`}
    >
      <div className="w-full max-w-[90%]">{children}</div>
    </div>
  );
}
