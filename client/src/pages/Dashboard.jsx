
import { useState,useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import DashSidebar from '../component/DashSidebar';
import DashProfile from '../component/DashProfile';
import DashPosts from '../component/DashPosts';
import DashUsers from '../component/DashUsers';

const Dashboard = () => {
  const location=useLocation();
  const [tab,setTab]=useState('');
  useEffect(() => {
        const urlParms=new URLSearchParams(location.search);
        const tabFromUrl=urlParms.get('tab');
              if(tabFromUrl){
                   setTab(tabFromUrl);
              }
  
  }, [location.search])
  
  return (
    <div  className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar/>
      </div>
      {/* PRofile and ..... */}
        {tab ==='profile' && <DashProfile/>}
        {tab ==='posts' && <DashPosts/>}
        {tab==='users' && <DashUsers/>}
    </div>
  )
}

export default Dashboard