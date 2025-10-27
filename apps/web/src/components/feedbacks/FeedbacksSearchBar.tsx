import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { memo } from "react";

interface FeedbackSearchBar {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export const FeedbacksSearchBar = memo(
  ({ searchValue, onSearchChange }: FeedbackSearchBar) => {
    return (
      <div className="relative w-full">
        <Search className="absolute left-3 size-4 mt-2.5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by employee name..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 w-full"
        />
      </div>
    );
  }
);
