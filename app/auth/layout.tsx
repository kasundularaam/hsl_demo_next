import LoginProvider from "@/logic/loginLogic/LoginContext";
import RegisterProvider from "@/logic/registerLogic/RegisterContext";

export const metadata = {
  title: "Authentication",
  description: "Register or login before continue",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LoginProvider>
        <RegisterProvider>{children}</RegisterProvider>
      </LoginProvider>
    </>
  );
}
