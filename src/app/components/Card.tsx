'use client'
import { Avatar } from "@mui/material"
import { deepPurple } from '@mui/material/colors';
import React from "react";

interface Card {
    title: string,
    description: string
}

const Card: React.FC<Card> = ({ title, description }) => {
  return (
    <section className="w-[50%] mx-auto my-auto card rounded p-4 mt-3">
        <div className="flex gap-4 items-center">
          <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
          <h3>{title}</h3>
        </div>
        <p className="mt-3">{description}</p>
      </section>
  )
}

export default Card
