
    
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import React, {useState,useEffect} from 'react'
import axios from 'axios';
import Link from 'next/link'

export default function compare(){

    let nam = {

        Round: 'ROUND',
        B:'ROUND',
        BR:'ROUND',
        RD:'ROUND',
        RB:'ROUND',
        RBC:'ROUND',
        ["Round Brilliant"]:'ROUND',
        RND:'ROUND',
        ROUND:'ROUND',
        Princess:'PRINCESS',
        PRN:'PRINCESS',
        PRIN:'PRINCESS',
        PR:'PRINCESS',
        PN:'PRINCESS',
        PC:'PRINCESS',
        PRINCESS:'PRINCESS',
        CUSHION:'CUSHION',
        "Cushion Brilliant":'CUSHION',
        Cushion:'CUSHION BRILLIANT',
        CB:'CUSHION BRILLIANT',
        "Cushion Modified":'CUSHION',
        C:'CUSHION',
        CU:'CUSHION',
        CMB:'CUSHION',
        CUSH:'CUSHION',
        CRC:'CUSHION',
        SCMB:'CUSHION',
        "CUSHION MODIFIED":'CUSHION',
        'CUSHION BRILLIANT':'CUSHION',
        ASSCHER:'ASSCHER',
        A:'ASSCHER',
        CSS:'ASSCHER',
        CSSC:'ASSCHER',
        AC:'ASSCHER',
        Asscher:'ASSCHER',
        MARQUISE:'MARQUISE',
        Marquise:'MARQUISE',
        MQB:'MARQUISE',
        M:'MARQUISE',
        MQ:'MARQUISE',
        OVAL:'OVAL',
        Oval:'OVAL',
        O:'OVAL',
        OV:'OVAL',
        OMB:'OVAL',
        RADIANT:'RADIANT',
        Radiant:'RADIANT',
        R:'RADIANT',
        RAD:'RADIANT',
        RA:'RADIANT',
        RC:'RADIANT',
        RDNv:'RADIANT',
        "Square Radiant":'RADIANT',
        "Sq Radiant":'RADIANT',
        SQR:'RADIANT',
        'SQUARE RADIANT':'RADIANT',
        PEAR:'PEAR',
        P:'PEAR',
        PS:'PEAR',
        PSH:'PEAR',
        PB:'PEAR',
        PMB:'PEAR',
        EMERALD:'EMERALD',
        Emerald:'EMERALD',
        E:'EMERALD',
        EM:'EMERALD',
        EC:'EMERALD',
        'Square Emerald':'EMERALD',
        SQE:'EMERALD',
        SQEM:'EMERALD',
        SX:'EMERALD',
        'SQUARE EMERALD':'EMERALD',
        HEART:'HEART',
        Heart:'HEART',
        H:'HEART',
        HS:'HEART',
        HT:'HEART',
        MHRC:'HEART',
        GIA:'GIA',
        G:'GIA',
        'G.I.A':'GIA',
        IGI:'IGI',
        I:'IGI',
        AGS:'AGS',
        AGSL:'AGS',
        AGS0:'AGS',
        A:'AGS',
        HRD:'HRD',
        H:'HRD',
        Excellent:'Excellent',
        EX:'Excellent',
        EXC:'Excellent',
        'Very Good':'Very Good',
        VG:'Very Good',
        Good:'Good',
        G:'Good',
        GD:'Good',
        F:'Fair',
        Fair:'Fair',
        Poor:'Poor',
        P:'Poor',
        Strong:'Strong',
        S:'Strong',
        STG:'Strong',
        ST:'Strong',
        FL3:'Strong',
        Medium:'Medium',
        M:'Medium',
        MED:'Medium',
        FL2:'Medium',
        Faint:'Faint',
        F:'Faint',
        FNT:'Faint',
        FA:'Faint',
        FL1:'Faint',
        None:'None',
        N:'None',
        NON:'None',
        No:'None',
        NIL:'None',
        FL0:'None',
        nil:'None',
          }


          let [compareItems,setcompareItems] = useState([])
  
          let [heartCount,setheartCount] = useState(0)
          useEffect(() => {  
            if (typeof window !== "undefined") {
              setcompareItems(localStorage.getItem('compare') && JSON.parse(localStorage.getItem('compare'))  )
     
                setheartCount(localStorage.getItem('heartcount') && JSON.parse(localStorage.getItem('heartcount'))  )
            }  
            }, []);

       
          

    // function remove(p){
    //     const index = compareItems.indexOf(p);
    //     compareItems.splice(index, 1)
       
    //     setheartCount(prev=>prev-1)
    //   }

      useEffect(() => {
   
        localStorage.setItem('compare', JSON.stringify(compareItems))
    
        localStorage.setItem('heartcount', JSON.stringify(heartCount))
     
        },[heartCount]);


 

        let a = []   

        let [res,setRes] = useState([])
useEffect(()=>{
   axios.get(` http://gems.netfillip.org/public/comparediamondsdata?ids=${compareItems}`)
    .then(res1 => {
      const diamondss = res1.data;
      setRes(diamondss)
    
    })
   
},[heartCount])

res.map(item=>a.push(item.stock_num))



function swapRight(p){

  const node = document.getElementById("parent");
  const list = document.getElementById(a[a.indexOf(p)+1]);
  document.getElementById(a[a.indexOf(p)]).classList.add("animation2");
  document.getElementById(a[a.indexOf(p)+1]).classList.add("animation1");
  setTimeout(function() {
    document.getElementById(a[a.indexOf(p)]).classList.remove("animation2");
    document.getElementById(a[a.indexOf(p)+1]).classList.remove("animation1");
    node.insertBefore(list, node.children[a.indexOf(p)]);
    var temp = a[a.indexOf(p)]
    var temp1 = a.indexOf(p) + 1
    a.splice(a.indexOf(p),1,a[a.indexOf(p) + 1]);
    a.splice(temp1,1,temp);
   
  }, 1000); 
}


function swapLeft(p){
 
  
  const node = document.getElementById("parent");
  const list = document.getElementById(a[a.indexOf(p)]);
 
  document.getElementById(a[a.indexOf(p)]).classList.add("animation1");
  document.getElementById(a[a.indexOf(p)-1]).classList.add("animation2");
  setTimeout(function() {
    document.getElementById(a[a.indexOf(p)]).classList.remove("animation1");
  document.getElementById(a[a.indexOf(p)-1]).classList.remove("animation2");
  node.insertBefore(list, node.children[a.indexOf(p)-1]);
 
  var temp = a[a.indexOf(p)]
  var temp1 = a.indexOf(p) - 1
  a.splice(a.indexOf(p),1,a[a.indexOf(p) - 1]);
  a.splice(temp1,1,temp);

 
}, 1000);

  
}
let [boxName,setboxName] = useState()
let [hide,sethide]=useState(false)

function infobox(b){
  if(boxName===b){
    sethide(prev=>!prev)
  }else{
    sethide(true)
  }

setboxName(b)
}

if (typeof window !== "undefined") {
  window.addEventListener('click', function(e) {
    const allModals = document.querySelectorAll('.box');
    if (!e.path.some(x => x.className && (x.className.includes('box')   || x.className.includes('fa-circle-info') ))) {
      allModals.forEach(x => {
        x.style.display = 'none' 
        sethide(false)
     });
    }
  }, true)
}


   console.log('pop')
   console.log(res)

   let shape = ['round','princess','cushion','asscher','marquise','oval','radiant','pear','emerald','heart']
  let  s = shape.map(item => {
   return(
   <div key={item}>
  <Image
          src = {`https://flawlessfinejewelry.com/wp-content/plugins/ring-builder/images/shapes/${item}.png`}
          width={40}
          height={40}
         alt="Picture of the author"
       
        />
        <p>{item}</p>
     </div>
     
   ) 
 })

 let colorpara={
   D:'D color: D is the highest color grade and is an extremely rare diamond since it is considered colorless.',
   E:'E color: E has almost no color that can only be detected by a gemologist, and is a rare diamond.',
   F:'F color: F is still considered colorless with only a very slight hint of color, and is rated a high quality diamond.',
   G:'G color: G is a high quality diamond that is nearly colorless.',
   H:'H color: H is a high quality diamond that is nearly colorless.',
   I:'I color: I has only a slight hint of color and is rated a top value.',
   J:'J color: J has slightly more color and is rated a top value.',
   'K-Z':'K-Z color: These diamonds may appear yellow or slightly brown depending on the cut grade.'
 }
 let [paratext,setparatext] = useState(colorpara.D)

 function paracolor(p){
    setparatext(colorpara[p])
 }

 let color = ['D','E','F','G','H','I','J','K-Z']
  let  color1 = color.map(item => {
   return(
   <div key={item} className={`p-[5px] bg-[#efefef] flex justify-center items-center cursor-pointer ${paratext===colorpara[item]?'bg-[#dddddd]':'bg-[#efefef]'}`} onClick={()=>paracolor(item)}>
     {item}
     </div>
     
   ) 
 })

 let claritypara={
  F:'Flawless: Flawless: No internal or external flaws. Extremely Rare.',
  IF:'Internally Flawless: Internally Flawless: no internal flaws, but some surface flaws',
  'VVS1-':'VVS1-VVS2: Very Very Slightly Included (two grades). Minute inclusions very difficult to detect under 10x magnification by a trained',
  'VS1-VS2':'VS1-VS2: Very Slightly Included (two grades). Minute inclusions seen only under 10x magnification.',
  'SI1-SI2':'SI1-SI2: Slightly Included (two grades). Minute inclusions more easily detected under 10x magnification.',
  'I1':'I1: Included. Diamonds may have minor eye-visible inclusions. RIO offers a limited selection of jewelry with I1 clarity diamonds.',
  
}



let [claritytext,setclaritytext] = useState(claritypara.F)
function paraclarity(p){
  setclaritytext(claritypara[p])
}
 let clarity = ['F','IF','VVS1-','VS1-VS2','SI1-SI2','I1']
  let  clarity1 = clarity.map(item => {
   return(
   <div key={item} className={`p-[5px] bg-[#efefef] flex justify-center items-center cursor-pointer ${claritytext===claritypara[item]?'bg-[#dddddd]':'bg-[#efefef]'}`} onClick={()=>paraclarity(item)}>
     {item}
     </div>
     
   ) 
 })


 let cutpara={
  Excellent:'Excellent cut: Excellent cut reflects most of the light and is an exceptional quality diamond.',
  'Very Good':'Very Good cut: Very good cut reflects most of the light and is considered an excellent value.',
  Good:'Good cut: Good cut grade reflects a good amount of light, although less than a very good cut grade.',
  Fair:'Fair cut: Highest cut grade. Its proportions produce a beautiful balance of fire and sparkle in a diamond.',
}



let [cuttext,setcuttext] = useState(cutpara.Excellent)
function paracut(p){
  setcuttext(cutpara[p])
}
 let cut = ['Excellent','Very Good','Good','Fair']
  let  cut1 = cut.map(item => {
   return(
   <div key={item} className={`p-[5px] bg-[#efefef] flex justify-center items-center cursor-pointer ${cuttext===cutpara[item]?'bg-[#dddddd]':'bg-[#efefef]'}`} onClick={()=>paracut(item)}>
     {item}
     </div>
     
   ) 
 })

 let [high,setHigh] = useState()
 function highlight(p){
setHigh(p)
 }

 function highlightout(){
  setHigh('')
 }
 

  
    return(

        <div>
            <Head>
//         <title>Compare</title>
//         <meta name="description" content="Generated by create next app" />
//         <link rel="icon" href="/favicon.ico" />
//         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
//       </Head>

<div className="container  md:max-w-[1130px] w-[100%] mx-auto ">
<Link href="/diamonds">
<div className='cursor-pointer mb-[50px] text-[1.4em] mt-[20px]' ><i className="fa-solid fa-arrow-left-long"></i> back to diamonds</div>
        </Link>
      
      <h1 className='text-[2em] text-center mb-[40px]'>Compare Diamond({res.length})</h1>
      <div className='  w-[100%]  flex'>
      <div className="w-[15%] relative">
      <div className="grid grid-rows-15 col-span-1 text-right  ">
      <div className='border border-[black] h-[40px]'></div>
      <div className='border border-[black] h-[150px] p-[10px] '>Image</div>
      <div className='border border-[black] h-[40px] p-[10px]'>View Details</div>
      <div className='border border-[black] h-[40px] p-[10px]'>Price</div>
      <div className='border border-[black] h-[40px]'></div>
    
      <div className='border border-[black] h-[40px] p-[10px] relative'>Shape <i onClick={()=>infobox('shape')} className="text-[#888684] fa-solid fa-circle-info"></i>{hide&& boxName==='shape'&&
      <div className='w-[300px] absolute left-[169px] top-[-100px] z-40 bg-[white]  border border-[#bdbdbd] box p-[20px]'>
        <h2 className='text-left '>Diamond shape</h2>
        <hr/>
        <div className="grid grid-cols-4 gap-4">
 {s}


</div>
    
      </div>}
      </div>
      
    
      
      <div className='border border-[black] h-[40px] p-[10px] relative'>Carat Weight <i onClick={()=>infobox('carat')} className="text-[#888684] fa-solid fa-circle-info"></i>{hide&& boxName==='carat'&&<div className='w-[300px] absolute left-[169px] top-[-70px] z-40 bg-[white] border border-[#bdbdbd] box p-[20px]'><h2 className='text-left mb-[10px]'>Carat (ct.)</h2>
        <hr/><p className='text-left mt-[10px] '>The international unit of weight, used for measuring diamonds and gemstones. 1 carat is equal to 200 milligrams, or 0.2 grams.</p></div>}
</div>
      
      <div className='border border-[black] h-[40px] p-[10px] relative'>Color <i onClick={()=>infobox('Color')} className="text-[#888684] fa-solid fa-circle-info"></i>{hide&& boxName==='Color'&&<div className='w-[300px] absolute left-[169px] top-[-100px] z-40 bg-[white]  border border-[#bdbdbd] box p-[20px]'>
      <h2 className='text-left '>Diamond color</h2>
      <hr/>
      <p className='py-[10px] bg-[#efefef] text-left mb-[10px]'>Choose a color grade:</p>
      <div className="grid grid-cols-4 gap-4">
        {color1}
      </div>
      <p className='text-left mt-[10px]'>{paratext}</p>
      </div>}</div>


      <div className='border border-[black] h-[40px] p-[10px] relative'>Clarity <i onClick={()=>infobox('Clarity')} className="text-[#888684] fa-solid fa-circle-info"></i>{hide&& boxName==='Clarity'&&<div className='w-[300px] absolute left-[169px] top-[-100px] z-40 bg-[white]  border border-[#bdbdbd] box p-[20px]'>
      <h2 className='text-left '>Diamond clarity</h2>
      <hr/>
      <p className='py-[10px] bg-[#efefef] text-left mb-[10px]'>Choose a color grade:</p>
      <div className="grid grid-cols-3 gap-4">
        {clarity1}
      </div>
      <p className='text-left mt-[10px]'>{claritytext}</p>
        </div>}</div>


      <div className='border border-[black] h-[40px] p-[10px] relative'>Cut <i onClick={()=>infobox('Cut')} className="text-[#888684] fa-solid fa-circle-info"></i>{hide&& boxName==='Cut'&&<div className='w-[300px] absolute left-[169px] top-[-100px] z-40 bg-[white]  border border-[#bdbdbd] box p-[20px]'> <h2 className='text-left '>Diamond Cut</h2>
      <hr/>
      <p className='py-[10px] bg-[#efefef] text-left mb-[10px]'>Choose a color grade:</p>
      <div className="grid grid-cols-4 gap-4">
        {cut1}
      </div>
      <p className='text-left mt-[10px]'>{cuttext}</p></div>}</div>


      <div className='border border-[black] h-[40px] p-[10px] relative'>Polish <i onClick={()=>infobox('Polish')} className="text-[#888684] fa-solid fa-circle-info"></i>{hide&& boxName==='Polish'&&<div className='w-[300px] absolute left-[169px] top-[-100px] z-40 bg-[white]  border border-[#bdbdbd] box p-[20px]'><h2 className='text-left mb-[10px]'>Polish</h2>
        <hr/><p className='text-left mt-[10px] '>The overall condition of a finished diamond's faceted surfaces, including how smoothly the facets have been polished, whether any marks are visible from the polishing wheel, and how defined the edges of each facet are. Polish marks are almost always invisible to the unaided eye, but good polish is essential for maximum light performance.</p></div>}</div>


      <div className='border border-[black] h-[40px] p-[10px]'>Symmetry</div>
      <div className='border border-[black] h-[40px] p-[10px]'>Fluorescence</div>
      <div className='border border-[black] h-[40px] p-[10px]'>Measurements</div>
      <div className='border border-[black] h-[40px] p-[10px] relative'>Depth % <i onClick={()=>infobox('Depth')} className="text-[#888684] fa-solid fa-circle-info"></i>{hide&& boxName==='Depth'&&<div className='w-[300px] absolute left-[169px] top-[-100px] z-40 bg-[white]  border border-[#bdbdbd] box p-[20px]'><h2 className='text-left mb-[10px]'>Depth percentage</h2>
        <hr/><p className='text-left mt-[10px] '>The height of a diamond, measured from the culet to the table, divided by its average girdle diameter. One of the basic proportions that contributes to a diamond's appearance, brilliance and fire.</p></div>}</div>


      <div className={`border border-[black] h-[40px] p-[10px] relative ${high==="16"?"!bg-[#dddddd]":"!bg-[#f5f5f5]"}`}>Table % <i onClick={()=>infobox('Table')} className="text-[#888684] fa-solid fa-circle-info"></i>{hide&& boxName==='Table'&&<div className='w-[300px] absolute left-[169px] top-[-100px] z-40 bg-[white]  border border-[#bdbdbd] box p-[20px]'><h2 className='text-left mb-[10px]'>Table percentage</h2>
        <hr/><p className='text-left mt-[10px] '>The width of the diamond's table expressed as a percentage of its average diameter. A component of the overall cut grade, this measurement is critical to a diamond's light performance.</p></div>}</div>


    </div>
    </div>
   {(compareItems === undefined || compareItems.length == 0) && <div className= {`w-[85%] flex justify-center aa`} id='parent'><div className='text-center'><h1 className='text-[1.4em]'>Currently there are no diamonds selected.</h1><p>To compare diamonds, conduct a diamond search, select your diamonds and click 'Compare'.</p></div></div>}
 {(!a === undefined || !a.length == 0) && <div className= {` overflow-x-scroll w-[85%] flex  aa`} id='parent'>
  {res.map((item) =>  <div key={item.stock_num} className={ ` bb duration-1000 overflow-hidden bg-[white] ${compareItems.includes(item.stock_num)?"w-[20%] ":"w-[0%]"} `} id={item.stock_num}>

    {/* 1 */}
        <div  className={`border border-[black] h-[40px] cursor-pointer flex items-center justify-center pp ${high==="1"&&"!bg-[#dddddd]"}`} ><i onClick={()=>swapLeft(item.stock_num)} className="fa-solid fa-arrow-left-long mr-[30px]"></i><p onClick={()=>{ const index = compareItems.indexOf(item.stock_num);
        compareItems.splice(index, 1)
        setheartCount(prev=>prev-1)}}>remove</p><i onClick={()=>swapRight(item.stock_num)} className="fa-solid fa-arrow-right-long ml-[30px]"></i></div>

        {/* 2 */}
      <div className={`border border-[black] h-[150px] overflow-hidden bg-center bg-[#f5f5f5] ${high==="2"&&"!bg-[#dddddd]"}`}>{ item.image_url?<Image src={`/api/imagefetcher?url=${encodeURIComponent(
              item.image_url
            )}`} alt="hh"  className=' object-cover' width="100%" height="100%" layout="responsive" />:<Image src={`https://flawlessfinejewelry.com/wp-content/plugins/ring-builder/images/diamond_new_icons/new/${(nam[item.shape]).toLowerCase()}.jpg`} alt="hh" className=' object-cover' width="100%" height="100%" layout="responsive" />}</div>

            {/* 3 */}
      <div className={`border border-[black] h-[40px] flex items-center justify-center ${high==="3"&&"!bg-[#dddddd]"}`} onMouseEnter={()=>highlight('3')}>{item.stock_num}</div>


      {/* 4 */}
      <div className={`border border-[black] h-[40px] flex items-center justify-center bg-[#f5f5f5] ${high==="4"&&"!bg-[#dddddd]"}`} onMouseEnter={()=>highlight('4')}>£ {parseInt(item.fame_price) }</div>

      {/* 5 */}
      <div className={`border border-[black] h-[40px] flex items-center justify-center ${high==="5"&&"!bg-[#dddddd]"}`} onMouseEnter={()=>highlight('5')}><button className={` duration-500 ${compareItems.includes(item.stock_num)?"w-[80%] ":"w-[0%]"} bg-[#333333] rounded text-white`}>ADD TO</button></div>

      {/* 6 */}
      <div className={`border border-[black] h-[40px] flex items-center justify-center  bg-[#f5f5f5]  ${high==="6"&&"!bg-[#dddddd]"} onMouseEnter={()=>highlight('6')}`}>{nam[item.shape]} </div>

      {/* 7 */}
      <div className={`border border-[black] h-[40px] flex items-center justify-center ${high==="7"&&"!bg-[#dddddd]"} onMouseEnter={()=>highlight('7')}`}>{item.carat } </div>

      {/* 8 */}
      <div className={`border border-[black] h-[40px] flex items-center justify-center bg-[#f5f5f5] ${high==="8"&&"!bg-[#dddddd]"} onMouseEnter={()=>highlight('8')}`}>{item.color } </div>

      {/* 9 */}
      <div className={`border border-[black] h-[40px] flex items-center justify-center ${high==="9"&&"!bg-[#dddddd]"} onMouseEnter={()=>highlight('9')}`}>{item.clarity}</div>

      {/* 10 */}
      <div className={`border border-[black] h-[40px] flex items-center justify-center bg-[#f5f5f5] ${high==="10"?"!bg-[#dddddd]":"!bg-[#f5f5f5]"}`} onMouseEnter={()=>highlight('10')} onMouseLeave={()=>highlightout('10')}>{nam[item.cut] }</div>

      {/* 11 */}
      <div className={`border border-[black] h-[40px] flex items-center justify-center ${high==="11"?"!bg-[#dddddd]":"!bg-[white]"}`} onMouseEnter={()=>highlight('11')} onMouseLeave={()=>highlightout('11')}>{nam[item.polish] }</div>

      {/* 12 */}
      <div className={`border border-[black] h-[40px] flex items-center justify-center bg-[#f5f5f5] ${high==="12"?"!bg-[#dddddd]":"!bg-[#f5f5f5]"}`} onMouseEnter={()=>highlight('12')} onMouseLeave={()=>highlightout('12')}>{nam[item.symmetry] } </div>

      {/* 13 */}
      <div className={`border border-[black] h-[40px] flex items-center justify-center ${high==="13"?"!bg-[#dddddd]":"!bg-[white]"}`} onMouseEnter={()=>highlight('13')}  onMouseLeave={()=>highlightout('13')}>{nam[item.fluorescence] }</div>

      {/* 14 */}
      <div className={`border border-[black] h-[40px] flex items-center justify-center bg-[#f5f5f5] ${high==="14"?"!bg-[#dddddd]":"!bg-[#f5f5f5]"}`} onMouseEnter={()=>highlight('14')} onMouseLeave={()=>highlightout('14')}>{ item.width}</div>

      {/* 15 */}
      <div className={`border border-[black] h-[40px] flex items-center justify-center ${high==="15"?"!bg-[#dddddd]":"!bg-[white]"}`} onMouseEnter={()=>highlight('15')} onMouseLeave={()=>highlightout('15')}>{item.depth_percent}</div>

      {/* 16 */}
      <div className={`border border-[black] h-[40px] flex items-center justify-center bg-[#f5f5f5] ${high==="16"?"!bg-[#dddddd]":"!bg-[#f5f5f5]"}`} onMouseEnter={()=>highlight('16')} onMouseLeave={()=>highlightout()}>{ item.table_percent}</div>
    </div>)}
  </div>
    }

        
      
      </div>
    </div>
        </div>

    )
}

  

 
// #dddddd