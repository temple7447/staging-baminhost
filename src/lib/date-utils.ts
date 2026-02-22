/**
 * Formats a date using the native Intl.DateTimeFormat API.
 * Mimics basic functionality of date-fns 'format' function.
 */
export function formatDate(date: Date | string | number, formatStr: string = 'PP'): string {
    const d = new Date(date);

    if (isNaN(d.getTime())) {
        return 'Invalid Date';
    }

    // Simple mapping for common formats used in the app
    // MMM d, yyyy -> Oct 1, 2023
    if (formatStr === 'MMM d, yyyy') {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).format(d);
    }

    // Fallback to a default format
    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }).format(d);
}

/**
 * Alternative for relative time if needed later
 */
export function formatRelativeTime(date: Date | string | number): string {
    const d = new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;

    return formatDate(d);
}
