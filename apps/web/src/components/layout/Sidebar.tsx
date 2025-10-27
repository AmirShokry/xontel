import { Link, useLocation } from "react-router";

import { useSidebarContext } from "@/context/SiderbarContext";

const NAV_ITEMS = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/chat", label: "Chat" },
];

export function Sidebar() {
  const { pathname } = useLocation();
  const { isOpen } = useSidebarContext();

  return (
    <>
      {isOpen ? <MobileBackdrop /> : null}
      <aside
        className={`fixed top-16 w-52 h-full bg-sidebar border-r  border-sidebar-border overflow-y-auto transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          `}
      >
        <nav className="p-4 flex flex-col gap-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-sm
                ${
                  pathname === item.path
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }
                `}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}

/**
 * Adds a semi-transparent backdrop for mobile sidebar.
 */
function MobileBackdrop() {
  const { setOpen } = useSidebarContext();
  return (
    <div
      className="fixed inset-0 bg-black/50 z-30 md:hidden"
      onClick={() => setOpen(false)}
    />
  );
}
