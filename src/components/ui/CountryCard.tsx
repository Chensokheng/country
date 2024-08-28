import { ICountry } from "@/lib/type";

export default function CountryCard({ country }: { country: ICountry }) {
	const nativeKey = Object.keys(country?.languages || {});
	let countryNativeName = "";
	if (nativeKey.length) {
		countryNativeName = country.name?.nativeName[nativeKey[0]]?.common;
	}

	return (
		<>
			<div className="border p-5 rounded-md">
				<img
					src={country?.flags?.png}
					className=" w-96 h-52 object-contain object-center"
				/>
				<h1 className=" font-bold">{country?.name?.official}</h1>
				<div className="flex gap-2">
					<h1 className="text-gray-500">CountryCode:</h1>
					<h1>
						{country?.cca2},{country?.cca3}
					</h1>
				</div>
				<div className="flex gap-2">
					<h1 className="text-gray-500">Native Name:</h1>
					<h1 className="flex-1">{countryNativeName}</h1>
				</div>
				<div className="flex gap-2">
					<h1 className="text-gray-500">altSpellings:</h1>
					<h1>{country?.altSpellings?.join(" , ")}</h1>
				</div>
				<div className="flex gap-2">
					<h1 className="text-gray-500">idd:</h1>
					<h1 className="flex-1">{country?.idd?.root}</h1>
				</div>
			</div>
		</>
	);
}
