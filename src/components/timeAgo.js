import moment from "moment";
import React, { useMemo } from "react";
import { Text } from "react-native";
import colors from "../theme/Colors";
import TextSmall from "./textSmall";

const TimeAgo = ({ createdAt }) => {
  const duration = useMemo(
    () => moment.duration(moment().diff(moment(createdAt))),
    [createdAt]
  );
  const seconds = duration.seconds();
  const minutes = duration.minutes();
  const hours = duration.hours();
  const days = duration.days();
  const years = duration.years();

  if (years > 0) {
    return (
      <TextSmall style={styles.timeAgo}>
        {years}y <Text style={styles.timeAgoText}>ago</Text>
      </TextSmall>
    );
  } else if (days > 0) {
    return (
      <TextSmall style={styles.timeAgo}>
        {days}d <Text style={styles.timeAgoText}>ago</Text>
      </TextSmall>
    );
  } else if (hours > 0) {
    return (
      <TextSmall style={styles.timeAgo}>
        {hours}h <Text style={styles.timeAgoText}>ago</Text>
      </TextSmall>
    );
  } else if (minutes > 0) {
    return (
      <TextSmall style={styles.timeAgo}>
        {minutes}m <Text style={styles.timeAgoText}>ago</Text>
      </TextSmall>
    );
  } else {
    return (
      <TextSmall style={styles.timeAgo}>
        {seconds}s <Text style={styles.timeAgoText}>ago</Text>
      </TextSmall>
    );
  }
};

const styles = {
  timeAgo: {
    color: colors.primary,
  },
  timeAgoText: {
    color: "#f0f8ff",
  },
};

export default React.memo(TimeAgo);
