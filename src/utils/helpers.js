import { differenceInDays, formatDistance, parseISO } from "date-fns";

export const formatCurrency = (value) =>
    new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
        value
    );

export const formatDistanceFromNow = (dateStr) =>
    formatDistance(parseISO(dateStr), new Date(), {
        addSuffix: true
    })
        .replace("about ", "")
        .replace("in", "In");

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
    differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));
