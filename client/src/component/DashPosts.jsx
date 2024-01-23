import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {HiOutlineExclamationCircle} from 'react-icons/hi';
const DashPosts = () => {
    const {currentUser}=useSelector(state=>state.user);
    const [userPosts,setUserposts]=useState([]);
    const [showMore,setshowMore]=useState(true);
    const [showModal,setShowModal]=useState(false);
    const [postIdToDelete,setPostIdToDelete]=useState('');
    useEffect(()=>{
           const fetchPosts=async()=>{
               try {
                const res=await fetch(`/api/post/getposts?userId=${currentUser._id}`);
                const data=await res.json();
              if(res.ok){
                 setUserposts(data.posts);
                 if(data.posts.length<9){
                     setshowMore(false);
                     
                 }

              }
               } catch (error) {
                console.log(error.message);
               }
           }
           if(currentUser.isAdmin){
            fetchPosts();
         }
    },[currentUser._id]);
    
    //HAndel show more functionality
    const handelShowMore =async()=>{
          const startIndex=userPosts.length;
          try {
             const res=await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
             const data=await res.json();
              if(res.ok){
                   setUserposts((prev)=>[...prev,...data.posts]);
                   if(data.posts.length<9){
                      setshowMore(false);
                   }
              }

          } catch (error) {
            console.log(error)
          }
    }
     const handelDeletePost=async()=>{
         setShowModal(false);
         try {
            const res=await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,{
                 method: 'DELETE',
            })
            const data=await res.json();
            if(!res.ok){
               console.log(data.message);
            }  else{
                 setUserposts((prev)=>
                 prev.filter((post)=>post._id !==postIdToDelete));

            }
         } catch (error) {
          console.log(error);
         }
     }
    return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar
    scrollbar-track-slate-100  scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700  dark:scrollbar-thumb-slate-500
    ">
        {currentUser.isAdmin && userPosts.length >0 ? (
            <>
              <Table hoverable className="shadow-lg w-full ">
                <Table.Head className="w-full ">
                  <Table.HeadCell>Date updated</Table.HeadCell>
                  <Table.HeadCell>Post image</Table.HeadCell>
                  <Table.HeadCell>Post title</Table.HeadCell>
                  <Table.HeadCell>Category</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                  <Table.HeadCell>
                    <span className="hidden md:block">Edit</span>
                  </Table.HeadCell>
                </Table.Head>
                {userPosts.map((post)=>(
                      <Table.Body key={post._id} className="divide-y">
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell >{new Date (post.updatedAt).toLocaleDateString()}</Table.Cell>
                          <Table.Cell >
                            <Link to={`/post/${post.slug}`}>
                                 <img src={post.image} alt={post.title} className="w-20 h-20 object-cover border-radious" />
                            </Link>



                          </Table.Cell>
                          <Table.Cell  className="font-semibold text-stone-700 dark:text-stone-100" >{post.title}</Table.Cell>
                          <Table.Cell >{post.category}</Table.Cell>
                          <Table.Cell > <span  
                          onClick={()=>{
                               setShowModal(true);
                               setPostIdToDelete(post._id);
                          }}
                          className="font-bold text-red-500 hover:underline cursor-pointer ">Delete</span></Table.Cell>
                          <Table.Cell >  <Link to={`/update-post${post._id}`} ><span className=" font-semibold text-indigo-500 hover:underline">Edit</span></Link></Table.Cell>
                        </Table.Row>
                      </Table.Body>
        ))}
              </Table>
              {
                showMore && (
                     <button onClick={handelShowMore} className="w-full text-teal-500 self-center text-sm py-7 ">
                      Show more
                     </button>
                )
              }
            </>




        ):(
            <p>You habe not post yet.</p>
        )}
        <Modal show={showModal} onClose={()=>setShowModal(false)}
      popup size='md'
      >
      <Modal.Header/>
      <Modal.Body>
        <div className="text-center" >
            <HiOutlineExclamationCircle
              className="h-14 w-14 text-red-400 dark:text-gray-200 mb-4 mx-auto "


            />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200"> Are you sure you want to delete this post.?</h3>
            <div className=" flex justify-between">
               <Button color="failure"  onClick={handelDeletePost} >
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
    
  )
}

export default DashPosts