import LoginProvider from "@/contexts/loginContext/LoginContext";
import RegisterProvider from "@/contexts/registerContext/RegisterContext";

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
