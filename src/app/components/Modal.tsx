import { Blog } from '../types/blog'
import { useState } from 'react'

interface ModalProps {
  show: (value: boolean) => void
}
const initBlog = {
  author: '',
  content: '',
  title: ''
}

export default function Modal(props: ModalProps) {
  const [blog, setBlog] = useState<Blog>(initBlog)

  const handleClick = () => {
    props.show(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBlog((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleReset = () => {
    setBlog(initBlog)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('blog:', blog)
  }

  return (
    <>
      <div className='bg-white w-[50%] min-h-[50%] max-h-[80%] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 rounded-md'>
        <div className='flex items-center justify-between p-4 border-b border-solid border-black'>
          <h2 className='font-semibold text-lg'>Add a new blog</h2>
          <button onClick={handleClick} className='font-bold hover:text-red-700 text-lg'>
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
              name='content'
              onChange={handleChange}
              className='border-2 border-gray-300 rounded-md w-full h-28 p-2 outline-none resize-none'
              placeholder='Content'
            />
          </div>
          <div className='flex items-center justify-center'>
            <button type='submit' className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
              Submit
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
