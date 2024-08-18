// import React from 'react';
// import { useLocation } from 'react-router';
// import { posts } from '../data';
// import axios from 'axios'
// const Post = () => {
//   const location = useLocation();
//   const path = location.pathname.split('/')[2];
//   // axios.get('https://login-page-backend-me2p.onrender.com/auth/login/success', { withCredentials: true })
//   // .then(response => {
//   //   console.log(response.data);
//   // })
//   // .catch(error => {
//   //   console.error(error);
//   // });



//   // Find the post with the specified ID
//   const post = posts.find((p) => p.id.toString() === path);

//   // console.log(posts)
//   // Check if the post is undefined before accessing its properties
//   if (!post) {
//     return <div className="post">Post not found</div>;
//   }

//   console.log(location);

//   return (
//     <div className="post">
//       <img src={post.img} alt="xyz" className="postImg" />
//       <h1 className="postTitle">{post.title}</h1>
//       <p className="postDesc">{post.desc}</p>
//       <p className="postLongDesc">{post.longDesc}</p>
//     </div>
//   );
// };

// export default Post;


import { useLocation } from "react-router";
import { posts } from "../data";

const Post = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const post = posts.find((p) => p.id.toString() === path);

  console.log(location);
  return (
    <div className="post">
      <img src={post.img} alt="" className="postImg" />
      <h1 className="postTitle">{post.title}</h1>
      <p className="postDesc">{post.desc}</p>
      <p className="postLongDesc">{post.longDesc}</p>
    </div>
  );
};

export default Post;