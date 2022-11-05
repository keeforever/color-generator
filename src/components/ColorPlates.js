import { useState,useEffect } from 'react';

const ColorPlates = ({color}) => {
  const [copiedIndex, setcopiedIndex] = useState('')
  // copy hex value
  const copyHex=(hex)=>{
    navigator.clipboard.writeText(`#${hex}`)
  }
  useEffect(()=>{
    const time=setTimeout(() => {setcopiedIndex('')}, 1000);
    return ()=>{
      clearTimeout(time)
    }
  },[copiedIndex])
  return (
    <section className='color-plates-container'>
      {
        color.map((plate,index)=>{
          const {hex,weight}=plate
          return (
            <article key={index} className='color-plate' style={{backgroundColor:`#${hex}`}} onClick={()=>{
              copyHex(hex)
              setcopiedIndex(index)
              console.log(index)
              }}>
              <h1 className='color-percentage'>{weight}%</h1>
              <h1 className='hex-color'>#{hex}</h1>
              <h2 className='copied-alert' style={{opacity:`${copiedIndex===index ? 1 : 0}`}} >COPIED TO CLIPBOARD</h2>
            </article>
          )
        })
      }
    </section >
  )
}

export default ColorPlates
