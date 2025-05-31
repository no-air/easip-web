import { useState } from "react";
import { cn } from "../../utils/lib";
import BellIcon from "../icons/Bell";

interface PostHeaderProps {
  tags: string[];
  postTitle: string;
}

const bageColors = ["bg-[#EC4C24]", "bg-[#2492EC]", "bg-[#EA7E11]"];

const PostHeader = ({ postTitle, tags }: PostHeaderProps) => {
  const [bellOpen, setBellOpen] = useState(false);

  return (
    <div className="px-8 pb-2">
      <div className="flex items-center gap-3 text-white text-xs">
        {tags.map((tag, index) => (
          <span className={cn("py-0.5 px-1.5 rounded", bageColors[index % 3])}>
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between gap-3">
        <h1>{postTitle}</h1>
        <button className="p-2 h-6 w-6">
          <BellIcon className="fill-[#EC4C24]" />
        </button>
      </div>
    </div>
  );
};

export default PostHeader;
