import { useParams } from "react-router";
import { useHouseDetailQuery } from "../hooks/query/houses";
import Header from "../components/common/Header";
import HouseImageSwiper from "../components/house/ImageSwiper";

const HousePage = () => {
  const { houseId } = useParams<{ houseId: string }>();
  if (!houseId) {
    throw new Error("House ID is required");
  }
  const { data } = useHouseDetailQuery(houseId);

  return (
    <main className="flex flex-col min-h-screen relative">
      <Header title={data.houseName} tags={data.tags} rightHeader={<></>} />
      <div>
        <HouseImageSwiper
          images={data.houseThumbnailUrl.map((url) => ({
            url,
            alt: data.houseName,
          }))}
        />
      </div>
    </main>
  );
};

export default HousePage;
