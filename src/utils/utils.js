export function getTimeAgo(createdAt) {
  const now = new Date();
  const postTime = new Date(createdAt);
  const timeDiff = Math.abs(now - postTime);

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} kun oldin`;
  } else if (hours > 0) {
    return `${hours} soat oldin`;
  } else if (minutes > 0) {
    return `${minutes} minut oldin`;
  } else {
    return `bir necha soniya oldin`;
  }
}

export function formatDate(dateString) {
  const date = new Date(dateString);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;

  const timeString = `${hours}:${minutesStr} ${ampm}`;

  const options = { month: "short", day: "numeric", year: "numeric" };
  const dateStringFormatted = date.toLocaleDateString("en-US", options);

  return `${timeString} · ${dateStringFormatted}`;
}

export function getMonthAndYear(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.toLocaleString("eng", { month: "long" });

  return `Joined ${month} ${year}`;
}

export function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}