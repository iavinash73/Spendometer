import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import { Link } from 'react-router-dom'
import Spinner from '../components/common/Spinner'
import Header from '../components/nav/LoginHeader'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',

  })


  const [postImage, setPostImage] = useState("")

  const { name, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64)
    setPostImage(base64)

  };



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
    console.log(postImage);

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
        postImage
      }

      dispatch(register(userData))

    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Header />
      <div className='items-center justify-center flex h-screen'>
        <div className='w-screen'>
          <section className='text-center mb-8'>
            {/* <h1 className='text-[30px] nun-font-700'>
              Register
            </h1> */}
            <p className='text-[24px] nun-font-700 mb-2'>EXspent(s) Over Your Head?</p>
            <p className='text-[24px] nun-font-700'>Register now to Manage your expenses </p>

            {/* <p className='text-[24px] nun-font-700'></p> */}
          </section>

          <section className='text-center'>
            <form onSubmit={onSubmit}>
              <div className=''>
                <input
                  type='text'
                  className=' duration-[300ms] rounded-lg w-[70%] md:w-[30%] px-4 py-2.5 mb-[15px] outline-none'
                  id='name'
                  name='name'
                  value={name}
                  placeholder='Enter your name'
                  onChange={onChange}
                />
              </div>
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
                  className=' duration-[300ms] rounded-lg w-[70%] md:w-[30%] px-4 py-2.5 mb-[15px] outline-none'
                  id='password'
                  name='password'
                  value={password}
                  placeholder='Enter password'
                  onChange={onChange}
                />
              </div>
              <div className=''>
                <input
                  type='password'
                  className=' duration-[300ms] rounded-lg w-[70%] md:w-[30%] px-4 py-2.5 mb-[15px] outline-none'
                  id='password2'
                  name='password2'
                  value={password2}
                  placeholder='Confirm password'
                  onChange={onChange}
                />
              </div>
              <div className="mb-6">
                <input
                  lable="image"
                  type="file"
                  name="image"
                  onChange={(e) => handleImageChange(e)}
                  className='rounded-lg'
                />


              </div>
              <div className='my-2'>
                <button className=' bg-black hover:scale-[1.01] duration-[300ms] text-white py-[10px] px-[20px]  drop-shadow-2xl rounded-full nun-font-600 '>
                  Register
                </button>
              </div>
              <div className='text-[16px] nun-font-500'>
                Already have an account?
              </div>
              <div className='hover:scale-[1.1] duration-[300ms]'>
                <Link className='text-[18px] hover:cursor-pointer nun-font-700' to='/' >
                  Login</Link>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  )
}



export default Register

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}