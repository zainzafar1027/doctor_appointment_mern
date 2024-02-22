const convertTime = time => {
    const timeParts = time.split(':');
    let hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);

    let meridiem = 'am';

    if (hours >= 12) {
        meridiem = 'pm';

        if (hours > 12) {
            hours -= 12;
        }
    }
    // Correct the concatenation and add a space between minutes and meridiem
    return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ' ' + meridiem;
};

export default convertTime;
