import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/common/Spinner'
import Header from '../components/nav/LoginHeader'
import { Link } from 'react-router-dom'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/dashboard')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Header />
      <div className='items-center justify-center flex h-screen'>
        <div className='w-screen'>
          <section className='text-center mb-10'>
            <p className='text-[24px] nun-font-700'>Login to your Account</p>
          </section>
          <section className='text-center'>
            <form onSubmit={onSubmit}>
              <div className=''>
                <input
                  type='email'
                  className=' duration-[300ms] rounded-lg w-[70%] md:w-[30%] px-4 py-2.5 mb-[15px] outline-none'
                  id='email'
                  name='email'
                  value={email}
                  placeholder='Enter your email'
                  onChange={onChange}
                />
              </div>
              <div className=''>
                <input
                  type='password'
                  className='duration-[300ms]  rounded-lg w-[70%] md:w-[30%] px-4 py-2.5 my-[15px] outline-none'
                  id='password'
                  name='password'
                  value={password}
                  placeholder='Enter password'
                  onChange={onChange}
                />
              </div>

              <div className='my-2'>
                <button className=' bg-black hover:scale-[1.01] duration-[300ms] text-white drop-shadow-2xl py-[10px] px-[20px]  rounded-full nun-font-600 '>
                  Login
                </button>
              </div>
            </form>

            <div className='text-[16px] mt-6 nun-font-500'>
              Don't have an account?
            </div>
            <div className='hover:scale-[1.05] duration-[300ms] mt-1'>
              <Link to='/register' >
                <span className='text-[18px] hover:cursor-pointer nun-font-700' >

                  Register now

                </span>

              </Link>
            </div>

          </section>
        </div>
      </div>
    </>
  )
}

export default Login
