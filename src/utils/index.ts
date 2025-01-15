// Write a function that accepts a string as a date string and produce result for date format that looks like this
// if seconds is less than 60, return "a few seconds ago"
// if minutes is less than 60, return "a few minutes ago"
// if hours is less than 24, return "a few hours ago"
// if days is less than 7, return "a few days ago"
// if weeks is less than 4, return "a few weeks ago"
// if months is less than 12, return "a few months ago"
// else return "a few years ago"
//

export const formatDate = (date: string): string => {
	const currentDate = new Date();
	const createdDate = new Date(date);
	const diff = currentDate.getTime() - createdDate.getTime();
	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const weeks = Math.floor(days / 7);
	const months = Math.floor(weeks / 4);
	const years = Math.floor(months / 12);

	if (seconds < 60) return 'a few seconds ago';
	if (minutes < 60) return 'a few minutes ago';
	if (hours < 24) return 'a few hours ago';
	if (days < 7) return 'a few days ago';
	if (weeks < 4) return 'a few weeks ago';
	if (months < 12) return 'a few months ago';
	return 'a few years ago';
};
