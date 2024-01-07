import { useState } from "react";
import { useForm } from "react-hook-form";

const MAX_STEP = 3;
export default function App() {
    const [formStep, setFormStep] = useState(1);
    const {
        // watch,
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: "all" });
    function completeFormStep() {
        setFormStep((step) => step + 1);
    }
    function goToPrevStep() {
        setFormStep((step) => step - 1);
    }
    function onSubmit(values) {
        window.alert(JSON.stringify(values, null, 2));
        completeFormStep();
    }
    function displayButton() {
        if (formStep < 3) {
            return (
                <button
                    type="button"
                    disabled={!isValid}
                    onClick={completeFormStep}
                    className="rounded w-full bg-green-600 text-white px-3 md:px-4 py-2 md:py-4 mt-4 hover:bg-green-700 transition-colors duration-300 ease-in-out shadow-md disabled:bg-stone-400 disabled:cursor-not-allowed focus-visible:outline-yellow-500"
                >
                    Next
                </button>
            );
        } else if (formStep === 3) {
            return (
                <button
                    type="submit"
                    disabled={!isValid}
                    className="rounded w-full bg-green-600 text-white px-3 md:px-4 py-2 md:py-4 mt-4 hover:bg-green-700 transition-colors duration-300 ease-in-out shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed focus-visible:outline-yellow-500"
                >
                    Create Account
                </button>
            );
        } else {
            return undefined;
        }
    }
    return (
        <div className="h-[100dvh] relative w-full bg-green-900 flex items-center flex-col gap-16 justify-center">
            <div
                style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 100%)",
                    height: "50%",
                }}
                className="absolute bg-green-800 inset-x-0 top-0"
            ></div>
            <div className="text-center text-white  z-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold">
                    Welcome to <span className="text-yellow-500">the Club</span>
                </h1>
                <p className="text-sm md:text-lg">
                    Become a new member in three easy steps
                </p>
            </div>
            {/* Form */}
            <form
                className="max-w-xl rounded-md shadow-2xl px-6 md:px-8 lg:px-16 py-4 md:py-6 lg:py-10 bg-white w-full z-10"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex items-center gap-2 text-sm text-gray-700  ">
                    {formStep > 1 && formStep <= 3 && (
                        <button
                            type="button"
                            onClick={goToPrevStep}
                            className="focus-visible:outline-yellow-500 bg-gray-300 hover:bg-gray-400 transition-colors duration-300 ease-in-out p-1 rounded"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 19.5 8.25 12l7.5-7.5"
                                />
                            </svg>
                        </button>
                    )}
                    {formStep < MAX_STEP + 1 && (
                        <p>
                            Form{" "}
                            <span className="text-green-500 font-semibold">
                                {formStep}
                            </span>{" "}
                            of <span className="font-semibold">{MAX_STEP}</span>
                        </p>
                    )}
                </div>
                {formStep === 1 && (
                    <section className="flex flex-col gap-4 mt-2">
                        <h2 className="text-xl md:text-2xl text-stone-800 font-semibold">
                            Personal Information
                        </h2>
                        <div>
                            <label
                                htmlFor="username"
                                className="text-sm md:text-base"
                            >
                                Username
                            </label>
                            <input
                                className="text-input"
                                id="username"
                                name="username "
                                {...register("username", {
                                    required: "Please type in a username",
                                })}
                            />
                            {errors?.username && (
                                <p className="text-red-600 mt-1 text-xs md:text-sm">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>
                    </section>
                )}
                {formStep === 2 && (
                    <section className="flex flex-col gap-4 mt-2">
                        <h2 className="text-xl md:text-2xl text-stone-800 font-semibold">
                            Billing Information
                        </h2>
                        <div>
                            <label
                                htmlFor="address"
                                className="text-sm md:text-base"
                            >
                                Address
                            </label>
                            <input
                                className="text-input"
                                id="address"
                                name="address"
                                {...register("address", {
                                    required: "Please type in an address",
                                })}
                            />
                            {errors?.address && (
                                <p className="text-red-600 mt-1 text-xs md:text-sm">
                                    {errors.address.message}
                                </p>
                            )}
                        </div>
                    </section>
                )}
                {formStep === 3 && (
                    <section className="flex flex-col gap-4 mt-2">
                        <h2 className="text-xl md:text-2xl text-stone-800 font-semibold">
                            Legal Information
                        </h2>
                        <div className="flex items-center justify-start">
                            <input
                                type="checkbox"
                                name="terms"
                                id="terms"
                                className="p-3 w-4 h-4 md:w-5 md:h-5 text-green-600 rounded mr-3 border-none border-gray-300 focus:ring-1 focus:border-0 cursor-pointer focus:ring-yellow-500"
                                {...register("terms", {
                                    required: true,
                                })}
                            />

                            <label htmlFor="terms">
                                I accept the{" "}
                                <a
                                    href="/"
                                    className="text-green-600 focus:outline-yellow-500 focus"
                                >
                                    Terms and Conditions
                                </a>
                            </label>
                        </div>
                        <div className="flex items-center justify-start">
                            <input
                                type="checkbox"
                                name="policy"
                                id="policy"
                                className="p-3 w-4 h-4 md:w-5 md:h-5 text-green-600 rounded mr-3 border-none border-gray-300 focus:ring-1 focus:border-0 cursor-pointer focus:ring-yellow-500"
                                {...register("policy", {
                                    required: true,
                                })}
                            />

                            <label htmlFor="policy">
                                I accept the{" "}
                                <a
                                    href="/"
                                    className="text-green-600 focus:outline-yellow-500 focus"
                                >
                                    Privacy Policy
                                </a>
                            </label>
                        </div>
                    </section>
                )}
                {formStep === 4 && (
                    <h2 className="font-semibold text-3xl mb-8 text-center">
                        Congratulations 🎉
                    </h2>
                )}
                {displayButton()}
                {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
            </form>
        </div>
    );
}
