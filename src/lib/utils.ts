import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getFromAndTo(page = 1) {
	const itemPerPage = 25;
	const from = (page - 1) * 25;
	const to = itemPerPage * page;
	return { from, to };
}
