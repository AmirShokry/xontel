import { Outlet } from "react-router";
import Layout from "@/components/layout/Layout";
import { SidebarProvider } from "@/context/SiderbarContext";
function App() {
  return (
    <>
      <SidebarProvider>
        <Layout>
          <Outlet />
        </Layout>
      </SidebarProvider>
    </>
  );
}

export default App;
