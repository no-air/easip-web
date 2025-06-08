export interface GetPostHomeResponse {
  currentPage: number;
  totalPage: number;
  itemPerPage: number;
  hasNext: boolean;
  results: {
    postId: string;
    title: string;
    tags: string[];
    houseSummaryResponses: HouseSummaryResponse[];
    scheduleDtos: ScheduleDto[];
  }[];
}

export interface GetPostDetailResponse {
  postId: string;
  postTitle: string;
  tags: string[];
  postPerHouseDetailResponses: PostPerHouseDetailResponse[];
}

export interface PostPushResponse {
  results: ScheduleDto[];
}

interface PostPerHouseDetailResponse {
  houseId: string;
  houseName: string;
  houseThumbnailUrl: string;
  houseAddress: string;
  representativeDeposit: number;
  representativeMonthlyRent: number;
  totalSupplyRoomCount: number;
  applicationConditionDtos: ApplicationConditionDto[];
  scheduleDtos: ScheduleDto[];
  postHouseConditionDtos: RoomRentalConditionResponse[];
  houseApplyUrl: string;
}

interface RoomRentalConditionResponse {
  supplyType: string;
  livingType: string;
  supplyRoomCount: number;
  minRatioDeposit: number;
  minRatioMonthlyRent: number;
  maxRatioDeposit: number;
  maxRatioMonthlyRent: number;
}

interface HouseSummaryResponse {
  houseId: string;
  houseThumbnailUrl: string;
  houseName: string;
  subscriptionState: string;
  applicationConditionDtos: ApplicationConditionDto[];
  rentDtos: RentDto[];
  districtName: string;
  latitude: number;
  longitude: number;
}

interface ApplicationConditionDto {
  content:
    | "청년"
    | "신혼부부"
    | "개인무주택"
    | "소득기준 2억언 이내(1인가구 기준)";
  isApplicable: boolean;
}

interface RentDto {
  deposit: number;
  monthlyRent: number;
}

interface ScheduleDto {
  id: string;
  title: string;
  start: string;
  end: string;
  isPushAlarmRegistered: true;
}
