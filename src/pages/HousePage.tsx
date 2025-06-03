import { useParams } from "react-router";
import { useHouseDetailQuery } from "../hooks/query/houses";
import Header from "../components/common/Header";
import HouseImageSwiper from "../components/house/ImageSwiper";
import HouseContent from "../components/house/Content";
import BookMark from "../components/house/Bookmark";

const HousePage = () => {
  const { houseId } = useParams<{ houseId: string }>();
  if (!houseId) {
    throw new Error("House ID is required");
  }
  const { data } = useHouseDetailQuery(houseId);

  return (
    <main className="flex flex-col min-h-screen relative overflow-x-hidden">
      <Header
        title={data.houseName}
        tags={data.tags}
        rightHeader={<BookMark />}
      />
      <div className="mt-4">
        <HouseImageSwiper
          images={data.houseThumbnailUrl.map((src) => ({
            src,
            alt: data.houseName,
          }))}
        />
      </div>
      <HouseContent data={data} />
      <div className="flex-1 min-h-16"></div>
    </main>
  );
};

export default HousePage;
