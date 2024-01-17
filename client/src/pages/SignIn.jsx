import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { useSelector, useDispatch } from "react-redux";

const SignIn = () => {
  const dispatch = useDispatch();
  const { loading , error: errorMessage } = useSelector((state) =>state.user);

  const [formData, setFormData] = useState({});

  const navigate = useNavigate();
  const HandelChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  // console.log(formData);
  // for submit form data

  const HandelSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password || !formData.email) {
      return dispatch(signInFailure("please fill out all field..!"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="min-h-screen mt-20 ">
      <div
        className=" flex p-3 max-w-3xl mx-auto flex-col md:flex-row
      md:items-center gap-5
      "
      >
        {/* Left side */}
        <div className="flex-1">
          <Link to="/" className=" text-4xl font-bold dark:text-white ">
            <span
              className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-400 
      to-pink-500 rounded-2xl text-white
      "
            >
              SHRI
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a simple blog posting site please consider as key of the
            field
          </p>
        </div>
        {/* Right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={HandelSubmit}>
            <div className=" shadow-lg">
              <Label value="Your eamil" />
              <TextInput
                type="email"
                placeholder="Enter Your Email.."
                id="email"
                onChange={HandelChange}
              />
            </div>
            <div className=" shadow-lg">
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="*************"
                id="password"
                onChange={HandelChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              outline
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="ml-2">Loading...</span>
                </>
              ) : (
                "Sign-in"
              )}
            </Button>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Dont have a account ?..</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign-up
            </Link>
          </div>

          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
