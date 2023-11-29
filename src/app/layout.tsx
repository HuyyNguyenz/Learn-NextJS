import Footer from './components/Footer'
import Header from './components/Header'
import { ToastContainer } from 'react-toastify'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <div className='mx-32 my-4'>
          <Header />
          {children}
        </div>
        <Footer />
        <ToastContainer autoClose={2000} position='top-center' />
      </body>
    </html>
  )
}
