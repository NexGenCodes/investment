"use client";

import { User } from "@prisma/client";
import InputField from "../ui/input";
import SelectInput from "../ui/select";
import Countries from "@/constants/countries";
import Update from "@/actions/update";
import { useActionState } from "react";

interface Props {
  user: User;
}

export default function UpdateForm({ user }: Props) {
  const [error, Action, isPending] = useActionState(Update, undefined);
  return (
    <form className="space-y-4" action={Action}>
      <InputField
        name="FirstName"
        placeholder="enter first name "
        label="First Name"
        defaultValue={user?.firstName || ""}
        error={{
          errors: error?.errors?.firstName,
          message: error?.message,
        }}
      />
      <InputField
        name="LastName"
        placeholder="enter last name "
        label="Last Name"
        defaultValue={user?.lastName || ""}
        error={{
          errors: error?.errors?.lastName,
          message: error?.message,
        }}
      />
      <SelectInput
        name={"nationality"}
        list={Countries}
        error={{
          errors: error?.errors?.nationality,
          message: error?.message,
        }}
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
