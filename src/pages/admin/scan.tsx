import * as React from 'react'
import { useState, useEffect } from 'react'
import { QrReader } from 'react-qr-reader'
import { Layout } from '../../components/Layout'
import { navigate } from 'gatsby'

interface IListFeature {
  id: string;
  name: string;
  type: string;
}

const Scan = () => {
  const [selectedCam, setSelectedCam] = useState('environment')
  const [selectedFeature, setSelectedFeature] = useState('-1')
  const [listFeature, setListFeature] = useState<IListFeature[]>()
  const [startScan, setStartScan] = useState(false)
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState('')

  interface IReward {
    code: string;
    feature: string;
  }

  const handleSubmit = async (values: IReward) => {
    setLoader(true)

    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.API_URL}/rewards`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${window.localStorage.getItem('user')}`
          },
          body: JSON.stringify(values)
        })
        const res = await response.json()

        if (!res.status) {
          setLoader(false)
          setError(res.message)
        } else {
          window.localStorage.setItem('code', values.code)
          window.localStorage.setItem(
            'feature',
            JSON.stringify(listFeature?.find((f) => (f.id = selectedFeature)))
          )
          navigate('/admin/success')
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error)
      }
    }

    fetchData()
  }

  useEffect(() => {
    window.localStorage.removeItem('code')
    window.localStorage.removeItem('feature')

    const getData = async () => {
      try {
        const response = await fetch(`${process.env.API_URL}/me/features`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${window.localStorage.getItem('user')}`
          }
        })
        const res = await response.json()
        if (res.status) setListFeature(res.data)
      } catch (error) {
        console.error('Error al obtener los datos:', error)
      }
    }

    getData()
  }, [])

  return (
    <Layout>
      <section>
        <div className="container">
          <div className="py-8">
            <select
              className="block m-auto mb-5 px-5 py-3 border rounded-md"
              onChange={(e) => {
                setSelectedFeature(e.target.value)
                setStartScan(false)
              }}
            >
              <option value="-1">Select Feature</option>
              {listFeature &&
                listFeature.map((item, key) => (
                  <option value={item.id} key={key}>
                    {item.name}
                  </option>
                ))}
            </select>
            <button
              className="px-5 py-2 border rounded-md m-auto block hover:bg-black hover:text-white mb-6"
              onClick={() => setStartScan(!startScan)}
              disabled={selectedFeature === '-1'}
            >
              {startScan && selectedFeature !== '-1'
                ? 'Desactivar Camara'
                : 'Activar Camara'}
            </button>
            {startScan && selectedFeature !== '-1' && (
              <>
                <select
                  className="block m-auto"
                  onChange={(e) => setSelectedCam(e.target.value)}
                >
                  <option value={'environment'}>Back Camera</option>
                  <option value={'user'}>Front Camera</option>
                </select>
                <QrReader
                  constraints={{ facingMode: selectedCam }}
                  onResult={(result) => {
                    if (result) {
                      const arr = result?.getText().split('/')
                      handleSubmit({
                        code: arr[arr.length - 1],
                        feature: selectedFeature
                      })
                    }
                  }}
                  className="sm:w-4/5 py-3 m-auto lg:w-2/4"
                />
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Scan

export { Head } from './login'
