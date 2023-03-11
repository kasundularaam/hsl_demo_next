import Image from "next/image";
import userImg from "../../public/user.avif";

interface User {
  name: string;
  email: string;
  password: string;
}

const getUsers = async () => {
  const res = await fetch("http://localhost:8000/api/v1/users");
  const data = await res.json();
  return data as User[];
};

export default async function Users() {
  const users = await getUsers();

  return (
    <div className="bg-gray-800 h-screen text-gray-200 flex flex-col gap-3">
      <div>Users</div>
      <div>
        {users.map((user) => {
          return <UserCard key={user.email} user={user} />;
        })}
      </div>
    </div>
  );
}

const UserCard = (props: { user: User }) => {
  const user = props.user;
  return (
    <div className="flex flex-col p-3 bg-gray-700 rounded-md mb-2 mx-5">
      <p>{user.name ?? "No Name"}</p>
      <p>{user.email}</p>
    </div>
  );
};
