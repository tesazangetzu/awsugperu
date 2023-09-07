import * as React from 'react'
import { Layout } from '../../components/Layout'
import { Link } from 'gatsby'
import { CameraIcon } from '@heroicons/react/24/solid'

const Register = () => {
  return (
    <Layout>
      <section className="py-12">
        <div className="container">
          <div className="w-4/5 m-auto md:w-2/5 lg:w-1/3">
            <p className="text-center mb-3">
              Para empear escanea tu credencial con la camara de tu dispositivo
            </p>
            <Link
              to="/attendee/scan"
              className="flex justify-center p-3 m-2 border rounded-md w-4/5 mx-auto hover:bg-black hover:text-white text-center"
            >
              <CameraIcon width={24} className="mr-2" />
              Aqui
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Register

export { Head } from '../index'
