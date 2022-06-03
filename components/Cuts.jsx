



function Cuts(prop){
    let three=[]
    let ten =[]
    let five=[]

    for(let i=1;i<`${prop.p}`;i++){
      let a = 100/`${prop.p}`
      prop.p===4?three.push(`${a*i}%`):prop.p===9? ten.push(`${a*i}%`):five.push(`${a*i}%`)
    }
   console.log(ten)
   console.log(three)
    let colour = ten.map(te=>{
      return <span className={`absolute top-[-10px]  z-50 text-[#ffffff] w-[10px]`} style={{left:te}}>|</span>

    })
    let cut1 = three.map(t=>{
        return  <span className={`absolute top-[-10px]  z-50 text-[#ffffff] w-[12px] left-[30%]`} style={{left:t}}>|</span>
      })
      let symm = five.map(t=>{
        return  <span className={`absolute top-[-10px]  z-50 text-[#ffffff] w-[12px]`} style={{left:t}}>|</span>
      })
    return  <>{prop.p===9? colour:prop.p ===4?cut1:prop.p===5?symm :null}</>  
}

export default Cuts

