export default function getAvailableTimeSlots(
  bookedSlots: Array<{ startTime: string; endTime: string }>,
): Array<{ startTime: string; endTime: string }> {
  const openingTime = '00:00';
  const closingTime = '23:59';

  // Initialize with one big slot for 24 hours
  let availableSlots = [{ startTime: openingTime, endTime: closingTime }];

  // Loop through each booked slot and adjust the available slots
  bookedSlots.forEach((booked) => {
    availableSlots = availableSlots.flatMap((slot) => {
      // No overlap
      if (
        booked.endTime <= slot.startTime ||
        booked.startTime >= slot.endTime
      ) {
        return [slot];
      }

      // Overlap at start of the available slot
      if (booked.startTime <= slot.startTime && booked.endTime < slot.endTime) {
        return [{ startTime: booked.endTime, endTime: slot.endTime }];
      }

      // Overlap at the end of the available slot
      if (booked.startTime > slot.startTime && booked.endTime >= slot.endTime) {
        return [{ startTime: slot.startTime, endTime: booked.startTime }];
      }

      // Booked slot is within the available slot
      if (booked.startTime > slot.startTime && booked.endTime < slot.endTime) {
        return [
          { startTime: slot.startTime, endTime: booked.startTime },
          { startTime: booked.endTime, endTime: slot.endTime },
        ];
      }

      // Booked slot completely
      return [];
    });
  });

  return availableSlots;
}
