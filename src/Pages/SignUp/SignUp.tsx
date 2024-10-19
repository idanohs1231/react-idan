import { joiResolver } from "@hookform/resolvers/joi";
import { Button, FloatingLabel } from "flowbite-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SignUpJoiSchema } from "../../validations/SignUpSchema.joi";
import { TUser } from "../../Types/TUser";

// Define a new type excluding _id and isAdmin
type SignUpFormData = Omit<TUser, "_id" | "isAdmin" | "image" | "password"> & { 
  password: string;
};

function SignUp() {
  const nav = useNavigate();

  const initialFormData: SignUpFormData = {
    name: { first: "", middle: "", last: "" },
    phone: "",
    email: "",
    password: "", // Password field for sign-up
    address: {
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: 0,
      zip: 0,
    },
    isBusiness: false,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialFormData,
    mode: "onChange",
    resolver: joiResolver(SignUpJoiSchema),
  });

  const submit = async (form: SignUpFormData) => {
    try {
      await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/register",
        form
      );
      toast.success("Registration Successful. Please log in.");
      nav("/signin");
    } catch (error) {
      console.error(error);
      toast.error("Sign Up Failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900" >
      <form
        className="flex flex-col w-[40rem] max-w-full gap-6 p-8 m-10 rounded-xl shadow-lg bg-white dark:bg-gray-800"
        onSubmit={handleSubmit(submit)}
  
      >
        <h1 className="text-3xl font-extrabold tracking-wide mb-6 animate-fade-in-down dark:text-green-300">
          Sign Up
        </h1>

        <div className="grid grid-cols-2 gap-4">
          <FloatingLabel
            variant="outlined"
            label="First Name"
            {...register("name.first")}
            color={errors.name?.first ? "error" : "success"}
          />
          <FloatingLabel
            variant="outlined"
            label="Last Name"
            {...register("name.last")}
            color={errors.name?.last ? "error" : "success"}
          />
        </div>

        <FloatingLabel
          variant="outlined"
          label="Middle Name (Optional)"
          {...register("name.middle")}
          color={errors.name?.middle ? "error" : "success"}
        />

        <FloatingLabel
          variant="outlined"
          type="tel"
          label="Phone"
          {...register("phone")}
          color={errors.phone ? "error" : "success"}
        />

        <FloatingLabel
          variant="outlined"
          type="email"
          label="Email"
          {...register("email")}
          color={errors.email ? "error" : "success"}
        />

        <FloatingLabel
          variant="outlined"
          type="password"
          label="Password"
          {...register("password")}
          color={errors.password ? "error" : "success"}
        />

        <div className="grid grid-cols-2 gap-4">
          <FloatingLabel
            variant="outlined"
            label="State"
            {...register("address.state")}
            color={errors.address?.state ? "error" : "success"}
          />
          <FloatingLabel
            variant="outlined"
            label="Country"
            {...register("address.country")}
            color={errors.address?.country ? "error" : "success"}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FloatingLabel
            variant="outlined"
            label="City"
            {...register("address.city")}
            color={errors.address?.city ? "error" : "success"}
          />
          <FloatingLabel
            variant="outlined"
            label="Street"
            {...register("address.street")}
            color={errors.address?.street ? "error" : "success"}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FloatingLabel
            variant="outlined"
            type="number"
            label="House Number"
            {...register("address.houseNumber")}
            color={errors.address?.houseNumber ? "error" : "success"}
          />
          <FloatingLabel
            variant="outlined"
            type="number"
            label="ZIP"
            {...register("address.zip")}
            color={errors.address?.zip ? "error" : "success"}
          />
        </div>

        <label className="flex items-center space-x-2">
          <input type="checkbox" {...register("isBusiness")} />
          <span>Register as Business User</span>
        </label>

        <Button
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 py-3 text-white font-semibold rounded-lg shadow-md transition duration-300 hover:from-green-500 hover:to-blue-600 disabled:opacity-50"
          type="submit"
          disabled={!isValid}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
