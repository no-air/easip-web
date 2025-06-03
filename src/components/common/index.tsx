import type { GetPostHomeResponse } from "../../apis/dtos/posts";
import { cn } from "../../utils/lib";

interface ConditionsRowProps {
  applicationConditionDtos: GetPostHomeResponse["results"][number]["houseSummaryResponses"][number]["applicationConditionDtos"];
}

const ConditionsRow = ({ applicationConditionDtos }: ConditionsRowProps) => {
  return (
    <div className="flex flex-col mt-5 gap-2">
      <div className="flex gap-4 items-baseline">
        <span className="text-sm">지원조건</span>
        <span className="text-xs before:w-2 before:h-2 before:bg-[#2F82F4] before:inline-block before:mr-1">
          해당
        </span>
        <span className="text-xs before:w-2 before:h-2 before:bg-[#E2E2E2] before:inline-block before:mr-1">
          비해당
        </span>
      </div>
      <div className="flex gap-2 flex-wrap">
        {applicationConditionDtos
          .sort((a, b) => (a.isApplicable ? -1 : b.isApplicable ? 1 : 0))
          .map(({ content, isApplicable }) => (
            <div
              className={cn(
                "px-4 py-1.5 rounded text-xs font-normal",
                isApplicable
                  ? "bg-[#2F82F4] text-white"
                  : "bg-[#E2E2E2] text-[#868686]"
              )}
              key={content}
            >
              {content}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ConditionsRow;
