import { Outlet } from "react-router";
import Layout from "@/components/layout/Layout";
import { SidebarProvider } from "@/context/SiderbarContext";
import { FeedbackProvider } from "@/context/FeedbackContext";
import { ConversationsProvider } from "@/context/ConversationsContext";
import { MessagesProvider } from "@/context/MessagesContext";
function App() {
  return (
    <>
      <SidebarProvider>
        <FeedbackProvider>
          <ConversationsProvider>
            <MessagesProvider>
              <Layout>
                <Outlet />
              </Layout>
            </MessagesProvider>
          </ConversationsProvider>
        </FeedbackProvider>
      </SidebarProvider>
    </>
  );
}

export default App;
