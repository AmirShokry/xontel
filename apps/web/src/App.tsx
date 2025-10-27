import { Outlet } from "react-router";
import Layout from "@/components/layout/Layout";
import { SidebarProvider } from "@/context/SiderbarContext";
import { FeedbackProvider } from "@/context/FeedbackContext";
function App() {
  return (
    <>
      <SidebarProvider>
        <FeedbackProvider>
          <Layout>
            <Outlet />
          </Layout>
        </FeedbackProvider>
      </SidebarProvider>
    </>
  );
}

export default App;
