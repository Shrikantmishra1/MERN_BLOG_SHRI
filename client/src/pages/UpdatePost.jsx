import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from "firebase/storage";
  import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
  import { useEffect, useState } from "react";
  
  import ReactQuill from "react-quill";
  import "react-quill/dist/quill.snow.css";
  import { app } from "../firebase";
  import { CircularProgressbar } from "react-circular-progressbar";
  import { useNavigate,useParams } from "react-router-dom";
import {useSelector} from  'react-redux'
  function UpdatePost() {
      const navigate=useNavigate();
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError,setpublishError] = useState(null);
    const {postId}=useParams();
    const {currentUser}=useSelector((state)=>state.user)
    useEffect(()=>{
            try {
                const fetchPost=async()=>{
                    const res=await fetch(`/api/post/getposts?${postId}`);
                    const data=await res.json();
                    if(!res.ok){
                           console.log(data.message);
                           setpublishError(data.message);
                           return;
                    }
                    if(res.ok){
                        setpublishError(null);
                           setFormData(data.posts[0]);
                    }
                
                }
                fetchPost();

            } catch (error) {
                console.log(error);
            }
    },[postId])
    const handeluploadImage = async () => {
      try {
        if (!file) {
          setImageUploadError("Please select an image.");
  
          return;
        }
        setImageUploadError(null);
  
        const storage = getStorage(app);
        const fileName = new Date().getTime() + "-" + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageUploadProgress(progress.toFixed(0));
          },
          (error) => {
            setImageUploadError(error);
            setImageUploadProgress(null);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageUploadProgress(null);
              setImageUploadError(null);
              setFormData({ ...formData, image: downloadURL });
            });
          }
        );
      } catch (error) {
        setImageUploadError("Image Uplaod failed");
        setImageUploadProgress(null);
        console.log(error);
      }
    };
  const handelFormSubmit=async(e)=>{
        e.preventDefault();
        try {
          const res=await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`,{
                 method: 'PUT',
                 headers:{'Content-Type': 'application/json'},
                 body:JSON.stringify(formData)
          });
          const data=await res.json();
          if(!res.ok){
                setpublishError(data.message)
                 return
          }
          if(data.success===false){
                 setpublishError(data.message);
                 return;
          }
          if(res.ok && data){
               setpublishError(null);
               navigate(`/post/${data.slug}`)
  
          }
        } catch (error) {
          setpublishError('Something went Wrong...');
        }  
  }
  
  
  
    return (
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center my-7 text-3xl font-semibold">
          {" "}
         Update post..
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handelFormSubmit}>
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              type="text "
              placeholder="Title"
              required
              id="title"
              className="flex-1"
              onChange={(e)=>{
                    setFormData({...formData,title:e.target.value})
              }}
              value={formData.title}
            />
            <Select
      onChange={(e)=>{
             setFormData({...formData,category:e.target.value})
      }}
      value={formData.category}
  >
              <option value="uncategorized">Select a category.</option>
              <option value="react">react</option>
              <option value="python">python</option>
              <option value="c++">c++</option>
              <option value="javascript">javascript</option>
            </Select>
          </div>
          <div className="flex gap-4 items-center justify-between border-4 border-indigo-600 p-2">
            <FileInput
              type="file"
              accept="images/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              onClick={handeluploadImage}
              disabled={imageUploadProgress}
              type="button"
              gradientDuoTone="greenToBlue"
              size="sm"
              outline
            >
              {imageUploadProgress ? (
                <div >
                  <CircularProgressbar
                   className="w-15 h-16 " value={imageUploadProgress}
                    text={`${imageUploadProgress || 0}%`}
                  />
                  <span>Uploading....</span>
                </div>
              ) : (
                "Upload Image"
              )}
            </Button>
          </div>
          {imageUploadError && (
            <Alert color='failure' onDismiss={() => alert('Alert dismissed!')}>{imageUploadError}</Alert>
          )}
              {formData.image && (
                     <img src={formData.image} alt={formData.image} className="w-full h-72 object-cover" />
              )}
          <ReactQuill
            theme="snow"
            className="h-72 mb-12"
            placeholder="Write something.."
            required
            onChange={(value)=>setFormData({...formData,content:value})}
            value={formData.content}
          />
          <Button type="submit" gradientDuoTone="purpleToPink" size="lg">
           Update Post
          </Button>
          {publishError && <Alert color='failure' onDismiss={() => alert('Alert dismissed!')}>{publishError}</Alert>}
        </form>
      </div>
    );
  }
  
  export default UpdatePost;
  