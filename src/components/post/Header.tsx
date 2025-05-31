import { useState } from "react";
import { cn } from "../../utils/lib";
import BellIcon from "../icons/Bell";
import { usePostPushQuery } from "../../hooks/query/posts";
import { useParams } from "react-router";
import CheckIcon from "../icons/Check";

interface PostHeaderProps {
  tags: string[];
  postTitle: string;
}

const bageColors = ["bg-[#EC4C24]", "bg-[#2492EC]", "bg-[#EA7E11]"];

const PostHeader = ({ postTitle, tags }: PostHeaderProps) => {
  const { postId } = useParams();
  if (!postId) {
    throw new Error("Post ID is required");
  }
  const [bellOpen, setBellOpen] = useState(false);
  const { data } = usePostPushQuery(postId);
  const hasPush = data.results.some(
    (schedule) => schedule.isPushAlarmRegistered
  );

  return (
    <div className="px-8 pb-2 relative">
      <div className="flex items-center gap-3 text-white text-xs">
        {tags.map((tag, index) => (
          <span className={cn("py-0.5 px-1.5 rounded", bageColors[index % 3])}>
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between gap-3">
        <h1>{postTitle}</h1>
        <button
          className="p-2 h-6 w-6"
          onClick={() => setBellOpen((prev) => !prev)}
        >
          <BellIcon className={cn({ "fill-[#EC4C24]": hasPush })} />
        </button>
        {bellOpen && (
          <div className="absolute top-14 right-6 py-2 px-3 rounded-xl border border-gray-700 bg-white text-sm">
            {data.results.map(({ title, isPushAlarmRegistered }) => (
              <div
                className={cn("flex justify-between gap-4 items-baseline", {
                  "text-gray-400": !isPushAlarmRegistered,
                })}
                key={title}
              >
                <span>{title}</span>
                <span>
                  <CheckIcon
                    className={cn({
                      "fill-gray-400": !isPushAlarmRegistered,
                    })}
                  />
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostHeader;
