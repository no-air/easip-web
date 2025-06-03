export interface HouseResponse {
  houseId: string;
  houseName: string;
  tags: string[];
  houseThumbnailUrl: string[];
  houseAddress: string;
  nearSubwayStation: string;
  developerName: string;
  constructorName: string;
  firstRecruitmentDate: string;
  moveInDate: string;
  generalSupplyCount: number;
  generalSupplyRoomInfos: GeneralSupplyRoomInfo[];
  specialSupplyCount: 100;
  specialSupplyRoomInfos: SpecialSupplyRoomInfo[];
  floorPlanPictures: "https://soco.seoul.go.kr/cohome/cmmn/file/fileDown.do?atchFileId=356f0ab9e20e42f88b4c06e1c18e46ad&fileSn=12";
  latitude: number;
  longitude: number;
}

interface GeneralSupplyRoomInfo {
  type: string;
  exclusiveArea: number;
  applicationEligibility: string;
  totalRoomCount: number;
  deposit: number;
  monthlyRent: number;
  maintenanceFee: number;
}

interface SpecialSupplyRoomInfo {
  type: string;
  exclusiveArea: number;
  applicationEligibility: string;
  totalRoomCount: number;
  deposit: number;
  monthlyRent: number;
  maintenanceFee: number;
}
