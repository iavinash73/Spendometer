import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <nav className="absolute rounded-lg px-10 py-3 w-full  top-0">
      <div className="flex items-center justify-between ">
        <div className="flex items-center">
          <Link className='nun-font-700 text-[20px] duration-[300ms]' to='/'><span>Expense</span></Link>
        </div>

        <ul className='flex '>
          <>
            <li >
              <Link className='flex nun-font-600 items-center mx-[20px] text-[18px]' to='/'>
                <FaSignInAlt /><span className='px-[10px]'>Login</span>
              </Link>
            </li>
            <li>
              <Link className='flex nun-font-600 items-center mx-[20px] text-[18px]' to='/register'>
                <FaUser /><span className='px-[10px]'>Register</span>
              </Link>
            </li>
          </>
        </ul>
      </div>

    </nav>
  )
}

export default Header
