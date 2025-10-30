import { Outlet } from "react-router";
import Layout from "@/components/layout/Layout";
import { SidebarProvider } from "@/context/SiderbarContext";
import { FeedbackProvider } from "@/context/FeedbackContext";
import { ConversationsProvider } from "@/context/ConversationsContext";
import { MessagesProvider } from "@/context/MessagesContext";
import { NotificationsProvider } from "@/context/NotificationsContext";

function App() {
  return (
    <>
      <SidebarProvider>
        <FeedbackProvider>
          <ConversationsProvider>
            <MessagesProvider>
              <NotificationsProvider>
                <Layout>
                  <Outlet />
                </Layout>
              </NotificationsProvider>
            </MessagesProvider>
          </ConversationsProvider>
        </FeedbackProvider>
      </SidebarProvider>
    </>
  );
}

export default App;
