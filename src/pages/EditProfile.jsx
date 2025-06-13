import { useAuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CencalBTN from "../components/CencalBTN";
import ModalClose from "../modal/ModalClose";

const EditProfile = () => {
  const [formErrors, setFormErrors] = useState(null);
  const navi = useNavigate();
  const { editProfile, user, isLoging } = useAuthContext();

  const [isModelOpen, setIsModelOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      user: {
        username: "",
        bio: "",
        email: "",
        image: "",
      },
    },
  });

  useEffect(() => {
    if (user) {
      setValue("user.bio", user.bio);
      setValue("user.username", user.username);
      setValue("user.email", user.email);
      setValue("user.image", user.image);
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      await editProfile(data.user);
      navi("/");
    } catch (error) {
      setFormErrors(error.message);
    }
  };

  // Handle page edit profile withou login
  if (!isLoging) return <Navigate to={`/login`} replace />;

  return (
    <>
      <div className="relative bg-white mt-5 max-w-md mx-auto p-5 shadow-lg rounded-sm">
        <form method="post" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="mb-5 text-center font-bold">Edit Profile</h2>
          {/* user name */}
          <div className="mb-5">
            <label htmlFor="bio" className="block mb-1 text-sm">
              Bio
            </label>
            <input
              type="text"
              name="bio"
              placeholder="bio"
              className={`border border-gray-300 p-2 rounded-sm w-full text-sx ${errors?.user?.bio ? "valid_input" : ""}`}
              autoFocus
              {...register("user.bio", {
                required: "The bio is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Maximum 20 characters",
                },
              })}
            />
            {/* សិក្សាលក្ខណ username*/}
            {errors?.user?.username && (
              <label className="text-red-500 text-xs">
                {errors.user.username.message}
              </label>
            )}
          </div>

          {/* user name */}
          <div className="mb-5">
            <label htmlFor="name" className="block mb-1 text-sm">
              Username
            </label>
            <input
              type="text"
              name="name"
              placeholder="Username"
              className={`border border-gray-300 p-2 rounded-sm w-full text-sx ${errors?.user?.username ? "valid_input" : ""}`}
              {...register("user.username", {
                required: "user name is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Maximum 20 characters",
                },
              })}
            />
            {/* សិក្សាលក្ខណ username*/}
            {errors?.user?.username && (
              <label className="text-red-500 text-xs">
                {errors.user.username.message}
              </label>
            )}
          </div>

          {/* Email */}
          <div className="mb-5">
            <label htmlFor="email" className="block mb-1 text-sm">
              Email address{" "}
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className={`border border-gray-300 p-2 rounded-sm w-full text-sm ${errors.user?.email ? "valid_input" : ""}`}
              {...register("user.email", {
                required: "Email is quired",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Email is not valid",
                },
              })}
            />
            {/* សិក្សាលក្ខណ Email*/}
            {errors?.user?.email && (
              <label className="text-red-500 text-xs">
                {errors.user.email.message}
              </label>
            )}
          </div>

          {/* Avatar Image */}
          <div className="mb-5">
            <label htmlFor="avatarImage" className="block mb-1 text-sm">
              Avatar image (url)
            </label>
            <input
              type="text"
              name="avatarImage"
              placeholder="Avatar image"
              className={`border border-gray-300 p-2 rounded-sm w-full text-sm ${errors.user?.image ? "valid_input" : ""}`}
              {...register("user.image", {
                required: "Image is quired",
                pattern: {
                  value: /^https?:\/\/.+\.?(\?.*)?$/i,
                  message: "Avatar image must be a valid URL",
                },
              })}
            />

            {errors.user?.image && (
              <span className="text-red-500 text-xs">
                {errors.user?.image?.message}
              </span>
            )}
          </div>

          {/* Create Account BTN */}
          <div className="mt-5 mb-5">
            <button
              className="bg-blue-500 w-full text-gray-100 p-1.5 rounded-sm font-light cursor-pointer"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>

        {/* Close BTN */}
        <span
          className=" absolute top-2 right-2"
          onClick={() => setIsModelOpen(true)}
        >
          <CencalBTN />
        </span>
      </div>

      {/* Handle Modal close */}
      {isModelOpen && (
        <span className="bg-gray-600 w-full">
          {" "}
          <ModalClose
            title={`edit profile`}
            isModalOpen={() => setIsModelOpen(false)}
          />
        </span>
      )}
    </>
  );
};

export default EditProfile;
