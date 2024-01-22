import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
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
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center my-7 text-3xl font-semibold">
        {" "}
        Create a post
      </h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text "
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
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
          <Alert className="text-red-500 text-sm">{imageUploadError}</Alert>
        )}
            {formData.image && (
                   <img src={formData.image} alt={formData.image} className="w-full h-72 object-cover" />
            )}
        <ReactQuill
          theme="snow"
          className="h-72 mb-12"
          placeholder="Write something.."
          required
        />
        <Button type="submit" gradientDuoTone="purpleToPink" size="lg">
          Publish
        </Button>
      </form>
    </div>
  );
}

export default CreatePost;
