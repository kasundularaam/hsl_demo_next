export const metadata = {
  title: "Authentication",
  description: "Register or login before continue",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
