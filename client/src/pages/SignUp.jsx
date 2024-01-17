import { Label, TextInput,Button, Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
const SignUp = () => {
  const [formData,setFormData]=useState({});
  const [errorMessage,seterrorMessage]=useState(null);
  const [loading,SetLoading] =useState(false);
  const navigate=useNavigate();
  const HandelChange=(e)=>{
     setFormData({...formData,[e.target.id]:e.target.value.trim()});
  }
  // console.log(formData);
  // for submit form data

  const HandelSubmit= async(e)=>{

       e.preventDefault();
       if(!formData.username || !formData.password || !formData.email){
           return seterrorMessage('Please fill out All fields');
       }
       try{
        SetLoading(true);
        seterrorMessage(null);
          const res=await fetch ('/api/auth/signup',{
               method: 'POST',
               headers:{'Content-Type': 'application/json'},
               body:JSON.stringify(formData),
          });
          const data=await res.json();
          if(data.success===false){
               return seterrorMessage(data.message)
          }
          SetLoading(false);
          if(res.ok){
            navigate('/sign-in')
          }
       }catch(error){
           console.log(error);
           SetLoading(false);
       }

  }
  return (
    <div className="min-h-screen mt-20 ">
      <div className=" flex p-3 max-w-3xl mx-auto flex-col md:flex-row
      md:items-center gap-5
      ">
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
            <Label value="Your Username" />
            <TextInput type="text" placeholder="Enter Your username.." id="username"  onChange={HandelChange}
            />
          </div>
          <div className=" shadow-lg">
            <Label value="Your eamil" />
            <TextInput type="email" placeholder="Enter Your Email.." id="email"   onChange={HandelChange}
            />
          </div>
          <div className=" shadow-lg">
            <Label value="Your password" /> 
            <TextInput type="password" placeholder="Enter Your Password.." id="password"   onChange={HandelChange}
            />
          </div>
          <Button gradientDuoTone='purpleToPink' type= "submit" outline disabled={loading} >{loading ? (
             <>
             <Spinner size='sm' />
             <span className="ml-2">Loading...</span>
             </>
          ):'Sign-up' }</Button>
        </form>

<div className="flex gap-2 text-sm mt-5">
  <span>Have An account ?..</span>
  <Link to="/sign-in" className="text-blue-500" >Sign-in</Link>
</div>

{
  errorMessage && (
     <Alert  className="mt-5" color='failure'>
         {errorMessage}
     </Alert>
  )
}
  


        </div>
      </div>
    </div>
  );
};

export default SignUp;
