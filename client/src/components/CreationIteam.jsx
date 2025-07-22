import React, { useState } from 'react'
import Markdown from 'react-markdown'
const CreationIteam = ({item}) => {
  const [expanded,setExpanded] = useState(false)

  return (
    <div onClick={()=> setExpanded(!expanded)} className='p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer'>
      <div className='flex justify-between items-center gap-4'>
        <div>
          <h2>{item.prompt}</h2>
          <p className='text-gray-500'>{item.type} - {new Date(item.created_at).toLocaleDateString()}</p>
          <button className='bg-[#EFF6FF] norder border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full'> {item.type}</button>
        </div>
      </div>
      {
        expanded && (
          <div className='mt-4'>
            {item.type === 'image' ? (
              <div>
                <img src={item.content} alt='image' className='m-3 w-full max-w-,d'/>

              </div>
            ) : (
              <div className='m-3 h-full overflow-y-scroll text-sm text-slate-700'>
                <div className='reset-tw'>
                  <Markdown>{item.content}</Markdown>
                </div>
              </div>
            )}  
          </div>
        )
      }
    </div>
  )
}

export default CreationIteam
