import React from 'react'
import '../App.css'
import { Link } from "react-router-dom";

export const Card = ({ post }) => {
  return (
    <div className="card">
      <Link className="link" to={`/post/${post.id}`}>

        <span className="title">{post.title}</span>
        <img src={post.img} alt="xyz" className="img" />
        <p className="desc">{post.desc}</p>
        <button className="cardButton">Read More</button>
      </Link>
    </div>
  );
};
