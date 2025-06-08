export interface APICommonError {
  code: string;
  message: string;
  type: "ALERT" | "TOAST";
}
