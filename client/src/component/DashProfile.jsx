import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-6 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl ">Profile</h1>
      <form className="flex flex-col gap-5 shadow:lg overflow-hidden outline-none">
        <div
          className="w-32 h-32 self-center  cursor-pointer
               shadow-md overflow-hidden rounded-full
               "
        >
          <img
            src={currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full
        border-8 border-[lightgray] object-cover
        "
          />
        </div>

        <TextInput
          type="text"
          id="username"
          placeholder="username."
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email."
          defaultValue={currentUser.email}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password."
         
        />
        <Button type="submit"  gradientDuoTone="purpleToPink" >Update</Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Sign Out</span>
     
        <span className="cursor-pointer">Delete Account</span>
      </div>
    </div>
  );
};

export default DashProfile;