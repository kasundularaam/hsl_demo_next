import React from "react";
import IUserCardProps from "../(componentProps)/IUserCardProps";
const UserCard: React.FC<IUserCardProps> = ({ user }) => {
  return (
    <div className="flex flex-col p-3 bg-gray-700 rounded-md mb-2 mx-5 border-gray-500 border">
      <p>{user.name ?? "No Name"}</p>
      <p>{user.email}</p>
    </div>
  );
};

export default UserCard;
