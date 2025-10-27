import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import { useFeedbackRatings } from "@/hooks/useFeedbackRatings";
import type { Feedback } from "@/types/feedbacks";

const chartConfig = {
  count: {
    label: "Feedbacks",
  },
  "1": {
    label: "1",
    color: "var(--chart-1)",
  },
  "2": {
    label: "2",
    color: "var(--chart-2)",
  },
  "3": {
    label: "3",
    color: "var(--chart-3)",
  },
  "4": {
    label: "4",
    color: "var(--chart-4)",
  },
  "5": {
    label: "5",
    color: "var(--chart-5)",
  },
};
interface FeedbackKPIDistributionProps {
  feedbacks: Feedback[];
}

export function FeedbackKPIDistrubtion({
  feedbacks,
}: FeedbackKPIDistributionProps) {
  const { ratings } = useFeedbackRatings(feedbacks);
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>KPI Score Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => `Score ${value}`}
                  formatter={(value, _name, props) => [
                    `${props.payload.percentage.toFixed(1)}% (${value} feedbacks)`,
                    ` Score ${props.payload.rating}`,
                  ]}
                />
              }
            />
            <Pie
              data={ratings}
              dataKey="count"
              nameKey="rating"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ percentage }) =>
                percentage > 0 ? `${percentage.toFixed(1)}%` : ""
              }
              labelLine={false}
            >
              {ratings.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="rating" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
