import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Feedback } from "@/types/feedbacks";

interface FeedbackTableProps {
  feedbacks: Feedback[];
}

export function FeedbackTable({ feedbacks }: FeedbackTableProps) {
  if (feedbacks.length === 0)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No feedbacks yet..</p>
      </div>
    );

  return (
    <Table>
      <TableHeader className="bg-muted sticky top-0 z-10 w-full">
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Employee Name</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className=" z-9">
        {feedbacks.map((feedback) => (
          <TableRow key={feedback.id}>
            <TableCell className="text-muted-foreground">
              {feedback.date}
            </TableCell>
            <TableCell className="font-medium">
              {feedback.employeeName}
            </TableCell>
            <TableCell>{feedback.score} stars</TableCell>

            <TableCell className="max-w-md truncate" title={feedback.notes}>
              {feedback.notes}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
