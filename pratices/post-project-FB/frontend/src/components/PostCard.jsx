import React from "react";

const PostCard = ({data}) => {
  return (
    <div className="w-full rounded-2xl overflow-hidden flex flex-col gap-4 bg-black px-2 py-7">
      <div className="w-full ">
        <img
          className="object-cover"
          src={data.image}
          alt="iamge"
        />
      </div>
      <div className="px-4 text-sm font-sans ">
        <p>Caption : {data.caption} </p>
      </div>
    </div>
  );
};

export default PostCard;
