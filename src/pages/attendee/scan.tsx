import * as React from 'react'
import { useState } from 'react'
import { QrReader } from 'react-qr-reader'
import { Layout } from '../../components/Layout'
import { navigate } from 'gatsby'

const Scan = () => {
  const [selected, setSelected] = useState('environment')
  const [startScan, setStartScan] = useState(false)
  const [loadingScan, setLoadingScan] = useState(false)

  return (
    <Layout>
      <section>
        <div className="container">
          <div className="py-8">
            <button
              className="px-5 py-2 border rounded-md m-auto block hover:bg-black hover:text-white mb-6"
              onClick={() => setStartScan(!startScan)}
            >
              {startScan ? 'Desactivar Camara' : 'Activar Camara'}
            </button>
            {startScan && (
              <>
                <select
                  className="block m-auto"
                  onChange={(e) => setSelected(e.target.value)}
                >
                  <option value={'environment'}>Back Camera</option>
                  <option value={'user'}>Front Camera</option>
                </select>
                <QrReader
                  constraints={{ facingMode: selected }}
                  onResult={(result, error) => {
                    if (result) {
                      const arr = result?.getText().split('/')
                      navigate(`/attendee/${arr[arr.length - 1]}`)
                    }
                  }}
                  className="sm:w-4/5 py-3 m-auto lg:w-2/4"
                />
              </>
            )}
            {loadingScan && <p>Loading</p>}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Scan

export { Head } from '../index'
