import { Link } from 'gatsby-link'
import React from 'react'

export const Footer = () => {
  return (
    <footer className="bg-black p-[30px]">
      <div className="container">
        <div className="m-auto sm:w-auto md:w-[510px] text-slate-300 text-xs">
          <ul className="[&>li]:mb-2">
            <li>
              <Link to={'/'}>Privacy</Link>
            </li>
            <li>
              <Link to={'/'}>Site Terms</Link>
            </li>
          </ul>
          <p>
            © {new Date().getFullYear()} Amazon Web Services, Inc. or its
            affiliates. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
