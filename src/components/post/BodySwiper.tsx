import { Controller } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import type { GetPostDetailResponse } from "../../apis/dtos/posts";
import ConditionsRow from "../common";
import { formatDate } from "../../utils/date";

interface BodySwiperProps {
  setBodySwiper: (swiper: SwiperType) => void;
  imageSwiper: SwiperType | null;
  page: GetPostDetailResponse;
}

const BodySwiper = ({ setBodySwiper, imageSwiper, page }: BodySwiperProps) => {
  return (
    <Swiper
      className="text-[#1C1C1C] mt-4"
      centeredSlides
      onSwiper={setBodySwiper}
      modules={[Controller]}
      controller={{ control: imageSwiper }}
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
            className="flex flex-col gap-4 px-[calc(20px+5vw)] [&>div]:border-b [&>div]:border-gray-300 [&>div]:-mx-10 [&>div]:px-8"
            key={houseId}
          >
            <div className="flex justify-between items-baseline gap-2">
              <h2 className="font-semibold mb-4">{houseName}</h2>
              <button className="text-xs py-1 px-2 bg-[#2F82F4] text-white rounded font-normal min-w-fit">
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
                  <div className="overflow-auto">
                    <table className="w-full">
                      <thead className="text-[#767676] text-xs bg-[#CFCFCF] [&_th]:py-1 [&_th]:px-2 [&_th]:break-keep border-b border-[#A0A0A0] [&_th]:border-r [&_th]:last:border-none [&_th]:border-[#A0A0A0]">
                        <tr>
                          <th>공급유형</th>
                          <th>주거유형</th>
                          <th>전용면적</th>
                          <th>공급호수</th>
                          <th>최소 보증 비율 보증금</th>
                          <th>최소 보증 비율 월세</th>
                          <th>최대 보증 비율 월세</th>
                          <th>최대 보증 비율 월세</th>
                        </tr>
                      </thead>
                      <tbody className="text-xs font-medium bg-[#F9F9F9] [&_td]:py-1 [&_td]:px-2 [&_td]:break-keep [&_td]:border-r [&_td]:border-[#CFCFCF] [&_td]:last:border-none text-center">
                        {page.postPerHouseDetailResponses[0].roomRentalConditionResponses.map(
                          (
                            {
                              exclusiveArea,
                              livingType,
                              maxRatioDeposit,
                              maxRatioMonthlyRent,
                              minRatioDeposit,
                              minRatioMonthlyRent,
                              supplyRoomCount,
                              supplyType,
                            },
                            index
                          ) => (
                            <tr key={index}>
                              <td>{supplyType}</td>
                              <td>{livingType}</td>
                              <td>{exclusiveArea}</td>
                              <td>{supplyRoomCount}</td>
                              <td>{minRatioDeposit}</td>
                              <td>{minRatioMonthlyRent}</td>
                              <td>{maxRatioDeposit}</td>
                              <td>{maxRatioMonthlyRent}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
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
