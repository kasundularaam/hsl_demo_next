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

const UserCard = (props: { user: User }) => {
  const user = props.user;
  return (
    <div className="flex flex-col p-3 bg-gray-700 rounded-md mb-2 mx-5 border-gray-500 border">
      <p>{user.name ?? "No Name"}</p>
      <p>{user.email}</p>
    </div>
  );
};
