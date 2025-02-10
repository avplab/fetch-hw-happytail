import logo from '@/assets/logo.webp'

export default function Logo(props: { className: string }) {
  return <img src={logo} {...props} />  
}