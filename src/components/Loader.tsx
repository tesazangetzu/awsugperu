import * as React from 'react'
import llamita from '../images/llama.svg'

type Iloader = {
  open: boolean;
  className?: string;
};

export const Loader = ({ open, className = '' }: Iloader) => {
  return (
    <>
      {open && (
        <div className={className}>
          <img src={llamita} className="llamita w-52 m-auto" />
        </div>
      )}
    </>
  )
}
