'use client'
import { useState } from 'react'
import useSWR from 'swr'
import Table from '../components/Table'
import Modal from '../components/Modal'
import axios from 'axios'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export default function Blogs() {
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [editBlogId, setEditBlogId] = useState<number | null>(null)
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })

  const handleOpenModal = () => {
    setIsShowModal(true)
  }

  const handleCloseModal = (value: boolean) => {
    setIsShowModal(value)
    setEditBlogId(null)
  }

  const handleEditBlog = (id: number) => {
    setEditBlogId(id)
    setIsShowModal(true)
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='font-semibold text-xl'>Table Blogs</h1>
        <button
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleOpenModal}
        >
          Add New
        </button>
      </div>
      <Table blogs={data.blogs} editBlog={(value) => handleEditBlog(value)} />
      {isShowModal && <Modal editBlogId={editBlogId} visible={(value) => handleCloseModal(value)} />}
    </>
  )
}
