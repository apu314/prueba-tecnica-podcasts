import { Link } from 'wouter'

import Loader from '../../components/Loader'

const Header = () => {
  return (
    <header className='container py-4 mb-8 mx-auto  flex justify-between items-center border-b border-gray shadow-sm'>
      <Link href='/'>
        <a className='logo text-blue font-semibold no-underline'>Podcaster</a>
      </Link>
      <Loader />
    </header>
  )
}

export default Header
