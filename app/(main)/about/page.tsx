"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function AboutPage() {
  const [data, setData] = useState<Post | undefined>(undefined);

  useEffect(() => {
    axios
      .get<Post>("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => setData(response.data));
  }, []);

  useEffect(() => {}, [data]);

  return (
    <div>
      <div key={data?.id}>
        <h2>{data?.title}</h2>
        <p>{data?.body}</p>
      </div>
    </div>
  );
}
