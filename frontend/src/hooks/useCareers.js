import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { fetchCareers } from "../features/careers/careersThunks";
import { selectCareers, selectCareersStatus, selectCareersError } from "../features/careers/careersSlice";

export const useCareers = () => {
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectCareers);
  const status = useAppSelector(selectCareersStatus);
  const error = useAppSelector(selectCareersError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCareers());
    }
  }, [status, dispatch]);

  return { list, status, error };
};
