import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { serviceMegaMenu } from "../../data/dummyData";
import Icon from "./Icon";

const ServicesMegaMenu = ({ onNavigate }) => (
  <div className="border-t border-line bg-white shadow-xl">
    <div className="container-x py-8">
      <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {serviceMegaMenu.map((category) => (
          <div key={category.id}>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange">
                <Icon icon={category.icon} className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                {category.title}
              </h3>
            </div>
            <ul className="space-y-2">
              {category.items.map((item) => (
                <li key={item}>
                  <Link
                    to="/services"
                    onClick={onNavigate}
                    className="group flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-brand-orange"
                  >
                    <ChevronRight
                      size={12}
                      className="shrink-0 text-slate-400 transition-colors group-hover:text-brand-orange"
                      aria-hidden="true"
                    />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ServicesMegaMenu;
