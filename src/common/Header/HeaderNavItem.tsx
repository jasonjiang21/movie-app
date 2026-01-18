import { NavLink } from "react-router-dom";
import { textColor } from "../../styles";
import { cn } from "../../utils/helper";

interface HeaderProps {
  link: { title: string; path: string };
  isNotFoundPage: boolean;
  showBg: boolean;
  badge?: number;
}

const HeaderNavItem = ({ link, showBg, isNotFoundPage, badge }: HeaderProps) => {
  return (
    <li className="relative">
      <NavLink
        to={link.path}
        className={({ isActive }) => {
          return cn(
            "nav-link",
            isActive
              ? ` active ${showBg ? textColor : `text-secColor`}`
              : ` ${
                  isNotFoundPage || showBg
                    ? "text-[#444] dark:text-gray-300 dark:hover:text-secColor hover:text-black"
                    : "text-gray-300 hover:text-secColor"
                }`
          );
        }}
        end
      >
        {link.title}
        {badge !== undefined && badge > 0 && (
          <span className="absolute -top-2 -right-3 bg-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
            {badge > 9 ? "9+" : badge}
          </span>
        )}
      </NavLink>
    </li>
  );
};

export default HeaderNavItem;
