import { Button, Table } from "flowbite-react";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const DashPosts = () => {
    const {currentUser}=useSelector(state=>state.user);
    const [userPosts,setUserposts]=useState([]);
    const [showMore,setshowMore]=useState(true);
     console.log(userPosts);
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
                          <Table.Cell > <span className="font-bold text-red-500 hover:underline cursor-pointer ">Delete</span></Table.Cell>
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








    </div>
  )
}

export default DashPosts