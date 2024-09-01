/* eslint-disable prefer-const */
export default function getAvailableTimeSlots(
  bookedSlots: Array<{ startTime: string; endTime: string }>,
  date: string,
): Array<{ startTime: string; endTime: string }> {
  const openingTime = '00:00';
  const closingTime = '23:59';

  // Get the current date and time
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Parse the selected date
  const selectedDate = new Date(date);
  const isToday = selectedDate.toDateString() === now.toDateString();

  // Split the day into 1-hour slots
  const slots = [];
  let currentTime = new Date(`1970-01-01T${openingTime}`);
  const endTime = new Date(`1970-01-01T${closingTime}`);

  while (currentTime < endTime) {
    const startTimeStr = currentTime.toTimeString().slice(0, 5);
    currentTime.setHours(currentTime.getHours() + 1);
    const endTimeStr = currentTime.toTimeString().slice(0, 5);

    // Only add the slot if it's in the future relative to 'now' when the selected date is today
    const slotStartTime = new Date(`1970-01-01T${startTimeStr}`);
    if (
      !isToday ||
      slotStartTime.getHours() > currentHour ||
      (slotStartTime.getHours() === currentHour &&
        slotStartTime.getMinutes() >= currentMinute)
    ) {
      slots.push({
        startTime: startTimeStr,
        endTime: endTimeStr === '00:00' ? '23:59' : endTimeStr, // Ensure last slot is till 23:59
      });
    }
  }

  // Filter out booked slots
  return slots.filter((slot) => {
    return !bookedSlots.some(
      (booked) =>
        // A slot is considered booked if it overlaps with any booked slot
        booked.startTime < slot.endTime && booked.endTime > slot.startTime,
    );
  });
}
