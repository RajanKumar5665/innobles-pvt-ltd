import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { fetchAbout } from "../features/about/aboutThunks";
import {
  selectAbout,
  selectAboutStatus,
  selectAboutError,
} from "../features/about/aboutSlice";


export const useAbout = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAbout);
  const status = useAppSelector(selectAboutStatus);
  const error = useAppSelector(selectAboutError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAbout());
    }
  }, [status, dispatch]);

  return { data, status, error };
};