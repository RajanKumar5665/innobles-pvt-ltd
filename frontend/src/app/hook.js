import { useDispatch, useSelector } from "react-redux";

// Typed-friendly hooks (kept minimal for a JS project)
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

