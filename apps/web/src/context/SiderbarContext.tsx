import { type ReactNode, useContext, useState, createContext } from "react";

interface SidebarContextType {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const setOpen = (open: boolean) => setIsOpen(open);

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};
export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context)
    throw new Error("useSidebar must be used within a SidebarProvider");

  return context;
};
