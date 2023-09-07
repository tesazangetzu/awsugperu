import * as React from 'react'
import { useState, useEffect } from 'react'
import { Layout } from '../../components/Layout'
import { Loader } from '../../components/Loader'

interface IUser {
  company: string;
  first_name: string;
  last_name: string;
}

const Success = () => {
  const [user, setUser] = useState<IUser>()
  const [qr, setQr] = useState<string>()
  const [loader, setLoader] = useState<boolean>(true)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${process.env.API_URL}/codes/${window.localStorage.getItem('code')}`
        )
        const res = await response.json()
        if (res.status) {
          setQr(res.data.image)
          setUser(res.data.person)
          setLoader(false)
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error)
      }
    }

    getData()
  }, [])

  return (
    <Layout>
      <section className="py-12">
        {loader
          ? (
          <Loader open={loader} className="pt-6" />
            )
          : (
          <div className="w-4/5 md:w-2/4 m-auto p-5 border rounded-md lg:flex lg:justify-between lg:items-center">
            <div className="p-3">
              <p className="text-xs text-center mb-2">
                {JSON.parse(window.localStorage.getItem('feature') || '{}').name}
              </p>
              <div className="md:w-[196px] p-2 border-4 border-black rounded-2xl m-auto sm:w-full">
                <img
                  className="md:w-[180px] lg:w-[200px] sm:w-full"
                  src={qr}
                  alt="qr"
                />
              </div>
            </div>
            <div className="lg:w-2/4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg text-green-600">Scanned Success</h2>
              </div>
              <div className="w-12 h-12 bg-blue-950 text-white uppercase p-3 mb-4">
                <p>
                  {user?.first_name.charAt(0)}
                  {user?.last_name.charAt(0)}
                </p>
              </div>
              <div className="[&>div>small]:block [&>div>span]:font-bold [&>div]:mb-2 text-sm">
                <div className="border-b-2 pb-2">
                  <small>First Name</small>
                  <span>{user?.first_name}</span>
                </div>
                <div className="border-b-2 pb-2">
                  <small>Last Name</small>
                  <span>{user?.last_name}</span>
                </div>
                <div>
                  <small>Company Name</small>
                  <span>{user?.company}</span>
                </div>
              </div>
            </div>
          </div>
            )}
      </section>
    </Layout>
  )
}

export default Success

export { Head } from './login'
