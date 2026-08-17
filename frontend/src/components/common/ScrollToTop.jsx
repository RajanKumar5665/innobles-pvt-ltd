import { useScrollToTop } from "../../hooks/useScrollToTop";

/** Scrolls the window to the top whenever the route changes. */
const ScrollToTop = () => {
  useScrollToTop();
  return null;
};

export default ScrollToTop;
