import { cn } from "../../utils/lib";
import { useParams } from "react-router";
import LeftArrowIcon from "../icons/LeftArrow";
import { useFlutterStore } from "../../stores/flutter";

interface HeaderProps {
  tags: string[];
  postTitle: string;
  rightHeader?: React.ReactNode;
}

const bageColors = ["bg-[#EC4C24]", "bg-[#2492EC]", "bg-[#EA7E11]"];

const Header = ({ postTitle, tags, rightHeader }: HeaderProps) => {
  const { postId } = useParams();
  if (!postId) {
    throw new Error("Post ID is required");
  }
  const { flutterBack } = useFlutterStore((state) => state.actions);

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
            {rightHeader}
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

export default Header;
