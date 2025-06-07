import { useState } from "react";
import { usePostPushMutation, usePostPushQuery } from "../../hooks/query/posts";
import BellIcon from "../icons/Bell";
import { cn } from "../../utils/lib";
import CheckIcon from "../icons/Check";
import { useParams } from "react-router";

const PostNoticeBell = () => {
  const { postId } = useParams<{ postId: string }>();
  if (!postId) {
    throw new Error("Post ID is required");
  }
  const [bellOpen, setBellOpen] = useState(false);
  const { mutate } = usePostPushMutation(postId);
  const { data } = usePostPushQuery(postId);
  const hasPush = data.results.some(
    (schedule) => schedule.isPushAlarmRegistered
  );
  return (
    <>
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
    </>
  );
};

export default PostNoticeBell;
