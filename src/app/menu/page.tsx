"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { useForm } from "../hooks/useForm";

const page = () => {
  const { formState, onInputChange } = useForm();

  const [cardProps, setCardProps] = useState([
    {
      id: "",
      title: "",
      description: "",
      user_id: "",
    },
  ]);

  const [formFlag, setFormFlag] = useState(false);

  const chargePosts = async () => {
    const data = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/posts");
    setCardProps(data.data.reverse());
  };

  useEffect(() => {
    chargePosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, post }: any = formState;
    if(title===undefined || title === '') {
      return
    }
    if(post===undefined || post === '') {
      return
    }
    await axios
      .post(process.env.NEXT_PUBLIC_API_URL + "/posts", {
        title,
        description: post,
        user_id: localStorage.getItem("id"),
      })
      .then(async () => {
        await chargePosts();
      });
  };

  const handlePost = () => {
    if(formFlag)
    setFormFlag(false);
    else
    setFormFlag(true);
  }

  return (
    <div>
      <main className="p-7 sticky top-0 z-20 right-0 left-0 bg-[#68666682] backdrop-blur-lg">
        <div className="flex flex-col gap-4 items-center mb-3">
          <h1 className="text-2xl font-bold text-center">Make a post 🫡</h1>
          <button onClick={handlePost} className="bg-purple-600 p-2 rounded text-white hover:bg-purple-700 transition-colors">
            Post 🤖
          </button>
        </div>
        {
          formFlag
           &&(
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 items-center w-fill mx-auto my-auto"
            >
              <input
                name="title"
                onChange={onInputChange}
                type="text"
                placeholder="Title"
                className="border p-2 rounded-md w-[50%] h-8 bg-gray-300"
              />
              <textarea
                name="post"
                onChange={onInputChange}
                placeholder="Content :)"
                className="border p-2 rounded-md w-[50%] h-28 resize-none bg-gray-300"
              />
              <button className="bg-purple-600 p-2 rounded text-white hover:bg-purple-700 transition-colors">
                Make the post 👌
              </button>
            </form>
           )          
        }
      </main>
      <ul className="relative z-10">
        {
          //@ts-ignore
          cardProps.map((item) => {
            return (
              <li key={item.id}>
                <Card title={item.title} description={item.description} />
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default page;
