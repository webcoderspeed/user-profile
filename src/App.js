import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import Loader from "react-loader-spinner";

const App = () => {


  const [users, setUsers] = useState({});
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);


  const API_ENDPOINT = `https://reqres.in/api/users?page=${page}`;
  
    const fetchUsers = () => {
    setIsLoading(true)
    fetch(API_ENDPOINT)
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          setIsLoading(false);
          setUsers(data);
        }, 3000)
      })
      .catch(err => console.log(err));
  }



const next = () => {
  if(page<2){
    setIsLoading(true)
    setPage(page + 1)
  }
};
const back = () => {
  if(page>1){
    setIsLoading(true)
    setPage(page - 1);
  }
}

  useEffect(() => {
    fetchUsers();
  }, [page])


  return (
    <BrowserRouter>
      <div>
        <nav className='flex justify-evenly bg-gray-900 p-4'>
          <Link to='/' className='text-3xl font-bold text-white'>Nikky</Link>
          <button className='font-bold px-6 py-2 bg-yellow-400 text-white rounded-md' onClick={fetchUsers}>Get Users</button>
        </nav>
        {/* {
       <h1 className='text-center p-6 text-2xl'>You have no users to display click over the button GET USERS present in Navbar to display users</h1> 
      } */}
        {
          isLoading ? (
            <div className='h-96 flex items-center justify-center w-full'>
              <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} //3 secs
              />
            </div>
          ) : (
            <section className='flex flex-wrap gap-5 items-center justify-center p-4'>
              {
                users && users?.data?.map(user => {
                  return (
                    <div className='w-72 p-4 bg-white hover:shadow-md flex items-center flex-col gap-5 text-center' key={user.id}>
                      <img src={user.avatar} alt={user.first_name + user.last_name} className='w-24 h-24 rounded-full border-4 border-gray-400 border-opacity-50' />
                      <div>
                        <h1 className='font-bold text-xl text-red-400'>{user.first_name} {user.last_name}</h1>
                        <p>{user.email}</p>
                      </div>
                      <p className='text-xs'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae neque earum nihil? Nobis, earum atque.</p>
                      <div className='flex justify-evenly w-full'>
                        <a href="#facebook" className='text-red-400 text-xl'><FaFacebook /></a>
                        <a href="#instagram" className='text-red-400 text-xl hover:text-red-600'><FaInstagram /></a>
                        <a href="#linkedIn" className='text-red-400 text-xl hover:text-red-600'><FaLinkedin /></a>
                        <a href="#github" className='text-red-400 text-xl hover:text-red-600'><FaGithub /></a>
                      </div>
                    </div>
                  )
                })
              }
            </section>
          )
        }
        {
          users?.data ? (
            <div className='flex justify-center gap-5 items-center flex-col py-2'>
              Pages: {users?.page || 0}
              <div>
                <button className='px-4 py-2 bg-yellow-400 mr-2 font-bold' onClick={back}
                >Prev</button>
                <button className='px-4 py-2 bg-yellow-400 font-bold' onClick={next}
                >Next</button>
              </div>
            </div>
          ) : <></>
        }
      </div>
    </BrowserRouter>
  )
}

export default App

