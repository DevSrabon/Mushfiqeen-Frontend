import moment from "moment";

export const timeAgo = (createdAt) => {
  const duration = moment.duration(moment().diff(moment(createdAt)));
  const seconds = duration.seconds();
  const minutes = duration.minutes();
  const hours = duration.hours();
  const days = duration.days();
  const years = duration.years();

  if (years > 0) {
    return `${years}y ago`;
  } else if (days > 0) {
    return `${days}d ago`;
  } else if (hours > 0) {
    return `${hours}h ago`;
  } else if (minutes > 0) {
    return `${minutes}m ago`;
  } else {
    return `${seconds}s ago`;
  }
};
