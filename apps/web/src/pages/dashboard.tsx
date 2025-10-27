import { FeedbackTable } from "@/components/feedbacks/FeedbacksTable";
import { FeedbacksSearchBar } from "@/components/feedbacks/FeedbacksSearchBar";
import Spinner from "@/assets/icons/spinner.svg?react";
import { useFeedbackContext } from "@/context/FeedbackContext";
import { useFeedbackSearch } from "@/hooks/useFeedbackSearch";
import { FeedbackKPIDistrubtion } from "@/components/feedbacks/FeedbackKPIDistribution";

export default function Dashboard() {
  const { feedbacks, isLoading } = useFeedbackContext();
  const { searchValue, handleSearchChange, targetFeedbacks } =
    useFeedbackSearch(feedbacks);
  //Note target feedbacks is the filtered feedbacks based on search it will be
  // equal to all feedbacks if search is empty

  if (isLoading)
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner className="animate-spin size-8 text-primary" />
      </div>
    );

  return (
    <>
      <div className="h-full p-6 flex flex-col gap-4 ">
        <div className="basis-1/2 w-1/4 ">
          <FeedbackKPIDistrubtion feedbacks={feedbacks} />
        </div>

        <div className="flex flex-col gap-2">
          <FeedbacksSearchBar
            searchValue={searchValue}
            onSearchChange={handleSearchChange}
          />
          <div className="overflow-y-auto  max-h-96">
            <FeedbackTable feedbacks={targetFeedbacks} />
          </div>
        </div>
      </div>
    </>
  );
}
