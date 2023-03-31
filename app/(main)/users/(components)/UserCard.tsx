import React from "react";
import { UserCardProps } from "../(componentProps)/UserCardProps";
const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="flex flex-col p-3 bg-gray-700 rounded-md mb-2 mx-5 border-gray-500 border">
      <p>{user.name ?? "No Name"}</p>
      <p>{user.email}</p>
    </div>
  );
};

export default UserCard;
