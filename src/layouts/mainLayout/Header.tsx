import { Rings } from 'react-loader-spinner'
import { Link } from 'wouter'

const Header = () => {
  return (
    <header className='container py-4 mb-8 mx-auto  flex justify-between items-center border-b border-gray shadow-sm'>
      <Link href='/'>
        <a className='logo text-blue font-semibold no-underline'>Podcaster</a>
      </Link>
      <div className='loader'>
        <Rings
          height='40'
          width='40'
          color='rgb(78, 145, 206)'
          radius='6'
          wrapperStyle={{}}
          wrapperClass=''
          visible={true}
          ariaLabel='loading'
        />
      </div>
    </header>
  )
}

export default Header
