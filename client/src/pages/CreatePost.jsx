import { Button, FileInput, Select, TextInput } from "flowbite-react"

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CreatePost() {

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className="text-center my-7 text-3xl font-semibold"> Create a post</h1>
      <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput  type="text " placeholder="Title" required id="title" className="flex-1"/>
           <Select >
              <option value="uncategorized">Select a category.</option>
              <option value="react">react</option>
              <option value="python">python</option>
              <option value="c++">c++</option>
              <option value="javascript">javascript</option>
           </Select>
      </div>
            <div className="flex gap-4 items-center justify-between border-4 border-indigo-600 p-2" >

                <FileInput type="file" accept="images/*" />
                <Button type="button" gradientDuoTone="greenToBlue"  size="sm" >Upload Image</Button>
               
            </div>
     
     
            <ReactQuill theme="snow" className="h-72 mb-12"  placeholder="Write something.."  required/>
            <Button type="submit" gradientDuoTone="purpleToPink" size="lg" >Publish</Button>
     
      </form>
    </div>
  )
}

export default CreatePost