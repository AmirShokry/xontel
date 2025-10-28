interface ChatMessagesHeaderProps {
  employeeName: string;
}

export function ChatMessagesHeader({ employeeName }: ChatMessagesHeaderProps) {
  return (
    <header className="p-4 bg-background">
      <h2 className="text-lg font-semibold">{employeeName}</h2>
    </header>
  );
}
