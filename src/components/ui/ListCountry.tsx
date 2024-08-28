import { ICountry } from "@/lib/type";
import CountryCard from "./CountryCard";

export default function ListCountry({
	countries,
	sortBy,
	handleSelectCountry,
}: {
	countries: ICountry[];
	sortBy: string;
	handleSelectCountry: (country: ICountry) => void;
}) {
	if (countries.length === 0) {
		return <h1>Country Not Found.</h1>;
	}
	if (["asc", "dsc"].includes(sortBy)) {
		countries = countries.sort((a, b) => {
			if (sortBy === "asc") {
				return a.name.official.localeCompare(b.name.official);
			} else {
				return b.name.official.localeCompare(a.name.official);
			}
		});
	}

	return (
		<>
			{countries.map((country, index) => {
				return (
					<div
						key={index}
						onClick={() => handleSelectCountry(country)}
					>
						<CountryCard country={country} />
					</div>
				);
			})}
		</>
	);
}
