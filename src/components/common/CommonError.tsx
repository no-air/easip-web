import { useEffect } from "react";
import { useFlutterStore } from "../../stores/flutter";
import { HttpError } from "../../utils/https";

interface CommonErrorProps {
  error: HttpError | Error;
  resetErrorBoundary: () => void;
}

const CommonError = ({ error }: CommonErrorProps) => {
  const { flutterBack } = useFlutterStore((state) => state.actions);

  useEffect(() => {
    if (error instanceof HttpError) {
      if (error.error?.type === "ALERT") {
        alert(error.error.message);
      }
    }
  }, [error]);

  return (
    <div className="min-h-screen py-12 px-4 flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">문제가 발생했습니다</h1>
      <div>
        <p className="text-lg mt-4">
          {error instanceof HttpError
            ? `${error.error?.message || "알 수 없는 오류가 발생했습니다."}`
            : "알 수 없는 오류가 발생했습니다."}
        </p>
        <p className="text-lg mt-2">
          잠시 후 다시 시도하시거나, 문제가 지속되면 관리자에게 문의해 주세요.
        </p>
      </div>
      <button
        onClick={flutterBack}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
      >
        뒤로가기
      </button>
    </div>
  );
};

export default CommonError;
