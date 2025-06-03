// Formatting the firebase server timestamp into DD/MM/YYYY HH:MM:SS AM/PM format
export const formatFirebaseTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    
    const date = timestamp.toDate();
    
    // Get components
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    // Time components
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    // AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    const formattedHours = hours.toString().padStart(2, '0');
    
    return `${day}/${month}/${year} ${formattedHours}:${minutes}:${seconds} ${ampm}`;
}

// Formatting the current date and time into DD/MM/YYYY HH:MM:SS AM/PM format
export const formatCurrentDateTime = () => {
    const date = new Date();
    
    // Get components
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    // Time components
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    // AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    const formattedHours = hours.toString().padStart(2, '0');
    
    return `${day}/${month}/${year} ${formattedHours}:${minutes}:${seconds} ${ampm}`;
}