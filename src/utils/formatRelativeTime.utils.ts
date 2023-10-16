import { formatDistanceToNow, parseISO } from "date-fns";

export const formatRelativeTime = (createdAt: string): string => {
  const date = parseISO(createdAt);

  const options = {
    addSuffix: true,
  };

  const timeDifference = formatDistanceToNow(date, options);

  return timeDifference;
};
