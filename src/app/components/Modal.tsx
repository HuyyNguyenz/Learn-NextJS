import { Blog } from '../types/blog'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { mutate } from 'swr/_internal'

interface ModalProps {
  visible: (value: boolean) => void
  editBlogId: number | null
}

const initBlog = {
  author: '',
  content: '',
  title: ''
}

export default function Modal(props: ModalProps) {
  const { editBlogId } = props
  const [blog, setBlog] = useState<Blog>(initBlog)

  const handleCloseModal = () => {
    handleReset()
    props.visible(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBlog((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleReset = () => {
    setBlog(initBlog)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (blog.title === '' || blog.author === '' || blog.content === '') return toast.error('Please fill all fields')
    const result = editBlogId
      ? (await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${editBlogId}`, blog)).data
      : (await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs`, blog)).data
    if (result) {
      toast.success(result.message)
      handleCloseModal()
      mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs`)
    }
  }

  useEffect(() => {
    if (editBlogId) {
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${editBlogId}`).then((res) => {
        if (res.data) {
          setBlog(res.data.blog)
        }
      })
    }
  }, [editBlogId])

  return (
    <>
      <div className='bg-white w-[50%] min-h-[50%] max-h-[80%] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 rounded-md'>
        <div className='flex items-center justify-between p-4 border-b border-solid border-black'>
          <h2 className='font-semibold text-lg'>{editBlogId ? 'Update a blog' : 'Add a new blog'}</h2>
          <button onClick={handleCloseModal} className='font-bold hover:text-red-700 text-lg'>
            X
          </button>
        </div>
        <form onReset={handleReset} onSubmit={handleSubmit} className='m-4 text-center'>
          <div className='flex flex-col items-start justify-start mb-2'>
            <label htmlFor='title' className='font-semibold text-lg mb-2'>
              Title
            </label>
            <input
              name='title'
              value={blog.title}
              onChange={handleChange}
              type='text'
              className='border-2 border-gray-300 rounded-md w-full p-2 outline-none'
              placeholder='Title'
            />
          </div>
          <div className='flex flex-col items-start justify-start mb-2'>
            <label htmlFor='author' className='font-semibold text-lg mb-2'>
              Author
            </label>
            <input
              value={blog.author}
              name='author'
              onChange={handleChange}
              type='text'
              className='border-2 border-gray-300 rounded-md w-full p-2 outline-none'
              placeholder='Author'
            />
          </div>
          <div className='flex flex-col items-start justify-start mb-2'>
            <label htmlFor='content' className='font-semibold text-lg mb-2'>
              Content
            </label>
            <textarea
              value={blog.content}
              name='content'
              onChange={handleChange}
              className='border-2 border-gray-300 rounded-md w-full h-28 p-2 outline-none resize-none'
              placeholder='Content'
            />
          </div>
          <div className='flex items-center justify-center'>
            <button type='submit' className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
              {editBlogId ? 'Update' : 'Add'}
            </button>
            <button type='reset' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4'>
              Clear
            </button>
          </div>
        </form>
      </div>
      <div className='bg-black fixed top-0 left-0 opacity-80 z-10 w-screen h-screen'></div>
    </>
  )
}
