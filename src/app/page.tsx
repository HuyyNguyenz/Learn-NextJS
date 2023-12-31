import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HomePage',
  description: 'HomePage description'
}

export default function Home() {
  return (
    <div>
      <ul>
        <li>
          <Link href='/facebook'>Facebook</Link>
        </li>
        <li>
          <Link href='/youtube'>Youtube</Link>
        </li>
        <li>
          <Link href='/tiktok'>Tiktok</Link>
        </li>
      </ul>
    </div>
  )
}
