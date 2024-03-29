import React from "react";
import { IBlogPost } from "./BlogList";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";

interface Props {
  blogPost: IBlogPost;
  height?: number;
  width?: number;
}

const BlogListRow = ({ blogPost, height, width }: Props) => {
  if (!height || !width) {
    height = 48;
    width = 80;
  }
  const navigate = useNavigate();
  return (
    <article className="my-4">
      <div className="gap-4 md:flex">
        <div
          className="min-h-48 min-w-80 max-w-80 max-h-48 cursor-pointer overflow-hidden md:w-1/3"
          onClick={() => {
            navigate(`/blog/content/${blogPost._id}`);
          }}
        >
          <LazyLoadImage
            className="object-cover"
            height={height * 4}
            width={width * 4}
            alt="Title image"
            src={blogPost.blogPostThumbnail}
            effect="blur"
            wrapperProps={{
              // If you need to, you can tweak the effect transition using the wrapper style.
              style: { transitionDelay: "1s" },
            }}
            style={{ transition: "transform 0.8s ease" }}
            onMouseEnter={(e: any) => {
              e.currentTarget.style.transform = "scale(1.2)";
            }}
            onMouseLeave={(e: any) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          />
        </div>

        <div className="flex flex-col gap-4 md:w-2/3">
          <h1
            className="cursor-pointer text-xl font-bold"
            onClick={() => {
              navigate(`/blog/content/${blogPost._id}`);
            }}
          >
            {blogPost.blogPostTitle}
          </h1>
          <p className="text-xl text-gray-500">{blogPost.blogPostTag}</p>
          <p>{blogPost.blogPostDescription}</p>
        </div>
      </div>
    </article>
  );
};

export default BlogListRow;
