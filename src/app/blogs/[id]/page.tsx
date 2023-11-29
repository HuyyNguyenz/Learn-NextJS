'use client'
import { Blog } from '@/app/types/blog'
import axios from 'axios'
import Link from 'next/link'
import useSWR, { Fetcher } from 'swr'

const fetcher: Fetcher<{ blog: Blog }, string> = (url: string) => axios.get(url).then((res) => res.data)

export default function BlogDetail({ params }: { params: { id: number } }) {
  const { id } = params
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${id}`, fetcher)
  if (error) return <div>Not found</div>
  if (isLoading) return <div>Loading...</div>
  return (
    <>
      <Link href='/blogs'>
        <button>Go back</button>
      </Link>
      <div className='text-center'>
        <h1 className='font-bold'>Title: {data?.blog.title}</h1>
        <p className='text-left'>{data?.blog.content}</p>
        <span>
          Author: <strong>{data?.blog.author}</strong>
        </span>
      </div>
    </>
  )
}
