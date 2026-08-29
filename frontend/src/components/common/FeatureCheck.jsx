import { Check } from "lucide-react";


const FeatureCheck = ({ className = "h-4 w-4", strokeWidth = 2.5, ...rest }) => (
  <Check
    className={`shrink-0 ${className}`}
    strokeWidth={strokeWidth}
    aria-hidden="true"
    {...rest}
  />
);

export default FeatureCheck;
