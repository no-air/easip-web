export interface GetPostHomeResponse {
  currentPage: number;
  totalPage: number;
  itemPerPage: number;
  hasNext: boolean;
  results: {
    postId: string;
    title: string;
    applicationConditionDtos: applicationConditionDto[];
    houseSummaryResponses: houseSummaryResponse[];
    rentDtos: rentDto[];
    scheduleDtos: scheduleDto[];
  }[];
}

interface houseSummaryResponse {
  houseId: string;
  houseThumbnailUrl: string;
  houseName: string;
  subscriptionState: string;
  districtName: string;
  latitude: number;
  longitude: number;
}

interface applicationConditionDto {
  content:
    | "청년"
    | "신혼부부"
    | "개인무주택"
    | "소득기준 2억언 이내(1인가구 기준)";
  isApplicable: boolean;
}

interface rentDto {
  deposit: number;
  monthlyRent: number;
}

interface scheduleDto {
  id: string;
  title: string;
  start: string;
  end: string;
  isPushAlarmRegistered: true;
}
