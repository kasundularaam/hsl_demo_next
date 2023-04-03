import ProfileCardProvider from "@/logic/profileCardLogic/ProfileCardContext";
import ProfileCard from "./(components)/ProfileCard";

export default function Home() {
  return (
    <>
      <h1 className="text-red-500 text-7xl">Home Page</h1>
      <ProfileCardProvider>
        <ProfileCard />
      </ProfileCardProvider>
      <p>Welcome To The App</p>
    </>
  );
}
