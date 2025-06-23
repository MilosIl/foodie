import { Provider } from "react-redux";
import store from "@/store/store.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

const ProviderWrapper = ({ children }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>{children}</Provider>
      </QueryClientProvider>
    </>
  );
};

export { ProviderWrapper };
