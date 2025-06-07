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
  floorPlanPictures: string[];
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
