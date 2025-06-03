import { useState } from "react";
import { cn } from "../../utils/lib";
import BellIcon from "../icons/Bell";
import { usePostPushMutation, usePostPushQuery } from "../../hooks/query/posts";
import { useParams } from "react-router";
import CheckIcon from "../icons/Check";
import LeftArrowIcon from "../icons/LeftArrow";
import { useFlutterStore } from "../../stores/flutter";

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
  const { mutate } = usePostPushMutation(postId);
  const { data } = usePostPushQuery(postId);
  const { flutterBack } = useFlutterStore((state) => state.actions);
  const hasPush = data.results.some(
    (schedule) => schedule.isPushAlarmRegistered
  );

  return (
    <>
      <div className="h-16"></div>
      <div className="px-8 pb-2 fixed top-0 bg-white border-b border-gray-300 w-screen z-50">
        <div className="relative">
          <div className="flex justify-between items-center gap-2 -ml-6">
            <button
              className="p-2 h-8 flex items-center justify-center"
              onClick={flutterBack}
            >
              <LeftArrowIcon />
            </button>
            <h1 className="flex-1">{postTitle}</h1>
            <button
              className="p-2 h-8 w-8 flex items-center justify-center"
              onClick={() => setBellOpen((prev) => !prev)}
            >
              <BellIcon className={cn({ "fill-[#EC4C24]": hasPush })} />
            </button>
            {bellOpen && (
              <div className="absolute top-12 right-0 py-2 px-3 rounded-xl border border-gray-700 bg-white text-sm">
                {data.results.map(({ id, title, isPushAlarmRegistered }) => (
                  <button
                    className={cn(
                      "flex justify-between gap-4 items-baseline w-full",
                      {
                        "text-gray-400": !isPushAlarmRegistered,
                      }
                    )}
                    key={id}
                    onClick={() =>
                      mutate(
                        { scheduleId: id },
                        { onSettled: () => setBellOpen(false) }
                      )
                    }
                  >
                    <span>{title}</span>
                    <span>
                      <CheckIcon
                        className={cn({
                          "fill-gray-400": !isPushAlarmRegistered,
                        })}
                      />
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-3 text-white text-xs ml-6 mt-1">
            {tags.map((tag, index) => (
              <span
                className={cn("py-0.5 px-1.5 rounded", bageColors[index % 3])}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostHeader;
