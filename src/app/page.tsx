'use client'

import Link from 'next/link'
import { useState } from 'react'
import Table from './components/Table'
import useSWR from 'swr'
import Modal from './components/Modal'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Home() {
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })
  if (!data) return <div>Loading...</div>

  const handleOpenModal = () => {
    setIsShowModal(true)
  }

  const handleCloseModal = (value: boolean) => {
    setIsShowModal(value)
  }

  return (
    <div>
      {/* <ul>
        <li className='list-disc'>
          <Link href='/facebook'>Facebook</Link>
        </li>
        <li className='list-disc'>
          <Link href='/youtube'>Youtube</Link>
        </li>
        <li className='list-disc'>
          <Link href='/tiktok'>Tiktok</Link>
        </li>
      </ul> */}
      <div className='flex items-center justify-between'>
        <h1 className='font-semibold text-xl'>Table Blogs</h1>
        <button
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleOpenModal}
        >
          Add New
        </button>
      </div>
      <Table blogs={data.blogs} />
      {isShowModal && <Modal show={(value) => handleCloseModal(value)} />}
    </div>
  )
}
