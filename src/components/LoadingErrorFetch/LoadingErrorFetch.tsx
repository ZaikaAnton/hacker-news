interface LoadingErrorFetchProps {
  isLoading: boolean;
  error: string | null;
  children: React.ReactNode;
}
function LoadingErrorFetch({ isLoading, error, children }: LoadingErrorFetchProps) {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return <>{children}</>;
}

export default LoadingErrorFetch;
