"use client";

import InputField from "../ui/input";
import SelectInput from "../ui/select";
import Countries from "@/constants/countries";
import Update from "@/actions/update";
import { useActionState } from "react";
import { User } from "@prisma/client";

interface Props {
  data: User;
}

export default function UpdateForm({ data }: Props) {
  const [error, Action, isPending] = useActionState(Update, undefined);
  return (
    <form className="space-y-4" action={Action}>
      <InputField
        name="firstName"
        placeholder="enter first name "
        label="First Name"
        type="text"
        defaultValue={data?.firstName || undefined}
        errors={error?.errors?.firstName}
      />
      <InputField
        name="lastName"
        placeholder="enter last name "
        label="Last Name"
        type="text"
        required
        defaultValue={data.lastName || undefined}
        errors={error?.errors?.lastName}
      />
      <SelectInput
        name={"nationality"}
        list={Countries}
        defaultValue={data.nationality || undefined}
        errors={error?.errors?.nationality}

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
