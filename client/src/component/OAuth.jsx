import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";

const OAuth = () => {
    const handelGoogleClick=()=>{
           console.log("Hello");
    }
  return (
    <Button 
    onClick={handelGoogleClick}
    
    
    type="button" gradientDuoTone="pinkToOrange" outline>
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Sign In With Google
    </Button>
  );
};

export default OAuth;
