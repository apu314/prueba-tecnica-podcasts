import { effect } from '@preact/signals-react'
import { useEffect, useState } from 'react'
import { Rings } from 'react-loader-spinner'

import { isLoadingSignal } from '../App'

const Loader = () => {
  const [state, setState] = useState(false)

  useEffect(() => effect(() => setState(isLoadingSignal.value)), [])

  return (
    <>
      {state && (
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
      )}
    </>
  )
}

export default Loader
