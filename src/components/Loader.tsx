import ReactDOM from 'react-dom'

export default function Loader() { 
  return ReactDOM.createPortal(
    <div className="fixed flex justify-center items-center top-0 left-0 z-1000 w-full h-full">
      <span className="loader"></span>
    </div>,
    document.body
  )
}
