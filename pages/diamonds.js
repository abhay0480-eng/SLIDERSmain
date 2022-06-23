import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import "nouislider/distribute/nouislider.css";
import React, {useState,useEffect} from 'react'
import FormData from 'form-data';
import axios from 'axios';
import OptionSlider from '../components/OptionSlider'
import InfiniteScroll from 'react-infinite-scroll-component';
import Link from 'next/link'
import { data } from 'autoprefixer';

const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

const carat_from = 0.30, carat_to = 30.00, price_from = 100, price_to = 900000
    var caratRangeArr = [];
    for (var e = '', t = [[0.18, 0.02], [1, 0.05], [2, 0.1], [2.5, 0.25], [4, 0.5], [10, 5], [20, 10], [carat_to]], i = carat_from, a = 0; a < t.length - 1; i += t[a][1]) {
        caratRangeArr.push(i.toFixed(2)), i >= t[a + 1][0] && a++;
    }

    var carat_array = [];
    const caratOptions = []
    var carat_step = 100 / (caratRangeArr.length - 1);
    caratRangeArr.map((element,index) =>{
        caratOptions.push(<option key={index} value={parseFloat(element)}>{element} ct</option>)
        if(index == 0){
            carat_array["min"] = parseFloat(carat_from);
        }else if(index == caratRangeArr.length - 1){
            carat_array["max"] = parseFloat(carat_to);
        }else{
            carat_array[(carat_step * index).toFixed(2)+'%'] = parseFloat(element);
        }
    })

    //convert array to object			
    const caratArr = JSON.parse(JSON.stringify(Object.assign({}, carat_array)));

var priceRangeArr = [];
    for (var e = '', t = [[100, 100], [2500, 500], [1e4, 1e3], [2e4, 2e3], [4e4, 5e3], [1e5, 1e4], [2e5, 5e4], [4e5, 1e5], [(price_to)]], i = (price_from)  , a = 0; a < t.length - 1; i += t[a][1]){
        priceRangeArr.push(i.toFixed(2)), i >= t[a + 1][0] && a++;
    }                  	
    priceRangeArr[priceRangeArr.length - 1] = price_to.toFixed(2);

    var price_array = [];
    const priceOptions = []
    var price_step = 100 / (priceRangeArr.length - 1);
    priceRangeArr.map((element,index) =>{
        priceOptions.push(<option key={index} value={parseFloat(element)}>£{numberWithCommas(parseInt(element))}</option>)
        if(index == 0){
            price_array["min"] = parseFloat(price_from);
        }else if(index == priceRangeArr.length - 1){
            price_array["max"] = parseFloat(price_to);
        }else{
            price_array[(price_step * index).toFixed(2)+'%'] = parseFloat(element);
        }
    })
			
const priceArr = JSON.parse(JSON.stringify(Object.assign({}, price_array)));  

export default function Home({ ndata }) {
  const initialRender = React.useRef(true);
  const initialRender1 = React.useRef(false);


console.log(ndata.price_total_from_in_currency)
  
  let d = {
    filter_price_min: ndata.price_total_from_in_currency,
    filter_price_max: ndata.price_total_to_in_currency,
    filter_carat_min: ndata.size_from,
    filter_carat_max: ndata.size_to,
    filter_cut_min: 0,
    filter_cut_max: 4,
    filter_color_min: 0,
    filter_color_max: 10,
    filter_clarity_min: 0,
    filter_clarity_max: 9,
    filter_fluorescence_min: 0,
    filter_fluorescence_max: 4,
    filter_symmerty_min: 0,
    filter_symmerty_max: 5,
    filter_polish_min: 0,
    filter_polish_max: 5,
    filter_table_min: 0,
    filter_table_max: 88,
    filter_depth_min: 0,
    filter_depth_max: 106.60,
    lab: [],
    origin: 'ALL',
    shape: [],
    search_ID : '',
    page_offset: 1,
    sorting_order: 'ASC',
    sort_by: 'fame_price'
  }

  let names = {

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


  
 

let [flag, setflag] = useState(false)
  function show(){

      setflag(pre => !pre)

  }


  let [Data, setData] = useState(d)
  useEffect(() => {  
  if (typeof window !== "undefined") {
    setData(localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items'))  : d)

  }  setData(prev=>({...prev,page_offset:1})) 
  }, []);

  useEffect(() => {  
    if (typeof window !== "undefined") {
        setcompareItems(localStorage.getItem('compare') ? JSON.parse(localStorage.getItem('compare'))  : compareItems)
  
        setheartCount(localStorage.getItem('heartcount') ? JSON.parse(localStorage.getItem('heartcount'))  : heartCount)
  
    }  
    }, []);

 


  let formData = new FormData();    //formdata object
 
  for (var key in Data) {

      if(Array.isArray(Data[key])){
        Data[key].map((ty) => {
          formData.append(key+'[]',ty)
        })
      }else{
        formData.append(key,Data[key])
      }
    // }
}
   //append the values with key, value pair

const config = {     
    headers: { 'content-type': 'multipart/form-data' }
}

let [check,setCheck] = useState(0)
let [heartCount,setheartCount] = useState(0)

let [response,setResponse] = useState({
  diamonds : [],
  total_records : 0
})

    useEffect(() => {
      if(initialRender1.current){
        axios.post('http://gems.netfillip.org/public/getdiamonds', formData, config)
      .then(res => {
        if( check===0){
          setResponse(res.data)
         
        }else{
          setResponse((prevData) => ({...prevData,diamonds:[...prevData.diamonds,...res.data.diamonds]}))
          setCheck(0)
        }
      })
      .catch(err => console.log(err));
      }else{
        initialRender1.current = true;
      }
    }, [Data])

    useEffect(() => {
   
        if (initialRender.current) {
          initialRender.current = false;
        } else {
        
          localStorage.setItem('compare', JSON.stringify(compareItems))
          localStorage.setItem('heartcount', JSON.stringify(heartCount))
         
         
        }
        });

  
  useEffect(() => {
   
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      
      localStorage.setItem('items', JSON.stringify(Data))
     
     
    }
    },[Data]);

  function flip(item, arr) {
    
    setData(prevData => (prevData[arr].includes(item)?{
      ...prevData,
     [arr]: [...prevData[arr].slice(0, prevData[arr].indexOf(item)),...prevData[arr].slice( prevData[arr].indexOf(item)+1)],
     page_offset:1

    }:{ ...prevData,
      [arr]: [...prevData[arr], item],
      page_offset:1
    })) 
  }



  function handleChange(l, r, event) {

     {l==='filter_price_min'&& r==='filter_price_max' || l==='filter_carat_min' && r==='filter_carat_max'?setData((prevData) => ({
      ...prevData,
      [l]: (event[0]) ,
      [r]: (event[1]),
      page_offset:1
   
     })):setData((prevData) => ({
      ...prevData,
      [l]: parseInt(event[0]) ,
      [r]: parseInt(event[1]),
      page_offset:1
   
     }))}
    
  }
let i=0
  function origin(p){
    setData(prevData => ({
      ...prevData,
      origin: p,
      page_offset:1
      
    }))
  }


  function handle(p, event) {
    const { value } = event.target
    setData(prevData => ({
      ...prevData,
      [p]: (value),
      page_offset:1
    
    }))

  }
  
  let [turnn,setTurnn]= useState(false)
  let [tu,setTu]= useState(false)
  let [saveid,setsaveid] = useState()
  let [gridlist,setGridlist] = useState(true)
  let [sideItems,setSideItems] = useState(false)
  let [comparelist,setComparelist] = useState(false)
  
  let [compareItems,setcompareItems] = useState([])


  function compare(){
    setComparelist(true)
  }
  function records(){
    setComparelist(false)
  }

  function sideItem(p){
      setSideItems(true)
      setsaveid(p)
  }

  function turn(p){
    setTurnn(true)
    setsaveid(p)
  
  }
  function turnout(p){
    setTurnn(false)
    setsaveid(p)
  
  }
  function ul(p){
    setTu(true)
    setsaveid(p)
  
  }
  function ulout(p){
    setTu(false)
    setsaveid(p)
    
  }

  function grid(){
    setGridlist(true)
  }
  function list(){
    setGridlist(false)
  }

  function comparehearts(p,q){
    
    if(compareItems.includes(p) ){
      const index = compareItems.indexOf(p);
   
      setheartCount(prev=> prev-1)
      compareItems.splice(index, 1);
   
    }else{
      setheartCount(prev=> prev+1)
      setcompareItems(prev=>[...prev,p])
   
  
    }

  }
  console.log(response.diamonds)  

let l =[]
let listLoader = []


  for(let i=0; i<20; i++){
    l.push(<div className='animate-pulse border-[#dddddd] border mt-[20px] '>
    <div className='h-[200px] bg-slate-200 rounded mb-[20px] '></div>
    <div className='px-[15px]'>
      <div className='h-[15px] w-[40%] bg-slate-200 rounded mb-[10px]'></div>
      <div className='h-[15px] w-[50%] bg-slate-200 rounded mb-[10px]'></div>
      <div className='flex justify-between'>
        <div className='h-[15px] w-[40%] bg-slate-200 rounded mb-[10px]'></div>
        <div className='h-[15px] w-[20%] bg-slate-200 rounded mb-[10px]'></div>
      </div>
    </div> 
    </div>)
  }

  for(let i=0; i<20; i++){
    listLoader.push(<div className='animate-pulse w-[100%] grid grid-cols-9 justify-items-center py-[10px] px-[10px]   '>
      <p className='h-[15px] w-[20%] bg-slate-200 rounded mb-[10px]'></p>
      <p className='h-[15px] w-[80%] bg-slate-200 rounded mb-[10px]'></p>
      <p className='h-[15px] w-[20%] bg-slate-200 rounded mb-[10px]'></p>
      <p className='h-[15px] w-[20%] bg-slate-200 rounded mb-[10px]'></p>
      <p className='h-[15px] w-[60%] bg-slate-200 rounded mb-[10px]'></p>
      <p className='h-[15px] w-[40%] bg-slate-200 rounded mb-[10px]'></p>
      <p className='h-[15px] w-[60%] bg-slate-200 rounded mb-[10px]'></p>
      <p className='h-[15px] w-[50%] bg-slate-200 rounded mb-[10px]'></p>
      <p className='h-[15px] w-[60%] bg-slate-200 rounded mb-[10px]'></p>
      
        
    </div>)
  }
  

  


  let shape = ['round','princess','cushion','asscher','marquise','oval','radiant','pear','emerald','heart']
  let  s = shape.map(item => {
   return(
   <div key={item} className={` px-[5px] py-[5px]  inline-block text-center flex justify-center items-center cursor-pointer ${Data.shape.includes(item)?"border-black border ":" none"}`}>
      <Image
          src = {`/images/shapes/${item}.png`}
          width={30}
          height={30}
         alt="Picture of the author"
         onClick={() => flip(item,"shape")}
        />
     </div>
     
   ) 
 })

 function reset(){
  setData(d)
 }

//  function lowpricesort(){
//   console.log("a")
//   response.diamonds.sort(function(a, b) {
//     return b.fame_price - a.fame_price
//   });
//   // console.log(response.diamonds.sort((firstItem, secondItem) => firstItem.fame_price - secondItem.fame_price))
//   // console.log("a")
// }

// let cuttt =["EX","VG","GD","F"]
// let clarityy = ["I1","SI3","SI2","SI1","VS2","VS1","VVS2","VVS1","IF"]

// response.diamonds.filter(item => (item.id.
//   toString().includes(search)) || (item.certificate_num.
//     toLowerCase().includes(search.toLowerCase())))


const [selectedSort,setSelectedSort] = useState("Price:Low-to-High")
const [search, setSearch] = useState('')
useEffect(() => {
setData(prevData => ({
  ...prevData,
  page_offset: 1,
  search_ID : search

}))
},[search]);

   
   function handleSelectChange(event){
     console.log(event.target.value)
    setSelectedSort(event.target.value);
    
   
    {event.target.value=== "Price:Low-to-High"?setData(prevData => ({
      ...prevData,
      page_offset: 1,
      sorting_order: 'ASC',
      sort_by: 'fame_price'
   
    })):event.target.value=== "Price:High-to-Low"?setData(prevData => ({
      ...prevData,
      page_offset: 1,
      sorting_order: 'DESC',
      sort_by: 'fame_price'
   
    })):event.target.value=== "Carat:Low-to-High"?setData(prevData => ({
      ...prevData,
      page_offset: 1,
      sorting_order: 'ASC',
      sort_by: 'carat'
   
    })):event.target.value=== "Carat:High-to-Low"?setData(prevData => ({
      ...prevData,
      page_offset: 1,
      sorting_order: 'DESC',
      sort_by: 'carat'
   
    })):event.target.value=== "Color:Low-to-High"?setData(prevData => ({
      ...prevData,
      page_offset: 1,
      sorting_order: 'ASC',
      sort_by: 'color'
   
    })):event.target.value=== "Color:High-to-Low"?setData(prevData => ({
      ...prevData,
      page_offset: 1,
      sorting_order: 'DESC',
      sort_by: 'color'
   
    })):event.target.value=== "Clarity:Low-to-High"?setData(prevData => ({
      ...prevData,
      page_offset: 1,
      sorting_order: 'ASC',
      sort_by: 'clarity'
   
    })):event.target.value=== "Clarity:High-to-Low"?setData(prevData => ({
      ...prevData,
      page_offset: 1,
      sorting_order: 'DESC',
      sort_by: 'clarity'
   
    })):event.target.value=== "Cut:Low-to-High"?setData(prevData => ({
      ...prevData,
      page_offset: 1,
      sorting_order: 'ASC',
      sort_by: 'cut'
   
    })):setData(prevData => ({
      ...prevData,
      page_offset: 1,
      sorting_order: 'DESC',
      sort_by: 'cut'
   
    })) }
   

   }
     
   let [mobileFilters, setMobileFilters] = useState(true)
   let [mobile, setMobile] = useState(false)

   function showFilters(){
    if(mobile===false){
      setMobileFilters(prev=>!prev)
    }else{
  
      setMobileextraFilters(prev=>!prev)
      setMobileFilters(prev=>!prev)
    } 
   }

   let [mobileextraFilters, setMobileextraFilters] = useState(false)

   function showExtraFilters(p){
     setMobileextraFilters(prev=>!prev)
     if(p==='plus'){
      setMobile(true)
     }else{
      setMobile(false)
     }
   
   }

   let [filterBox, setfilterBox] = useState()
   let [fBox, setfBox] = useState(false)

   function filterbox(p){
  
    setfilterBox(p)
    if(filterBox===p){
      setfBox(prev=>!prev)
    }else{
      setfBox(true)
    }
    
   }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      </Head>

     
      <Link href="/">
          <a>Home</a>
        </Link>
      <div>   
     <Image
      src='/images/Flawless-Logo.png'
      alt="Picture of the author"
      width={300}
      height={100}
    />
   </div>
  
   {!comparelist && <div className="container max-w-[1130px] mx-auto ">
   <div className='block md:hidden w-[100%] text-center mb-[10px]'>
<button className='bg-[black] text-[white] w-[100%] py-[8px]' onClick={showFilters}>Filter  {mobileFilters?<i className="fa-solid fa-angle-down"></i>:<i className="fa-solid fa-angle-up"></i>}</button>
</div>
   <div className="grid grid-cols-4  gap-x-2 gap-y-2  md:grid-cols-1 md:gap-x-20  lg:grid-cols-2 lg:gap-x-20 w-[100%]  md:border-b md:pb-[20px] md:border-[#d1d1d1] ">
        {(mobileFilters)&&<div className='md:flex md:items-center md:mt-[30px] md:w-[100%]  '>
         <div className=' md:w-[20%] w-[100%] px-[10px] py-[15px] md:px-[0px] md:py-[0px] border border-[black] rounded md:border-none' onClick={()=>filterbox('SHAPE')}>SHAPE</div>
         <div className={` fixed z-40 h-[300px] bg-[white] w-[390px] rounded  boxmobile md:shadow-none p-[20px] right-[2px] md:h-[auto] md:w-[100%] md:static ${filterBox=== 'SHAPE' && fBox?"bottom-0 duration-1000 ease-in-out":" bottom-[-200px] hidden md:block duration-1000 ease-in-out"}` }>
         <div className='md:hidden flex justify-between mb-[30px]'>
       <p onClick={()=>filterbox('SHAPE')}>Close</p>
       <p onClick={()=>reset()} >Reset</p>
     </div>
         <div className='md:block md:w-[100%] m-auto flex  md:flex w-[100%] md:justify-between md:items-center '>{s}</div> 
         <div className='md:hidden flex justify-center mt-[80px]'>
<button className='bg-[black] text-[white] py-[10px] px-[20px]' onClick={()=>filterbox('LOCATE')}>VIEW {response.total_records} RESULTS</button>
</div>
         </div>
       </div>}

       
        {(mobileFilters)&&<OptionSlider 
                  name="PRICE" 
                  range={priceArr} 
                  data={Data} 
                  click={handleChange} 
                  options={priceOptions} 
                  handleclick={handle}
                  left="filter_price_min"
                  right="filter_price_max"
                  flag="op"
                  filter={filterbox}
                  filbox = {filterBox}
                  ffbox={fBox}
                  resett={reset}
                  res={response.total_records}
            /> }
     
      {(mobileFilters)&&<OptionSlider 
          name="CARAT" 
          range={caratArr} 
          data={Data} 
          click={handleChange} 
          options={caratOptions}
          left="filter_carat_min"
          right="filter_carat_max"
          handleclick={handle}
          flag="op"
          filter={filterbox}
          filbox = {filterBox}
          ffbox={fBox}
          resett={reset}
          res={response.total_records}
       />}
       {(mobileFilters)&&!mobileextraFilters&&<button className='md:hidden border border-[black] px-[10px] py-[10px] rounded' onClick={()=>showExtraFilters('plus')}>+</button>}

      {(mobileFilters)&&<div className={`${mobileextraFilters?"block md:block":"hidden md:block"}`}><OptionSlider 
          name="CUT" 
          range={{ min: 0 , max: 4 }}
          data={Data} 
          click={handleChange} 
          handleclick={handle}
          left="filter_cut_min"
          right="filter_cut_max"
          flag="cut"
          kut={4}
          filter={filterbox}
          filbox = {filterBox}
          ffbox={fBox}
          resett={reset}
          res={response.total_records}
        /></div>}

      {<div className={`${mobileextraFilters?"block md:block  ":"hidden md:block  "}`}><OptionSlider 
       name="COLOR" 
       range={{ min: 0 , max: 10 }}
       data={Data} 
       click={handleChange} 
       left="filter_color_min"
       right="filter_color_max"
       handleclick={handle}
       flag="color"
       kut={9}
       filter={filterbox}
       filbox = {filterBox}
       ffbox={fBox}
       resett={reset}
       res={response.total_records}
       /></div>}

{<div className={`${mobileextraFilters?"block   md:block ":"hidden md:block  "}`}><OptionSlider 
     name="CLARITY" 
     range={{ min: 0 , max: 9 }}
     data={Data} 
     click={handleChange} 
     handleclick={handle}
     left="filter_clarity_min"
     right="filter_clarity_max"
     flag="clarity"
     kut={9}
     filter={filterbox}
     filbox = {filterBox}
     ffbox={fBox}
     resett={reset}
     res={response.total_records}
     
     /></div>}
  

      {/* <div className={`${flag?"md:inline-block grid grid-cols-4  md:grid-cols-1 md:gap-x-20  lg:grid-cols-2 lg:gap-x-20 w-[100%] md:max-h-[700px] lg:max-h-[500px] overflow-hidden duration-1000 ease-in":"md:inline-block grid grid-cols-4 md:max-h-[0px] flex flex-wrap  md:grid-cols-1 md:gap-x-20  lg:grid-cols-2 lg:gap-x-20  w-[100%] overflow-hidden duration-1000 ease-out"}`}> */}
      <div className={`${flag?"md:inline-block  md:grid-cols-1 md:gap-x-20  lg:grid-cols-2 lg:gap-x-20 w-[100%] md:max-h-[700px] lg:max-h-[500px] overflow-hidden duration-1000 ease-in":"md:inline-block  md:max-h-[0px]  md:grid-cols-1 md:gap-x-20  lg:grid-cols-2 lg:gap-x-20  w-[100%] overflow-hidden duration-1000 ease-out"}`}>
   {<div className={`${mobileextraFilters?"block md:block ":"hidden md:block "}`}><OptionSlider 
     name="FLUOR" 
     range={{ min: 0 , max: 4 }}
     data={Data} 
     click={handleChange} 
     handleclick={handle}
     left="filter_fluorescence_min"
     right="filter_fluorescence_max"
     flag="fluor"
     kut={4}
     bool={flag}
     filter={filterbox}
     filbox = {filterBox}
     ffbox={fBox}
     resett={reset}
     res={response.total_records}
     /></div>}
     </div>

     <div className={`${flag?"md:inline-block   md:grid-cols-1 md:gap-x-20  lg:grid-cols-2 lg:gap-x-20 w-[100%] md:max-h-[700px] lg:max-h-[500px] overflow-hidden duration-1000 ease-in":"md:inline-block  md:max-h-[0px]   md:grid-cols-1 md:gap-x-20  lg:grid-cols-2 lg:gap-x-20  w-[100%] overflow-hidden duration-1000 ease-out"}`}>

    {<div className={`${mobileextraFilters?"block md:block ":"hidden md:block "}`}><div className='md:justify-between  md:flex  md:mt-[30px] md:w-[100%]'>
       <div  className='md:w-[20%] w-[100%] border border-[black] rounded md:border-none px-[10px] py-[15px] md:px-[0px] md:py-[0px]' onClick={()=>filterbox('REPORT')}>REPORT</div>

       <div className={` fixed z-40 h-[300px] bg-[white] w-[390px] rounded  boxmobile md:shadow-none p-[20px] right-[2px] md:h-[auto] md:w-[100%] md:static ${filterBox=== 'REPORT' && fBox?"bottom-0":" bottom-[-200px] hidden md:block"}` }>
       <div className='md:hidden flex justify-between mb-[30px]'>
       <p onClick={()=>filterbox('REPORT')}>Close</p>
       <p onClick={()=>reset()} >Reset</p>
     </div>
       <div className=' md:block md:w-[100%] w-[100%] m-auto'>
       <div className='flex justify-center md:justify-start'>
              <span className={`w-[70px] py-[5px] border border-black inline-block text-center mr-[4px] cursor-pointer ${Data.lab.includes("GIA")?"bg-black text-white":"bg-white text-black"}`} onClick={() => flip("GIA","lab")}>GIA</span>
              <span className={`w-[70px] py-[5px] border border-black inline-block text-center mr-[4px] cursor-pointer ${Data.lab.includes("IGI")?"bg-black text-white":"bg-white text-black"}`} onClick={() => flip("IGI","lab")}>IGI</span>
              <span className={`w-[70px] py-[5px] border border-black inline-block text-center mr-[4px] cursor-pointer ${Data.lab.includes("AGS")?"bg-black text-white":"bg-white text-black"}`} onClick={() => flip("AGS","lab")}>AGS</span>  
              </div> 
       </div>
       <div className='md:hidden flex justify-center mt-[80px]'>
<button className='bg-[black] text-[white] py-[10px] px-[20px]' onClick={()=>filterbox('LOCATE')}>VIEW {response.total_records} RESULTS</button>
</div>
       
       </div>
     </div></div>}
     </div>
     <div className={`${flag?"md:inline-block   md:grid-cols-1 md:gap-x-20  lg:grid-cols-2 lg:gap-x-20 w-[100%] md:max-h-[700px] lg:max-h-[500px] overflow-hidden duration-1000 ease-in":"md:inline-block  md:max-h-[0px]   md:grid-cols-1 md:gap-x-20  lg:grid-cols-2 lg:gap-x-20  w-[100%] overflow-hidden duration-1000 ease-out"}`}>

     {<div className={`${mobileextraFilters?"block md:block":"hidden md:block"}`}><OptionSlider 
     name="SYMM" 
     range={{ min: 0 , max: 5 }}
     data={Data} 
     click={handleChange} 
     handleclick={handle}
     left="filter_symmerty_min"
     right="filter_symmerty_max"
     flag="symm"
     kut={5}
     bool={flag}
     filter={filterbox}
     filbox = {filterBox}
     ffbox={fBox}
     resett={reset}
     res={response.total_records}
     
     /></div>}
     </div>

     <div className={`${flag?"md:inline-block   md:grid-cols-1 md:gap-x-20  lg:grid-cols-2 lg:gap-x-20 w-[100%] md:max-h-[700px] lg:max-h-[500px] overflow-hidden duration-1000 ease-in":"md:inline-block  md:max-h-[0px]   md:grid-cols-1 md:gap-x-20  lg:grid-cols-2 lg:gap-x-20  w-[100%] overflow-hidden duration-1000 ease-out"}`}>


{<div className={`${mobileextraFilters?"block md:block":"hidden md:block"}`}><OptionSlider 
        name="POLISH" 
        range={{ min: 0 , max: 5 }}
        data={Data} 
        click={handleChange} 
        handleclick={handle}
        left="filter_polish_min"
        right="filter_polish_max"
        flag="polish"
        kut={5}
        bool={flag}
        filter={filterbox}
        filbox = {filterBox}
                  ffbox={fBox}
                  resett={reset}
                  res={response.total_records}
     /></div>}

     </div>


     <div className={`${flag?"md:inline-block   md:grid-cols-1 md:gap-x-20  lg:grid-cols-2 lg:gap-x-20 w-[100%] md:max-h-[700px] lg:max-h-[500px] overflow-hidden duration-1000 ease-in":"md:inline-block  md:max-h-[0px]   md:grid-cols-1 md:gap-x-20  lg:grid-cols-2 lg:gap-x-20  w-[100%] overflow-hidden duration-1000 ease-out"}`}>
     {<div className={`${mobileextraFilters?"block md:block":"hidden md:block"}`}><OptionSlider 
     name="TABLE" 
     range={{min:0,max:88}}
     data={Data} 
     click={handleChange} 
     handleclick={handle}
     left="filter_table_min"
     right="filter_table_max"
     flag="depth"
     bool={flag}
     filter={filterbox}
                  filbox = {filterBox}
                  ffbox={fBox}
                  resett={reset}
                  res={response.total_records}
     /></div>}
     </div>

     <div className={`${flag?"md:inline-block   md:grid-cols-1 md:gap-x-20  lg:grid-cols-2 lg:gap-x-20 w-[100%] md:max-h-[700px] lg:max-h-[500px] overflow-hidden duration-1000 ease-in":"md:inline-block  md:max-h-[0px]   md:grid-cols-1 md:gap-x-20  lg:grid-cols-2 lg:gap-x-20  w-[100%] overflow-hidden duration-1000 ease-out"}`}>

{<div className={`${mobileextraFilters?"block md:block":"hidden md:block"}`}><OptionSlider 
        name="DEPTH" 
        range={{min:0,max:106.60}}
        data={Data} 
        click={handleChange} 
        handleclick={handle}
        left="filter_depth_min"
        right="filter_depth_max"
        flag="depth"
        bool={flag}
        filter={filterbox}
        filbox = {filterBox}
        ffbox={fBox}
        resett={reset}
        res={response.total_records}
     /></div>}
     </div>


     <div className={`${flag?"md:inline-block   md:grid-cols-1 md:gap-x-20  lg:grid-cols-2 lg:gap-x-20 w-[100%] md:max-h-[300px] lg:max-h-[300px] overflow-hidden duration-1000 ease-in":"md:inline-block  md:max-h-[0px]   md:grid-cols-1 md:gap-x-20  lg:grid-cols-2 lg:gap-x-20  w-[100%] overflow-hidden duration-1000 ease-out"}`}>

{<div className={`${mobileextraFilters?"block md:block":"hidden md:block"}`}>
  <div className=' md:mb-[30px]  md:justify-between  md:justify-between  md:flex  md:mt-[30px] md:w-[100%]'>
       <div  className='md:w-[20%] w-[100%] border border-[black] rounded md:border-none px-[10px] py-[15px] md:px-[0px] md:py-[0px]' onClick={()=>filterbox('LOCATE')}>LOCATE</div>

       <div className={` fixed z-40 h-[300px] bg-[white] w-[390px] rounded  boxmobile md:shadow-none p-[20px] right-[2px] md:h-[auto] md:w-[100%] md:static ${filterBox=== 'LOCATE' && fBox?"bottom-0":" bottom-[-200px] hidden md:block"}` }>
       <div className='md:hidden flex justify-between mb-[30px]'>
       <p onClick={()=>filterbox('LOCATE')}>Close</p>
       <p onClick={()=>reset()} >Reset</p>
     </div>
       <div className=' md:block md:w-[100%] w-[100%] m-auto '>
         <div className='flex justify-center md:justify-start'>
         <span className={`w-[70px] py-[5px] border border-black inline-block text-center mr-[4px] cursor-pointer ${Data.origin == "ALL" ?"bg-black text-white":"bg-white text-black"}`} onClick={() => origin("ALL")}>ALL</span>
              <span className={`w-[70px] py-[5px] border border-black inline-block text-center mr-[4px] cursor-pointer ${Data.origin == "UK" ?"bg-black text-white":"bg-white text-black"}`} onClick={() => origin("UK")}>UK</span>
         </div>
             
       </div>
       <div className='md:hidden flex justify-center mt-[80px]'>
<button className='bg-[black] text-[white] py-[10px] px-[20px]' onClick={()=>filterbox('LOCATE')}>VIEW {response.total_records} RESULTS</button>
</div>
       
       </div>

     </div></div>}</div>
     {(mobileextraFilters ) &&<button className='md:hidden border border-[black] px-[10px] py-[10px] rounded'onClick={()=>showExtraFilters('minus')}><i className="fa-solid fa-xmark"></i></button>}
     
{/* </div> */}    </div>




<div className='hidden md:block max-w-[100%] grid grid-cols-3 gap-4   border-t  border-[#d1d1d1] mb-[15px]'>
  <div className='col-start-2'><button className={`mx-auto block  px-[20px] py-[12px] bg-[black] text-[white] border border-[white]  hover:bg-[white] hover:text-[black] hover:border-[black] hover:border`} onClick={() => { show()}}  > {!flag?<i className="fa-solid fa-plus mr-[5px] "></i>:<i className="fa-solid fa-xmark mr-[5px] "></i>}  ADVANCE FILTER</button></div>   
   <div className='col-end justify-self-end self-center'><span className='cursor-pointer' onClick={reset}><i className="fa-solid fa-rotate-left"></i> RESET SEARCH</span> </div>
   </div>

   <div className='hidden  md:block max-w-[100%] flex  mb-[15px] '>
      <div className='ml-auto'>
        <input className='border border-[#ddd] min-w-[280px]  rounded' type="text" placeholder='Search by diamond or Certificate ID' 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}/><span className=' px-[5px] inline-block border border-[#ddd]'><i className="fa-solid fa-magnifying-glass"></i></span> 
        {/* */}
      </div>
   </div>


   <div className='w-[100%] flex justify-between items-center mb-[15px] mt-[20px]'>
   <div className='w-[50%] md:w-auto'>Change: <i className="fa-solid fa-list cursor-pointer" onClick={list}></i>  <i className="fa-solid fa-grip cursor-pointer" onClick={grid}></i></div>
      <div className='w-[50%] md:w-auto'>
      <span className='hidden md:inline-block px-[5px] inline-block '>Sort By:</span><select value={selectedSort} onChange={handleSelectChange} className='w-[170px] md:min-w-[188px] py-[5px]'>
        <option  value="Price:Low-to-High">Price: Low-to-High</option>
        <option value="Price:High-to-Low">Price: High-to-Low</option>
        <option value="Carat:Low-to-High">Carat: Low-to-High</option>
        <option value="Carat:High-to-Low">Carat: High-to-Low</option>
        <option value="Color:Low-to-High">Color: Low-to-High</option>
        <option value="Color:High-to-Low">Color: High-to-Low</option>
        <option value="Clarity:Low-to-High">Clarity: Low-to-High</option>
        <option value="Clarity:High-to-Low">Clarity: High-to-Low</option>
        <option value="Cut:Low-to-High">Cut: Low-to-High</option>
        <option value="Cut:High-to-Low">Cut: High-to-Low</option>
        </select>
        {/* */}
      </div>
   
   </div>

   <div className="max-w-[100%]  grid grid-cols-1 gap-4 mb-[10px]">
<div className='w-[100%] flex items-center'>
<button className={`inline-block h-[70px] px-[5px] py-[5px] md:w-auto md:h-auto md:px-[20px] md:py-[8px] bg-[black] text-[white] border border-[white] mb-[1px]`} >RECORDS ({response.total_records})</button>
    <button className={`inline-block  h-[70px] px-[5px] py-[5px] md:w-auto md:h-auto  md:px-[20px] md:py-[8px] bg-[white] text-[black] border border-[black] mb-[1px]`}>RECENTLY VIEWED (1)</button>
    <Link href="/compare">
    <button className={`inline-block  h-[70px] px-[5px] py-[5px] md:w-auto md:h-auto md:px-[20px] md:py-[8px] bg-[white] text-[black] border border-[black] mb-[1px]`} onClick={compare}> COMPARE ({heartCount})</button>
        </Link>
</div>
  
</div>

 <div>{gridlist&&<InfiniteScroll
  dataLength={response.diamonds.length} //This is important field to render the next data
  next={() => {
    
      setData(pre=>({
        ...pre,
        page_offset: (pre.page_offset)+1
      }))
      setCheck(1)
    }
      
    }
  hasMore={true}
  loader={ 
    <div className="grid grid-cols-4 gap-x-9 gap-y-2.5 w-[100%]  mb-[100px]">
    { l.map(item =>item)}
</div>
  }
>
<div className="grid grid-cols-2 md:grid-cols-3 md:gap-x-9 md:gap-y-2.5 w-[100%] lg:grid-cols-4">
{!response && l.map(item =>item)}
{response.diamonds.map((item) =>
<div key={item.stock_num} className=' border-[#dddddd] border hover:border hover:border-[black]'>
{ item.image_url?
  <div className={` ${turnn && item.stock_num === saveid ?"relative  flip-card":"relative"}`}>
    <div className={`${turnn && item.stock_num === saveid?"flip-card-inner ":"flip-card-inner"}`}>
      <div className={`${turnn && item.stock_num === saveid?"flip-card-front":"flip-card-front"}`}>
        <Image src={`/api/imagefetcher?url=${encodeURIComponent(
            item.image_url
          )}`} alt="hh"  className=' object-cover'  width="100%" height="100%" layout="responsive" objectFit="cover"/>{!compareItems.includes(item.stock_num)?<i onClick={()=>comparehearts(item.stock_num)} className="fa-regular fa-heart absolute top-[5px] right-[5px]"></i>:<i className="fa-solid fa-heart absolute top-[5px] right-[5px]" onClick={()=>comparehearts(item.stock_num)}></i>}
      </div>
      <div className={`${turnn && item.stock_num === saveid?" flip-card-back bg-[#ebebeb]":" flip-card-back bg-[#ebebeb]"}`}>
      <p className='mb-[5px]'>SKU: {item.stock_num}</p>
      <p className='mb-[5px]'>Report: {item.lab}</p>
      <p className='mb-[5px]'>Table: {item.table_percent}</p>
      <p className='mb-[5px]'>Depth: {item.depth}</p>
      <p className='mb-[5px]'>Symmetry: {item.symmetry==="VG"?"Very Good":item.symmetry==="EX"?"Exellent":item.symmetry==="GD"?"Good":item.symmetry==="F"?"Fair":"Poor"}</p>
      <p className='mb-[5px]'>Polish: {item.polish==="VG"?"Very Good":item.polish==="EX"?"Exellent":item.polish==="GD"?"Good":item.polish==="F"?"Fair":"Poor"}</p>
      <p >Fluor: {item.fluorescence==="STG"?"Strong":item.fluorescence==="MED"?"Medium":item.fluorescence==="FNT"?"Faint":"None"}</p>
      </div>
    </div>
  </div>:<div className={`${turnn && item.stock_num === saveid ?"relative  flip-card":"relative"}`}>
         <div className={`${turnn && item.stock_num === saveid?"flip-card-inner ":"flip-card-inner"}`}>
         <div className={`${turnn && item.stock_num === saveid?"flip-card-front":"flip-card-front"}`}>
    <Image src={`https://flawlessfinejewelry.com/wp-content/plugins/ring-builder/images/diamond_new_icons/new/${(names[item.shape]).toLowerCase()}.jpg`} alt="hh" className=' object-cover' width="100%" height="100%" layout="responsive" objectFit="cover"/>{!compareItems.includes(item.stock_num) ?<i onClick={()=>comparehearts(item.stock_num)} className="fa-regular fa-heart absolute top-[5px] right-[5px]"></i>:<i className="fa-solid fa-heart absolute top-[5px] right-[5px]" onClick={()=>comparehearts(item.stock_num)}></i>}
    </div><div className={`${turnn && item.stock_num === saveid?" flip-card-back bg-[#ebebeb] ":" flip-card-back bg-[#ebebeb]"}`}>
      <p className='mb-[5px]'>SKU: {item.stock_num}</p>
      <p className='mb-[5px]'>Report: {item.lab}</p>
      <p className='mb-[5px]'>Table: {item.table_percent}</p>
      <p className='mb-[5px]'>Depth: {item.depth}</p>
      <p className='mb-[5px]'>Symmetry: {item.symmetry==="VG"?"Very Good":item.symmetry==="EX"?"Exellent":item.symmetry==="GD"?"Good":item.symmetry==="F"?"Fair":"Poor"}</p>
      <p className='mb-[5px]'>Polish: {item.polish==="VG"?"Very Good":item.polish==="EX"?"Exellent":item.polish==="GD"?"Good":item.polish==="F"?"Fair":"Poor"}</p>
      <p className='mb-[5px]'>Polish: {item.polish}</p>
      <p >Fluor: {item.fluorescence==="STG"?"Strong":item.fluorescence==="MED"?"Medium":item.fluorescence==="FNT"?"Faint":"None"}</p>
      </div></div></div>}

  
  <div className='border-[#dddddd] p-[10px] border' onMouseOver={()=>ul(item.stock_num)} onMouseOut={ ()=>ulout(item.stock_num)}>
    <div className={`${tu && item.stock_num === saveid?"underline":"no-underline"}`}>{item.carat} carat {names[item.shape] }</div>
    <div>{item.cut==="VG"?"Very Good":item.cut==="EX"?"Exellent":item.cut==="GD"?"Good":item.cut==="F"?"Fair":"Poor"} | {item.color} | {item.clarity}</div> 
    <div className='flex justify-between' >
      <div>£ {parseInt(item.fame_price) } (ex VAT)</div>
      <div className='cursor-pointer' onMouseOver={()=>turn(item.stock_num)} onMouseOut={ ()=>turnout(item.stock_num)}>details {turnn && item.stock_num === saveid?"-":"+"}</div>
    </div>
    </div>
    </div>)}
</div>
</InfiniteScroll>}


{!gridlist&&
  <div className="grid grid-cols-4  w-[100%]  border border-[#ddd] pb-[20px] mb-[100px]" >
  <div className='col-span-3' id="scrollableDiv" style={{ height: 700, overflow: "auto" }}>
    <div className='bg-[black] justify-items-center w-[100%] grid grid-cols-9 text-[white] py-[10px] px-[10px] sticky top-0 '>
        <p>Compare</p>
        <p>Shape</p>
        <p>Carat</p>
        <p>Color</p>
        <p>Clarity</p>
        <p>Cut</p>
        <p>Report</p>
        <p>Price</p>
        <p>Details</p>
    </div>
    <InfiniteScroll
  dataLength={response.diamonds.length} //This is important field to render the next data
  next={() => {
    
      setData(pre=>({
        ...pre,
        page_offset: (pre.page_offset)+1
      }))
      setCheck(1)
    }
    }
  hasMore={true}
  loader={
  listLoader.map(item =>item)
}
  scrollableTarget="scrollableDiv"
>
{response.diamonds.map((item) => 
    <div key={item} className=' w-[100%] grid grid-cols-9 justify-items-center py-[10px] px-[10px]  cursor-pointer' onMouseEnter={()=>sideItem(item.stock_num)} >
        <p >{!compareItems.includes(item.stock_num)?<i onClick={()=>comparehearts(item.stock_num)} className="fa-regular fa-heart"></i>:<i className="fa-solid fa-heart" onClick={()=>comparehearts(item.stock_num)}></i>}</p>
        <p>{item.shape}</p>
        <p>{item.carat}</p>
        <p>{item.color}</p>
        <p>{item.clarity}</p>
        <p>{item.cut}</p>
        <p>{item.lab}</p>
        <p>£ {parseInt(item.fame_price) }</p>
        <p>view</p>
    </div>)}
</InfiniteScroll>    
</div>


{response.diamonds.map((item) => sideItem && item.stock_num === saveid &&
<div key={item} className='col-span-1'>
<div className='bg-[black] w-[100%] flex justify-center text-[white] py-[10px] px-[10px]'>
    <p className='text-center'>DIAMOND INFORMATION</p>
  </div>
  <div>
   <iframe  src={ sideItems && item.stock_num === saveid ? item.video_url:null} width="100%" height="300px">
   </iframe>
  </div>
  <div className='text-center mt-[15px] px-[10px]'>
    <button className='border border-[black] px-[30px] py-[5px] w-[100%]'>VIEW DIAMOND</button>
  </div>
  <div className="grid grid-cols-2 gap-4 p-[15px] text-[12px]">
  <div>
    <div>STOCK NO</div>
    <div>{ sideItems && item.stock_num === saveid ? item.stock_num:null}</div>
  </div>
  <div>
    <div>PRICE</div>
    <div>{ sideItems && item.stock_num === saveid ? item.fame_price:null}</div>
  </div>
  <div>
    <div>SHAPE</div>
    <div>{ sideItems && item.stock_num === saveid ? item.shape:null}</div>
  </div>
  <div>
    <div>CUT</div>
    <div>{ sideItems && item.stock_num === saveid ? item.cut:null}</div>
  </div>
  <div>
    <div>CARAT WEIGHT</div>
    <div>{ sideItems && item.stock_num === saveid ? item.carat:null}</div>
  </div>
  <div>
    <div>CLARITY</div>
    <div>{ sideItems && item.stock_num === saveid ? item.clarity:null}</div>
  </div>
  <div>
    <div>COLOR</div>
    <div>{ sideItems && item.stock_num === saveid ? item.color:null}</div>
  </div>
  <div>
    <div>MEASUREMENTS</div>
    <div>{ sideItems && item.stock_num === saveid ? item.fame_price:null}</div>
  </div>
  <div>
    <div>REPORT</div>
    <div>{ sideItems && item.stock_num === saveid ? item.fame_price:null}</div>
  </div>
  <div>
    <div>SYMMETRY</div>
    <div>{ sideItems && item.stock_num === saveid ? item.symmetry:null}</div>
  </div>
</div>
</div>)}
  
</div>
}</div>



{/* main conatiner ends */}
</div>}
{comparelist && 
  <div className="container max-w-[1130px] mx-auto ">
    <div className='cursor-pointer mb-[50px]' onClick={records}>back to diamonds</div>
    <h1 className='text-[2em] text-center mb-[50px]'>Compare Diamond()</h1>
    <div className='border border-[black] w-[100%]'>
    <div className="grid grid-cols-6 gap-4">
    <div className="grid grid-rows-15 col-span-1 ">
    <div className='border border-[black] h-[50px]'></div>
    <div className='border border-[black] h-[100px]'>Image</div>
    <div className='border border-[black]'>View Details</div>
    <div className='border border-[black]'>Price</div>
    <div className='border border-[black]'>Shape</div>
    <div className='border border-[black]'>Carat Weight</div>
    <div className='border border-[black]'>Color</div>
    <div className='border border-[black]'>Clarity</div>
    <div className='border border-[black]'>Cut</div>
    <div className='border border-[black]'>Polish</div>
    <div className='border border-[black]'>Symmetry</div>
    <div className='border border-[black]'>Fluorescence</div>
    <div className='border border-[black]'>Measurements</div>
    <div className='border border-[black]'>Depth %</div>
    <div className='border border-[black]'>Table %</div>
  </div>

  {response.diamonds.map((item) => compareItems.includes(item.stock_num)&& <div>
    <div key={item} onClick={()=>comparehearts(item.stock_num)} className="cursor-pointer">remove</div>
    <div><Image src={`/api/imagefetcher?url=${encodeURIComponent(
            item.image_url
          )}`} alt="hh"  className=' object-cover'  width="100%" height="100%" layout="responsive" objectFit="cover"/></div>
    <div>{item.id}</div>
    <div>£ {parseInt(item.fame_price) }</div>
    <div><button>add to</button></div>
    <div>{item.shape}</div>
    <div>{item.carat}</div>
    <div>{item.color}</div>
    <div>{item.clarity}</div>
    <div>{item.cut}</div>
    <div>{item.polish}</div>
    <div>{item.fluorescence}</div>
    <div>{item.width}</div>
    <div>{item.depth_percent}</div>
    <div>{item.table_percent}</div>
  </div>)}
</div>
      
    
    </div>
  </div>}


   </div>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://gems.netfillip.org/public/getfilter`)
  const ndata = await res.json()

  return { props: { ndata } }
}


