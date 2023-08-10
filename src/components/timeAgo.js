import moment from "moment";
import React, { useMemo } from "react";
import { Text } from "react-native";
import colors from "../theme/Colors";
import TextSmall from "./textSmall";

const TimeAgo = ({ createdAt, ago = true }) => {
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
        {days}d {ago && <Text style={styles.timeAgoText}>ago</Text>}
      </TextSmall>
    );
  } else if (hours > 0) {
    return (
      <TextSmall style={styles.timeAgo}>
        {hours}h {ago && <Text style={styles.timeAgoText}>ago</Text>}
      </TextSmall>
    );
  } else if (minutes > 0) {
    return (
      <TextSmall style={styles.timeAgo}>
        {minutes}m {ago && <Text style={styles.timeAgoText}>ago</Text>}
      </TextSmall>
    );
  } else {
    return (
      <TextSmall style={styles.timeAgo}>
        Just<Text style={styles.timeAgoText}> Now</Text>
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
