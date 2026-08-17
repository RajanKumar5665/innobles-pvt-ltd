import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { fetchBlogs } from "../features/blogs/blogsThunks";
import {
  selectBlogs,
  selectBlogsStatus,
  selectBlogsError,
  selectRecentBlogs,
} from "../features/blogs/blogsSlice";

export const useBlogs = () => {
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectBlogs);
  const recent = useAppSelector(selectRecentBlogs);
  const status = useAppSelector(selectBlogsStatus);
  const error = useAppSelector(selectBlogsError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogs());
    }
  }, [status, dispatch]);

  return { list, recent, status, error };
};
