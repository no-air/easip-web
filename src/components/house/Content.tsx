import type { HouseResponse } from "../../apis/dtos/houses";
import { formatDate } from "../../utils/date";
import Table from "../common/Table";
import HouseImageSwiper from "./ImageSwiper";

interface HouseContentProps {
  data: HouseResponse;
}

const HouseContent = ({ data }: HouseContentProps) => {
  return (
    <div className="flex flex-col gap-4 py-4 text-sm [&>div]:border-t [&>div]:border-[#A0A0A0] [&>div]:pt-2 [&>div]:px-8 [&>div_span]:text-xs [&>div_span]:text-[#A0A0A0] text-[#1C1C1C]">
      <div>
        <span>주소</span>
        <div>{data.houseAddress}</div>
      </div>
      <div className="flex gap-2 justify-between [&>div]:flex-1">
        <div>
          <span>주택명</span>
          <div>{data.houseName}</div>
        </div>
        <div>
          <span>지하철역</span>
          <div>{data.nearSubwayStation}</div>
        </div>
      </div>
      <div className="flex gap-2 justify-between [&>div]:flex-1">
        <div>
          <span>시행사</span>
          <div>{data.developerName}</div>
        </div>
        <div>
          <span>시공사</span>
          <div>{data.constructorName}</div>
        </div>
      </div>
      <div className="flex gap-2 justify-between [&>div]:flex-1">
        <div>
          <span>최초모집공고일</span>
          <div>{formatDate(data.firstRecruitmentDate)}</div>
        </div>
        <div>
          <span>입주(예정)일</span>
          <div>{formatDate(data.moveInDate)}</div>
        </div>
      </div>
      <div className="flex gap-2 flex-col">
        <div>입주현황</div>
        <span>일반공급:{data.generalSupplyCount}</span>
        <Table
          ths={[
            "구분",
            "공급유형",
            "신청자격",
            "전체세대수",
            "보증금",
            "월임대료",
            "(예상)관리비",
          ]}
          tds={data.generalSupplyRoomInfos.map((info) => [
            info.type,
            info.exclusiveArea,
            info.applicationEligibility,
            info.totalRoomCount,
            info.deposit,
            info.monthlyRent,
            info.maintenanceFee,
          ])}
        />
        <span>특별공급:{data.specialSupplyCount}</span>
        <Table
          ths={[
            "구분",
            "공급유형",
            "신청자격",
            "전체세대수",
            "보증금",
            "월임대료",
            "(예상)관리비",
          ]}
          tds={data.specialSupplyRoomInfos.map((info) => [
            info.type,
            info.exclusiveArea,
            info.applicationEligibility,
            info.totalRoomCount,
            info.deposit,
            info.monthlyRent,
            info.maintenanceFee,
          ])}
        />
      </div>
      <div className="!px-0">
        <div className="px-8">평면도</div>
        <HouseImageSwiper
          images={data.floorPlanPictures.map((src) => ({
            src: src,
            alt: `${data.houseName} 평면도`,
          }))}
        />
      </div>
      <div>
        <div>위치</div>
        <div>지도</div>
      </div>
    </div>
  );
};

export default HouseContent;
