

function Label(props){
    let a1 = ["Excellent","Very Good","Good","Fair"]
    let a2 = ["M","L","K","J","I","H","G","F","E","D"]
    let a3 = ["I1","SI3","SI2","SI1","VS2","VS1","VVS2","VVS1","IF"]
    let a4 = ["Strong","Medium","Faint","None"]
    let a5= ["Excellent","Very Good","Good","Fair","Poor"]
  

    let A1 = a1.map(item => {
        return <div key={item}>{item}</div>
    })

    let A2 = a2.map(item => {
        return <div key={item} className="w-[10%] text-center" >{item}</div>
    })

    let A3 = a3.map(item => {
        return <div key={item}>{item}</div>
    })

    let A4 = a4.map(item => {
        return <div key={item}>{item}</div>
    })

    let A5 = a5.map(item => {
        return <div key={item}>{item}</div>
    })
    return(
        <>
            {props.k ==='op' && <div className='flex justify-between mt-[20px]'>
                                    <select onChange={(e) => props.h(`${props.l}`,e)} value={parseFloat(props.d[props.l])} >   
                                        {props.o}
                                    </select>
                                    <select onChange={(e) => props.h(`${props.r}`,e)} value={parseFloat(props.d[props.r])} >
                                        {props.o}
                                    </select>
                                </div>
            }

            {    props.k==="cut" && <div className='flex justify-around mt-[20px] text-[12px]'>
                                    {A1}
                                </div>
            }

            {props.k==="color" && <div className='flex  mt-[20px] text-[18px]  justify-around'>
                                    {A2}
                                  </div> 
            }

        {props.k==='clarity'&& <div className='flex justify-around mt-[20px] text-[12px]'>
       {A3}
        </div>}


        {props.k==='fluor' && <div className='flex justify-around mt-[20px] text-[12px]'>
      
      {A4}
     
      </div>}

      {props.k==='symm' && <div className='flex justify-around mt-[20px] text-[12px]'>
      
     {A5}
     
      </div>}

      {props.k==='polish' && <div className='flex justify-around mt-[20px] text-[12px]'>
      
     {A5}
     
      </div>}
      {props.k==='depth' &&  <div className='flex justify-between mt-[20px]'>
                <input className='border-[1px] rounded border-[black] mr-[50px] ml-[20px]'
                  type="number"
                  placeholder={props.d[props.l]}
                  value={props.d[props.l]}
                  onChange={(e) => props.h(props.l, e)}
                />
        <input className='border-[1px] rounded border-[black] '
                  type="number"
                  placeholder={props.d[props.r]}
                  value={props.d[props.r]}
                  onChange={(e) => props.h(props.r, e)}
                />
       </div>}
  
        </>
    )
}

export default Label
