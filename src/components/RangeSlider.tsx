import { useRef, useMemo, MouseEventHandler } from 'react';

function createCalc(rangeMin: number, rangeMax: number, element: Element | null) {
  return {
    toPercent(position: number) {
      if (!element) {
        return 0
      }
      const { left, right } = element.getBoundingClientRect()
      return (Math.min(right, Math.max(left, position)) - left) / (right - left) * 100
    },
    toValue(leftPercent: number, rightPercent: number): [number, number] {
      return [leftPercent, rightPercent].map(percent => Math.round(percent / 100 * (rangeMax - rangeMin) + rangeMin)) as [number, number]
    },
    percent(value: number) {
      return (value - rangeMin) / Math.abs(rangeMax - rangeMin) * 100
    }
  }
}

export interface RangeSliderProps { 
  rangeMin: number; 
  rangeMax: number;
  valueLeft: number;
  valueRight: number;
  onChange: (minVal: number, maxVal: number) => void;
}

export default function RangeSlider({ rangeMin, rangeMax, valueLeft, valueRight, onChange }: RangeSliderProps) {  
  const [ initialLeft, initialRight ] = useMemo(() => {
    const { percent } = createCalc(rangeMin, rangeMax, null)
    return [ percent(valueLeft), percent(valueRight) ]
  }, [ valueLeft, valueRight ])

  // const [left, setLeft] = useState(initialLeft)
  // const [right, setRight] = useState(initialRight)  
  const ref = useRef(null)

  const handleClick: MouseEventHandler = (event) => {
    if (ref.current && event.target === event.currentTarget) {
      const { toPercent, toValue } = createCalc(rangeMin, rangeMax, ref.current)  
      const pos = toPercent(event.clientX)
      // if (pos < left) {
      if (pos < initialLeft) {
        // setLeft(pos)
        // onChange(...toValue(pos, right))
        onChange(...toValue(pos, initialRight))
      } else {
        // setRight(pos)
        // onChange(...toValue(left, pos))
        onChange(...toValue(initialLeft, pos))
      }
    }
  }

  const handleMove = (event: MouseEvent | Touch, type: string) => {
    if (ref.current) {
      const { toPercent, toValue } = createCalc(rangeMin, rangeMax, ref.current)  
      const pos = toPercent(event.clientX)
      if (type == 'left') {
          // setLeft(Math.min(pos, right))
          // onChange(...toValue(Math.min(pos, right), right))
          onChange(...toValue(Math.min(pos, initialRight), initialRight))
        } else {
          // setRight(Math.max(pos, left))
          // onChange(...toValue(left, Math.max(pos, left)))
          onChange(...toValue(initialLeft, Math.max(pos, initialLeft)))
        }
    }
  }

  const handleStartMove = (type: string) => {
    
    const moveHandler = (e: TouchEvent | MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      
      const event = 'touches' in e ? e.touches[0] : e
      handleMove(event, type)  
    }

    const endHandler = () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("touchmove", moveHandler);
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", endHandler, { once: true });
    document.addEventListener("touchmove", moveHandler, { passive: false });
    document.addEventListener("touchend", endHandler, { once: true });
  }

  return (<div className="m-3">
    <div ref={ref} className="relative w-full h-1 bg-gray-300 border-y-5 border-white cursor-pointer box-content" onClick={handleClick}>
        <div 
          onClick={handleClick}
          className="absolute h-full bg-cyan-800 top-0" 
          style={{left: `${initialLeft}%`, right: `${100 - initialRight}%`}} 
        />
        <div
          onMouseDown={() => handleStartMove('left')}
          onTouchStart={() => handleStartMove('left')}
          className="absolute w-6 h-6 bg-cyan-800 rounded-full -translate-x-1/2 top-0.75 -translate-y-1/2" 
          style={{left: `${initialLeft}%`}} 
        />
        <div 
          onMouseDown={() => handleStartMove('right')}
          onTouchStart={() => handleStartMove('right')}
          className="absolute w-6 h-6 bg-cyan-800 rounded-full -translate-x-1/2 top-0.75 -translate-y-1/2"
          style={{left: `${initialRight}%`}}
        />
    </div>
  </div>)
}