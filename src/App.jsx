import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from '../src/appwrite/auth_service.js'
import {login, logout} from './store/authSlice.js'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=> {
    authService.getCurrentUser()
    .then((userData)=> {
      if (userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=> {setLoading(false)})
  });


  return !loading ? (
    <div className='min-h-screen flex flex-wrap
    content-between bg-gray-400'>
      <div className='w-full black'>
          <Header/>
          <main>
            TODO:  {/* <Outlet/> */}
          </main>
          <Footer/>
      </div>
    </div>
  ) : null 


}

export default App
