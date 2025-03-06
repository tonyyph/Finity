import { create } from "zustand";
import { request } from "@/api/functions/request";

interface DoRequestProps {
  url?: string | null;
  params?: Record<string, any>;
  query?: Record<string, any>;
  success?: (value?: any) => void;
  failure?: (value?: any) => void;
  ignoreResponse?: boolean;
  callback?: (value?: any) => void;
  usingRefresh?: boolean;
}

interface UseMachineStoreProps {
  data: any;
  isLoading: boolean;
  isSuccess: boolean;
  isPremium: boolean;
  message: string | null;
  doRequest: (props: DoRequestProps) => void;
  clearData: () => void;
}

const useHome = create<UseMachineStoreProps>()((set, get) => ({
  data: null,
  isLoading: false,
  isSuccess: false,
  message: "",
  isPremium: false,

  doRequest: ({
    url,
    params,
    query,
    success,
    failure,
    ignoreResponse,
    callback,
    usingRefresh = false,
  }: DoRequestProps) => {
    const { data } = get();
    if (data) {
      set((state) => ({ ...state }));
    } else {
      set((state) => ({ ...state, isLoading: true }));
    }

    request({
      method: "get",
      url: url || "/home",
      query,
      params,
      success: (result) => {
        if (ignoreResponse) return;
        set((prevState) => ({
          ...prevState,
          data: result,
          isLoading: false,
          isSuccess: true,
        }));
        if (typeof success === "function") {
          success(result);
        }
        if (callback) {
          callback(result);
        }
      },
      failure: (result) => {
        if (ignoreResponse) return;
        set((prevState) => ({
          ...prevState,
          isLoading: false,
          isSuccess: false,
          message: result,
        }));
        if (typeof failure === "function") {
          failure(result);
        }
      },
    });
  },

  clearData: () => {
    set((state) => ({
      ...state,
      data: null,
      isLoading: false,
      isSuccess: false,
      message: "",
    }));
  },
}));

export default useHome;
