import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { getFromAndTo } from "./lib/utils";
import { ICountry } from "@/lib/type";

import { Input } from "./components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import ListCountry from "./components/ui/ListCountry";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function App() {
	const [countries, setCountries] = useState<ICountry[]>([]);
	const [isFetching, setIsFetching] = useState(false);
	const [sortBy, setSortBy] = useState("");
	const [selectCountry, setSelectCountry] = useState<ICountry>();

	const [displayCountries, setDisplayCountries] = useState<ICountry[]>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [searchResult, setSearchResult] = useState<{
		searchTerm: string;
		result: ICountry[];
	}>({ searchTerm: "", result: [] });

	useEffect(() => {
		fetchCountry();
	}, []);

	useEffect(() => {
		if (page >= 1) {
			const { from, to } = getFromAndTo(page);
			const nextPageCountries = countries.slice(from, to);
			console.log(nextPageCountries.length);
			if (nextPageCountries.length >= 25) {
				setHasMore(true);
			} else {
				setHasMore(false);
			}
			setDisplayCountries(nextPageCountries);
		}
	}, [page, countries]);

	const handleSelectCountry = (country: ICountry) => {
		document.getElementById("trigger-dialog")?.click();
		setSelectCountry(country);
	};

	const fetchCountry = async () => {
		setIsFetching(true);
		const res = await fetch("https://restcountries.com/v3.1/all");
		const data = (await res.json()) as ICountry[];
		if (res.ok) {
			setCountries(data);
		}
		setIsFetching(false);
	};

	const handleSearch = useDebouncedCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const searchTerm = e.target.value.toLowerCase().trim();
			if (searchTerm) {
				setSearchResult({
					searchTerm,
					result: displayCountries.filter((country) =>
						country.name.official.toLowerCase().includes(searchTerm)
					),
				});
			} else {
				setSearchResult({
					searchTerm,
					result: [],
				});
			}
		},
		300
	);

	return (
		<div className="min-h-screen p-5  relative">
			<div className="space-y-5">
				<div className=" flex items-center">
					<Input
						placeholder="country name..."
						onChange={handleSearch}
						className="w-full"
					/>
					<Select onValueChange={setSortBy}>
						<SelectTrigger className="w-36">
							<SelectValue placeholder="Sort By" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="asc">Asc</SelectItem>
							<SelectItem value="dsc">Dsc</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="flex items-center justify-center gap-5 pt-10">
					<Button
						onClick={() => setPage(page - 1)}
						disabled={page <= 1}
					>
						Prev
					</Button>
					{page}
					<Button
						onClick={() => {
							setPage(page + 1);
						}}
						disabled={!hasMore}
					>
						Next
					</Button>
				</div>

				{isFetching ? (
					<h1>Loading...</h1>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-5 gap-5">
						{searchResult.searchTerm ? (
							<>
								<ListCountry
									countries={searchResult.result}
									sortBy={sortBy}
									handleSelectCountry={handleSelectCountry}
								/>
							</>
						) : (
							<>
								<ListCountry
									countries={displayCountries}
									sortBy={sortBy}
									handleSelectCountry={handleSelectCountry}
								/>
							</>
						)}
					</div>
				)}
			</div>
			{selectCountry && (
				<>
					<div
						className=" fixed top-0 w-full h-full bg-black right-0 bg-opacity-40 flex items-center justify-center"
						onClick={() => {
							setSelectCountry(undefined);
						}}
					>
						<div className="bg-white w-96 p-6 rounded-md">
							<div className="flex items-center">
								<h1 className="text-gray-500">unMemeber:</h1>
								<h1>{selectCountry.unMember ? "yes" : "no"}</h1>
							</div>
							<div className="flex items-center">
								<h1 className="text-gray-500">Capital:</h1>
								<h1>{selectCountry.capital.join(" , ")}</h1>
							</div>
							<div className="flex items-center">
								<h1 className="text-gray-500">region:</h1>
								<h1>{selectCountry.region}</h1>
							</div>
							<div className="flex items-center">
								<h1 className="text-gray-500">Lat,lng:</h1>
								<h1>
									{selectCountry.capitalInfo?.latlng?.join(
										" , "
									)}
								</h1>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
