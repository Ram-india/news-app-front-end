//Utility function for date formating
export function formateDate(dateString) {
    if(!dateString) return "Unknown Date";
    const date = new Date (dateString)('en-US',{
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}