import { useParams } from "react-router";
import { useHouseDetailQuery } from "../hooks/query/houses";
import Header from "../components/common/Header";

const HousePage = () => {
  const { houseId } = useParams<{ houseId: string }>();
  if (!houseId) {
    throw new Error("House ID is required");
  }
  const { data } = useHouseDetailQuery(houseId);

  console.log("House Data:", data);

  return (
    <main className="flex flex-col min-h-screen relative">
      <Header title={data.houseName} tags={data.tags} rightHeader={<></>} />
    </main>
  );
};

export default HousePage;
