import { useFlutterStore } from "../stores/flutter";

const NotFoundPage = () => {
  const { flutterBack } = useFlutterStore((state) => state.actions);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="mt-4 text-xl text-gray-700">
        해당 페이지를 찾을 수 없습니다.
      </p>
      <button
        onClick={flutterBack}
        className="mt-6 text-blue-500 hover:underline"
      >
        뒤로가기
      </button>
    </div>
  );
};

export default NotFoundPage;
