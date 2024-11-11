export const extractTime = (dateString) => {
    const date = new Date(dateString);
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    return `${hours}:${minutes}`
}

// it is helper function to create a single digit number to targetted 2 digit no. if not adds zero at the ends.
const padZero = (num) =>{
    return num.toString().padStart(2,"0");
}