import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateFailure,
  updateStart,
  updateSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess
} from "../redux/user/userSlice";
import {HiOutlineExclamationCircle} from 'react-icons/hi';

const DashProfile = () => {

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSucess, setUpdateUserSucess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { currentUser,error } = useSelector((state) => state.user);
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const handelImageChange = (e) => {
  const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  //   console.log(imageFile,imageFileUrl)
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  const uploadImage = async () => {
    // console.log('Uploading image....');
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError("Could not upload image");
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
       
        });
      }
    );
  };

  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
     setUpdateUserError(null);
     setUpdateUserSucess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No Changes made..');
      return;
    }
    if(imageFileUploading){
        setUpdateUserError('please wait for image to upload');

        return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSucess("User's profile updated sucessfully.");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };
  const  handelDeleteUser=async()=>{
       // console.log("deleted..");
       setShowModal(false);
       try {
          dispatch(deleteUserStart());
          const res= await fetch(`/api/user/delete/${currentUser._id}`,{
              method:'DELETE',

          }) ;
          const data=await res.json();
          if(!res.ok){
            dispatch(deleteUserFailure(data.message));
          }else{
               dispatch(deleteUserSuccess(data));
          }
       } catch (error) {
           dispatch(deleteUserFailure(error.message));
       }
        
  }
const handelSignout=async()=>{
     try{
        const res=await fetch('/api/user/signout',{
             method:'POST',
        });
        const data=await res.json();
        if(!res.ok){
            console.log(data.message);
        }else{
             dispatch(signoutSuccess());
        }
     }catch(error){
         console.log(error.message);
     }
}
  return (
    <div className="max-w-lg mx-auto p-6 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl ">Profile</h1>
      <form
        onSubmit={handelSubmit}
        className="flex flex-col gap-5 shadow:lg overflow-hidden outline-none"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handelImageChange}
          ref={filePickerRef}
          hidden
        />

        <div
          className=" relative w-32 h-32 self-center  cursor-pointer
               shadow-md overflow-hidden rounded-full
               "
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199, ${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full
        border-8 border-[lightgray] object-cover
           ${
             imageFileUploadProgress &&
             imageFileUploadProgress < 100 &&
             "opacity-60"
           } `}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}

        <TextInput
          type="text"
          id="username"
          placeholder="username."
          defaultValue={currentUser.username}
          onChange={handelChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email."
          defaultValue={currentUser.email}
          onChange={handelChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password."
          onChange={handelChange}
        />
        <Button type="submit" gradientDuoTone="greenToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5 ">
        <span className="cursor-pointer"
        onClick={handelSignout}
        >Sign Out</span>

        <span 
         onClick={()=>setShowModal(true)}
        
        className="cursor-pointer">Delete Account</span>
      </div>
      {updateUserSucess  && (
          <Alert color='success' className="mt-5" >
              {updateUserSucess} 
          </Alert>
      )}
      {
        updateUserError && (
           <Alert color='failure' className="mt-5">
               {updateUserError}
           </Alert>
        )
      }
      {
        error && (
           <Alert color='failure' className="mt-5">
               {error}
           </Alert>
        )
      }
      <Modal show={showModal} onClose={()=>setShowModal(false)}
      popup size='md'
      >
      <Modal.Header/>
      <Modal.Body>
        <div className="text-center" >
            <HiOutlineExclamationCircle
              className="h-14 w-14 text-red-400 dark:text-gray-200 mb-4 mx-auto "


            />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200"> Are you sure you want to delete your account.?</h3>
            <div className=" flex justify-between">
               <Button color="failure"  onClick={handelDeleteUser} >
                 Yes,I am sure.
               </Button>
               <Button onClick={()=>setShowModal(false)}>
                   No,cancel
               </Button>
            </div>
        </div>
      </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashProfile;
