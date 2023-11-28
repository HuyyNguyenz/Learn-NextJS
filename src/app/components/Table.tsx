import { Blog } from '../types/blog'

interface TableProps {
  blogs: Blog[]
}

export default function Table(props: TableProps) {
  const { blogs } = props
  return (
    <div className='my-4'>
      <table className='w-full table-auto border-collapse text-left'>
        <thead>
          <tr>
            <th className='border_table'>No</th>
            <th className='border_table'>Title</th>
            <th className='border_table'>Author</th>
            <th className='border_table'>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog.id}>
              <td className='border_table'>{index + 1}</td>
              <td className='border_table'>{blog.title}</td>
              <td className='border_table'>{blog.author}</td>
              <td className='border_table'>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>View</button>
                <button className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mx-4'>
                  Edit
                </button>
                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
