
import { useState,useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import DashSidebar from '../component/DashSidebar';
import DashProfile from '../component/DashProfile';

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
    </div>
  )
}

export default Dashboard