import { Button } from "@/components/ui/button";
import XontelLogo from "@/assets/icons/xontel.svg?react";
import { Menu } from "lucide-react";
import { useSidebarContext } from "@/context/SiderbarContext";
export function Header() {
  const { toggleSidebar } = useSidebarContext();
  return (
    <header className="fixed top-0 inset-x-0 h-16 px-6 z-50 bg-background border-b border-border flex items-center">
      <div className="flex-1 flex items-center justify-between">
        <Button variant={"ghost"} onClick={toggleSidebar} className="md:hidden">
          <Menu />
        </Button>

        <div className="max-md:order-3 flex size-8 items-center">
          <XontelLogo />
        </div>
        <h1 className="mx-auto text-lg font-bold text-center max-[250px]:hidden">
          HR Feedback Admin Panel
        </h1>
      </div>
    </header>
  );
}
