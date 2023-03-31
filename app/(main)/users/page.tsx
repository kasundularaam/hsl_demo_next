import { User } from "@/models/User";
import UserCard from "./(components)/UserCard";

const getUsers = async () => {
  const res = await fetch("http://localhost:8000/api/v1/users");
  const data = await res.json();
  return data as User[];
};

export default async function Users() {
  const users = await getUsers();

  return (
    <div className="bg-gray-800 h-screen text-gray-300 flex flex-col gap-5 pt-5">
      <h1 className="text-green-500 text-center font-bold text-3xl">Users</h1>
      <div>
        {users.map((user) => {
          return <UserCard key={user.email} user={user} />;
        })}
      </div>
    </div>
  );
}
