import { useParams } from "react-router";
import BookMarkIcon from "../icons/Bookmark";
import { cn } from "../../utils/lib";
import {
  useIsHouseBookmarkedQuery,
  useToggleHouseBookmarkMutate,
} from "../../hooks/query/houses";

const BookMark = () => {
  const { houseId } = useParams<{ houseId: string }>();
  if (!houseId) {
    throw new Error("House ID is required");
  }
  const { data } = useIsHouseBookmarkedQuery(houseId);
  const { mutate } = useToggleHouseBookmarkMutate();

  return (
    <button onClick={() => mutate(houseId)} className="p-2">
      <BookMarkIcon className={cn({ "fill-[#EC4C24]": data })} />
    </button>
  );
};

export default BookMark;
