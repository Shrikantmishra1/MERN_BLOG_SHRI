
import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import {BsFacebook,BsInstagram,BsTwitter,BsGithub} from 'react-icons/bs'
const FooterCom = () => {
  return (
   <Footer container className='border border-t-8 shadow-lg border-purple-500 ' >
          <div className='w-full max-w-7xl mx-auto'>
            <div className='grid w-full justify-between sm:flex md:grid-col'>
                <div className='mt-5'>
                <Link
        to="/"
        className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white "
      >
        <span
          className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-400 
      to-pink-500 rounded-2xl text-white
      "
        >
          SHRI
        </span>
        Blog
      </Link>
                </div>
                <div className='grid grid-cols-2 gap-8  sm:mt-4 sm:grid-cols-3 sm:gap-6'>
                   <div>
                   <Footer.Title  title="About"/>
                    <Footer.LinkGroup col>
                      <Footer.Link href='www.google.com' 
                      target='_blank' rel='noopener noreferrer'
                      >
                         Projets
                      </Footer.Link>
              
                      <Footer.Link href='/about' 
                      target='_blank' rel='noopener noreferrer'
                      >
                        ShriBlog
                      </Footer.Link>
                    </Footer.LinkGroup>
                   </div>
                   <div>
                   <Footer.Title  title="Follow Us"/>
                    <Footer.LinkGroup col>
                      <Footer.Link href='www.google.com' 
                      target='_blank' rel='noopener noreferrer'
                      >
                      GitHub
                      </Footer.Link>
              
                      <Footer.Link href='/about' 
                      target='_blank' rel='noopener noreferrer'
                      >
                      Linkdin
                      </Footer.Link>
                    </Footer.LinkGroup>
                   </div>
                   <div>
                   <Footer.Title  title="Legal"/>
                    <Footer.LinkGroup col>
                      <Footer.Link href='#' 
                      
                      >
                     Privacy Policy
                      </Footer.Link>
              
                      <Footer.Link href='#' 
                  
                      >
                    Terms and conditions
                      </Footer.Link>
                    </Footer.LinkGroup>
                   </div>
                </div>
            </div>
            <Footer.Divider/>
            <div className=''>
              <Footer.Copyright href='#' by="Shrikant'Blog" year={new Date().getFullYear()} />
            </div>
            <div className='flex gap-2  mt-3 sm:flex sm:justify-end'>
              <Footer.Icon  href='#' icon={BsFacebook}/>
              <Footer.Icon  href='#' icon={BsInstagram}/>
              <Footer.Icon  href='#' icon={BsTwitter}/>
              <Footer.Icon  href='#' icon={BsGithub}/>
            </div>
          </div>
     


   </Footer>
  )
}

export default FooterCom