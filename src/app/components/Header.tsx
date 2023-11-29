import Link from 'next/link'

export default function Header() {
  return (
    <div className='flex items-center justify-start'>
      <Link href='/'>
        <h1 className='font-bold text-red-600 mr-4'>Learn NextJS</h1>
      </Link>
      <ul className='flex items-center justify-start'>
        <li className='px-4'>
          <Link href='/blogs'>
            <span>Blogs</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}
