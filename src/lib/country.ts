import { Country, State, City } from 'country-state-city';



export const countries = Country.getAllCountries().map((country) => ({
    label: country.name,
    value: country.isoCode,
}));

export const states = (countryCode: string) => {
    return State.getStatesOfCountry(countryCode).map((state) => ({
        label: state.name,
        value: state.isoCode,
    }));
};

export const citiesFromState = (countryCode: string, stateCode: string) => {
    return City.getCitiesOfState(countryCode, stateCode).map((city) => ({
        label: city.name,
        value: city.name,
    }));
};

export const citiesFromCountry = (countryCode: string, stateCode: string) => {
    return City.getCitiesOfState(countryCode, stateCode).map((city) => ({
        label: city.name,
        value: city.name,
    }));
};