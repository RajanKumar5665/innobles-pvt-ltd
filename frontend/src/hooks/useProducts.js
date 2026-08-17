import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { fetchProducts } from "../features/products/productsThunks";
import {
  selectProducts,
  selectProductsStatus,
  selectProductsError,
} from "../features/products/productsSlice";

export const useProducts = () => {
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectProducts);
  const status = useAppSelector(selectProductsStatus);
  const error = useAppSelector(selectProductsError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return { list, status, error };
};
