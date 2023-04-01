import { AuthLogics } from "@/logic/authLogics";
import React from "react";

const HelloUser: React.FC<{ authLogics: AuthLogics }> = ({ authLogics }) => {
  const uid = authLogics.useGetUid();
  const { isLoading, data, error } = authLogics.useGetUser(uid!);
  return (
    <>
      <div>{isLoading && <div>Loading...</div>}</div>
      <div>{data && <div>Hello {data.name}</div>}</div>
      <div>{error && <div>{error.message}</div>}</div>
    </>
  );
};

export default HelloUser;
