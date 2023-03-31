import NavBar from "./(components)/Navbar";

export const metadata = {
  title: "HANDICRAFT SRI LANKA",
  description: "Handicraft Store",
};

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
