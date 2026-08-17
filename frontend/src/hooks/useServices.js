import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { fetchServices } from "../features/services/servicesThunks";
import {
  selectServices,
  selectServicesStatus,
  selectServicesError,
} from "../features/services/servicesSlice";

/**
 * Loads services from the Redux store (dispatching once on first use)
 * and exposes { list, status, error } for loading/empty/error UI.
 */
export const useServices = () => {
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectServices);
  const status = useAppSelector(selectServicesStatus);
  const error = useAppSelector(selectServicesError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchServices());
    }
  }, [status, dispatch]);

  return { list, status, error };
};