import { Controller } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import type { GetPostDetailResponse } from "../../apis/dtos/posts";
import ConditionsRow from "../common";
import { formatDate } from "../../utils/date";
import { useFlutterStore } from "../../stores/flutter";
import Table from "../common/Table";

interface BodySwiperProps {
  setBodySwiper: (swiper: SwiperType) => void;
  imageSwiper: SwiperType | null;
  page: GetPostDetailResponse;
}

const BodySwiper = ({ setBodySwiper, imageSwiper, page }: BodySwiperProps) => {
  const { goToFlutterMove } = useFlutterStore((state) => state.actions);

  return (
    <Swiper
      className="text-[#1C1C1C] mt-4"
      centeredSlides
      onSwiper={setBodySwiper}
      modules={[Controller]}
      controller={{ control: imageSwiper }}
      noSwipingClass="no-swiping"
    >
      {page.postPerHouseDetailResponses.map(
        ({
          houseId,
          representativeDeposit,
          representativeMonthlyRent,
          totalSupplyRoomCount,
          houseName,
        }) => (
          <SwiperSlide
            className="flex flex-col gap-4 px-[calc(20px+5vw)] [&>div]:border-b [&>div]:border-gray-300 [&>div]:-mx-10 [&>div]:px-8 [&>div]:last:border-none"
            key={houseId}
          >
            <div className="flex justify-between items-baseline gap-2">
              <h2 className="font-semibold mb-4">{houseName}</h2>
              <button
                className="text-xs py-1 px-2 bg-[#2F82F4] text-white rounded font-normal min-w-fit"
                onClick={() => goToFlutterMove(`/house/${houseId}`)}
              >
                주택 보러가기
              </button>
            </div>
            <div className="flex justify-between gap-2 py-4">
              <div className="flex-1">
                <div className="text-xs text-[#A0A0A0]">보증금</div>
                <div className="font-medium">{representativeDeposit}~</div>
              </div>
              <div className="flex-1">
                <div className="text-xs text-[#A0A0A0]">월세</div>
                <div className="font-medium">{representativeMonthlyRent}</div>
              </div>
            </div>
            <div className="py-4">
              <div className="mb-6">
                <div className="text-xs text-[#A0A0A0]">공급호수</div>
                <div className="font-medium">{totalSupplyRoomCount}호</div>
              </div>
              <ConditionsRow
                applicationConditionDtos={
                  page.postPerHouseDetailResponses[0].applicationConditionDtos
                }
              />
            </div>
            <div className="py-4">
              <div className="text-xs">공급일정</div>
              <div className="flex flex-col gap-2 mt-2">
                {page.postPerHouseDetailResponses[0].scheduleDtos.map(
                  ({ id, end, start, title }) => (
                    <div
                      className="flex flex-col items-center border border-gray-300 rounded-t-lg"
                      key={id}
                    >
                      <div className="text-sm font-medium border-b w-full text-center py-1">
                        {title}
                      </div>
                      <div className="w-full text-xs py-2 flex items-center justify-center bg-[#F2F2F2]">
                        접수기간{" "}
                        {`${start ? formatDate(start) : ""} ~ ${
                          end ? formatDate(end) : ""
                        }`}
                      </div>
                    </div>
                  )
                )}
                <div>
                  <div className="text-xs text-[#A0A0A0] mb-1">
                    주택형(Type)별 임대조건
                  </div>
                  <div className="no-swiping">
                    <Table
                      ths={[
                        "공급유형",
                        "주거유형",
                        "전용면적",
                        "공급호수",
                        "최소 보증 비율 보증금",
                        "최소 보증 비율 월세",
                        "최대 보증 비율 보증금",
                        "최대 보증 비율 월세",
                      ]}
                      tds={[
                        ...page.postPerHouseDetailResponses[0].roomRentalConditionResponses.map(
                          ({
                            exclusiveArea,
                            livingType,
                            maxRatioDeposit,
                            maxRatioMonthlyRent,
                            minRatioDeposit,
                            minRatioMonthlyRent,
                            supplyRoomCount,
                            supplyType,
                          }) => [
                            supplyType,
                            livingType,
                            exclusiveArea,
                            supplyRoomCount,
                            minRatioDeposit,
                            minRatioMonthlyRent,
                            maxRatioDeposit,
                            maxRatioMonthlyRent,
                          ]
                        ),
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        )
      )}
    </Swiper>
  );
};

export default BodySwiper;
