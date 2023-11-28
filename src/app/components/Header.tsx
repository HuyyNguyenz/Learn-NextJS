import Link from 'next/link'

export default function Header() {
  return (
    <div className='flex items-center justify-start'>
      <Link href='/'>
        <h1 className='font-bold text-red-600 mr-4'>Learn NextJS</h1>
      </Link>
      <ul className='flex items-center justify-start'>
        <li className='px-4'>
          <Link href='/facebook'>
            <span>Facebook</span>
          </Link>
        </li>
        <li className='px-4'>
          <Link href='/youtube'>
            <span>Youtube</span>
          </Link>
        </li>
        <li className='px-4'>
          <Link href='/tiktok'>
            <span>Tiktok</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}
