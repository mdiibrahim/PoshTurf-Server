/* eslint-disable prefer-const */
export default function getAvailableTimeSlots(
  bookedSlots: Array<{ startTime: string; endTime: string }>,
): Array<{ startTime: string; endTime: string }> {
  const openingTime = '00:00';
  const closingTime = '23:59';

  // Split the day into 1-hour slots
  const slots = [];
  let currentTime = new Date(`1970-01-01T${openingTime}:00`);
  const endTime = new Date(`1970-01-01T${closingTime}:00`);

  while (currentTime < endTime) {
    const startTimeStr = currentTime.toTimeString().slice(0, 5);
    currentTime.setHours(currentTime.getHours() + 1);
    const endTimeStr = currentTime.toTimeString().slice(0, 5);

    slots.push({
      startTime: startTimeStr,
      endTime: endTimeStr === '00:00' ? '23:59' : endTimeStr, // Ensure last slot is till 23:59
    });
  }

  // Filter out booked slots
  return slots.filter((slot) => {
    return !bookedSlots.some(
      (booked) =>
        booked.startTime < slot.endTime && booked.endTime > slot.startTime,
    );
  });
}
