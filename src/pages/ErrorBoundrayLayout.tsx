import { ErrorBoundary } from "react-error-boundary";
import CommonError from "../components/common/CommonError";
import { Outlet } from "react-router";

const ErrorBoundrayLayout = () => {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <CommonError error={error} resetErrorBoundary={resetErrorBoundary} />
      )}
    >
      <Outlet />
    </ErrorBoundary>
  );
};

export default ErrorBoundrayLayout;
