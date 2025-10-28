import { memo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
interface ComponentProps {
  inputText: string;
  setInputText: (text: string) => void;
  isSending: boolean;
  onSendMessage: (e: React.FormEvent) => Promise<void>;
}
export const ChatMessagesSend = memo(
  ({ inputText, setInputText, isSending, onSendMessage }: ComponentProps) => {
    return (
      <footer className="p-4 border-t bg-background">
        <form onSubmit={onSendMessage} className="flex gap-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isSending}
            className="flex-1"
          />
          <Button type="submit" disabled={isSending || !inputText.trim()}>
            {isSending ? "Sending..." : "Send"}
          </Button>
        </form>
      </footer>
    );
  }
);
