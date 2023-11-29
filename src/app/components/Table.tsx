import Link from 'next/link'
import { Blog } from '../types/blog'
import { formatDistanceToNow } from 'date-fns'
import axios from 'axios'
import { toast } from 'react-toastify'
import { mutate } from 'swr'

interface TableProps {
  blogs: Blog[]
  editBlog: (id: number) => void
}

export default function Table(props: TableProps) {
  const { blogs } = props

  const handleEditBlog = (id: number) => {
    props.editBlog(id)
  }

  const handleDeleteBlog = async (id: number) => {
    if (confirm(`Are you sure you want to delete this blog id=${id}`) === true) {
      const result = (await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${id}`)).data
      if (result) {
        toast.success(result.message)
        mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs`)
      }
    }
  }

  return (
    <div className='my-4'>
      <table className='w-full table-auto border-collapse text-left'>
        <thead>
          <tr>
            <th className='border_table'>No</th>
            <th className='border_table'>Title</th>
            <th className='border_table'>Author</th>
            <th className='border_table'>Created at</th>
            <th className='border_table'>Updated at</th>
            <th className='border_table'>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs
            .sort((a, b) => Number(b.id) - Number(a.id))
            .map((blog) => {
              const createdAt = formatDistanceToNow(new Date(blog.created_at as string), { addSuffix: true })
              const updatedAt = formatDistanceToNow(new Date(blog.updated_at as string), { addSuffix: true })
              return (
                <tr key={blog.id}>
                  <td className='border_table'>{blog.id}</td>
                  <td className='border_table'>{blog.title}</td>
                  <td className='border_table'>{blog.author}</td>
                  <td className='border_table'>{createdAt}</td>
                  <td className='border_table'>{updatedAt}</td>
                  <td className='border_table'>
                    <Link href={`/blogs/${blog.id}`}>
                      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                        View
                      </button>
                    </Link>
                    <button
                      onClick={() => handleEditBlog(Number(blog.id))}
                      className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mx-4'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(Number(blog.id))}
                      className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}
