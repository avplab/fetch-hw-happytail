import { MouseEventHandler, ReactNode, useRef } from "react"

export interface ButtonProps {
  onClick?: MouseEventHandler;
  className: string;
  children: ReactNode;
}

export default function Button({ onClick = () => {}, className = '', children }: ButtonProps) {
  const node = useRef(null)
  
  // click effect for button
  // useEffect(() => {
  //   document.addEventListener('mousedown', (e) => {
  //     if (e.target === node?.current) {
  //       node.current.classList.add('scale-95')
  //     }
  //   })
  //   document.addEventListener('mouseup', () => {
  //     node.current?.classList.remove('scale-95')
  //   })
  // }, [])

  return (
    <button ref={node}
      onClick={onClick}
      className={`flex gap-1 justify-center items-center h-14 px-4 rounded-xl bg-white hover:bg-gray-100 active:bg-gray-100 cursor-pointer ${className}`
    }>
      {children}
    </button>
  )  
}