"use client";

import InputField from "../ui/input";
import SelectInput from "../ui/select";
import Update from "@/actions/update";
import { useActionState } from "react";
import { User } from "@prisma/client";
import { countries, states } from "@/lib/country";
import { useState } from "react";

interface Props {
  data?: User;
}

export default function UpdateForm({ data }: Props) {
  const [error, Action, isPending] = useActionState(Update, undefined);

  // State for selected country and corresponding states
  const [country, setCountry] = useState<string | undefined>(
    data?.nationality || undefined
  );
  const [stateList, setStateList] = useState(
    country ? states(country) : [] // Initialize with states if country exists
  );

  // Handle country change
  const handleCountryChange = (countryCode: string) => {
    setCountry(countryCode);
    setStateList(states(countryCode)); // Fetch states for the selected country
  };

  return (
    <form className="space-y-4" action={Action}>
      <InputField
        name="firstName"
        placeholder="Enter first name"
        label="First Name"
        type="text"
        defaultValue={data?.firstName || ""}
        errors={error?.errors?.firstName}
      />
      <InputField
        name="lastName"
        placeholder="Enter last name"
        label="Last Name"
        type="text"
        defaultValue={data?.lastName || ""}
        errors={error?.errors?.lastName}
      />
      <SelectInput
        name="nationality"
        list={countries}
        defaultValue={data?.nationality || ""}
        errors={error?.errors?.nationality}
        onChange={handleCountryChange} // Update country and states
      />
      <SelectInput
        name="state"
        list={stateList} // Dynamically updated states
        defaultValue={data?.state || ""}
        errors={error?.errors?.state}
      />
      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
        type="submit"
      >
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
