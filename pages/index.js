import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import "nouislider/distribute/nouislider.css";
import React, {useState,useEffect} from 'react'
import FormData from 'form-data';
import axios from 'axios';
import OptionSlider from '../components/OptionSlider'
import InfiniteScroll from 'react-infinite-scroll-component';
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
 

let [flag, setflag] = useState(false)
  function show(){

      setflag(pre => !pre)

  }


  let [Data, setData] = useState(d)
  useEffect(() => {  
  if (typeof window !== "undefined") {
    setData(localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items'))  : d)
    console.log("off")
    
 
   
    console.log("offset")
  }  setData(prev=>({...prev,page_offset:1})) 
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

    // console.log(response.diamonds[0].id)
  
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
console.log("abhay")


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

  function turn(){
    setTurnn(true)
    console.log("in")
  }
  function turnout(){
    setTurnn(false)
    console.log("out")
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
//  let k = response.diamonds    
//  let sp = (k || []).map(item=>{
//    return (
//      <>
//        {item.image_url&&<div className=' border-[#dddddd] border hover:border hover:border-[black]'><div className='relative'><img src={item.image_url} alt="hh" className='h-[245px] w-[100%] object-cover' /><i className="fa-regular fa-heart absolute top-[5px] right-[5px]"></i></div><div className='border-[#dddddd] border'><div>{item.carat} carat {item.shape}</div><div>{item.cut} {item.color} {item.clarity}</div> <div>{item.supplier_net_price}</div></div></div>}
//      </>
//    )
    
//  })

//  console.log(response)

//  function fetchData(){
//    setData(pre=>({
//      ...pre,
//      page_offset: pre.page_offset+1
//    }))

//    return (k || []).map(item=>{
//      return item.image_url
//    })
   
//  }

//  let fetchData = () => {
//   console.log("opd")

//     setData(pre=>({
//       ...pre,
//       page_offset: pre.page_offset+1
//     }))
//     setCheck(1)
//     console.log("op")

 
    
 
  
    // axios.post('http://gems.netfillip.org/public/getdiamonds', formData, config)
    // .then(res => {
    //   console.log('hello');
    //   console.log(Data.page_offset)
    //   if(Data.page_offset==1){
    //     setResponse(res.data)
    //   }else{
    //     setResponse((prevData) => ({...prevData,diamonds:[...prevData.diamonds,...res.data.diamonds]}))
    //   }
    // })
    // .catch(err => console.log(err));

    // (k || []).map(item=>{
    //   item.image_url
    // })
  // a fake async api call like which sends
  // 20 more records in .5 secs
  
// }


console.log(Data)
console.log(Data.page_offset)

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      </Head>

     

      <div>   
     <Image
      src='/images/Flawless-Logo.png'
      alt="Picture of the author"
      width={300}
      height={100}
    />
   </div>

   <div className="grid grid-cols-2 gap-x-20 w-[65%] mx-auto border-b pb-[20px] border-[#d1d1d1]">
        <div className='flex items-center mt-[30px] w-[100%]'>
         <div className='w-[20%]'>SHAPE</div>
         <div className='flex w-[100%] justify-between items-center '>{s}</div> 
       </div>

     <OptionSlider 
          name="PRICE" 
          range={priceArr} 
          data={Data} 
          click={handleChange} 
          options={priceOptions} 
          handleclick={handle}
          left="filter_price_min"
          right="filter_price_max"
          flag="op"
     />
       
     
      <OptionSlider 
          name="CARAT" 
          range={caratArr} 
          data={Data} 
          click={handleChange} 
          options={caratOptions}
          left="filter_carat_min"
          right="filter_carat_max"
          handleclick={handle}
          flag="op"
       />

      <OptionSlider 
          name="CUT" 
          range={{ min: 0 , max: 4 }}
          data={Data} 
          click={handleChange} 
          handleclick={handle}
          left="filter_cut_min"
          right="filter_cut_max"
          flag="cut"
          kut={4}
        />

      <OptionSlider 
       name="COLOR" 
       range={{ min: 0 , max: 10 }}
       data={Data} 
       click={handleChange} 
       left="filter_color_min"
       right="filter_color_max"
       handleclick={handle}
       flag="color"
       kut={9}
       />

<OptionSlider 
     name="CLARITY" 
     range={{ min: 0 , max: 9 }}
     data={Data} 
     click={handleChange} 
     handleclick={handle}
     left="filter_clarity_min"
     right="filter_clarity_max"
     flag="clarity"
     kut={9}
     
     />
      </div>

   


   <div className={`${flag?"grid grid-cols-2 gap-x-20 mx-auto w-[65%] max-h-[500px] overflow-hidden duration-1000 ease-in":"max-h-[0px] grid grid-cols-2 gap-x-20 mx-auto w-[65%] overflow-hidden duration-1000 ease-out"}`}>
   <OptionSlider 
     name="FLUOR" 
     range={{ min: 0 , max: 4 }}
     data={Data} 
     click={handleChange} 
   
     handleclick={handle}
     left="filter_fluorescence_min"
     right="filter_fluorescence_max"
     flag="fluor"
     kut={4}
     />

<div className='flex justify-between mt-[30px]'>
       <div>REPORT</div>
       <div className='w-[100%] ml-[25px]'>
      
              <span className={`w-[70px] py-[5px] border border-black inline-block text-center mr-[4px] cursor-pointer ${Data.lab.includes("GIA")?"bg-black text-white":"bg-white text-black"}`} onClick={() => flip("GIA","lab")}>GIA</span>
              <span className={`w-[70px] py-[5px] border border-black inline-block text-center mr-[4px] cursor-pointer ${Data.lab.includes("IGI")?"bg-black text-white":"bg-white text-black"}`} onClick={() => flip("IGI","lab")}>IGI</span>
              <span className={`w-[70px] py-[5px] border border-black inline-block text-center mr-[4px] cursor-pointer ${Data.lab.includes("AGS")?"bg-black text-white":"bg-white text-black"}`} onClick={() => flip("AGS","lab")}>AGS</span>
              
       </div>
     </div>

     <OptionSlider 
     name="SYMM" 
     range={{ min: 0 , max: 5 }}
     data={Data} 
     click={handleChange} 
     handleclick={handle}
     left="filter_symmerty_min"
     right="filter_symmerty_max"
     flag="symm"
     kut={5}
     
     />

<OptionSlider 
        name="POLISH" 
        range={{ min: 0 , max: 5 }}
        data={Data} 
        click={handleChange} 
        handleclick={handle}
        left="filter_polish_min"
        right="filter_polish_max"
        flag="polish"
        kut={5}
     />
     <OptionSlider 
     name="TABLE" 
     range={{min:0,max:88}}
     data={Data} 
     click={handleChange} 
     handleclick={handle}
     left="filter_table_min"
     right="filter_table_max"
     flag="depth"
     />

<OptionSlider 
        name="DEPTH" 
        range={{min:0,max:106.60}}
        data={Data} 
        click={handleChange} 
        handleclick={handle}
        left="filter_depth_min"
        right="filter_depth_max"
        flag="depth"
     />

<div className='flex justify-between mb-[30px] mt-[30px]'>
       <div>LOCATE</div>
       <div className='w-[100%] ml-[20px]'>
      
              <span className={`w-[70px] py-[5px] border border-black inline-block text-center mr-[4px] cursor-pointer ${Data.origin == "ALL" ?"bg-black text-white":"bg-white text-black"}`} onClick={() => origin("ALL")}>ALL</span>
              <span className={`w-[70px] py-[5px] border border-black inline-block text-center mr-[4px] cursor-pointer ${Data.origin == "UK" ?"bg-black text-white":"bg-white text-black"}`} onClick={() => origin("UK")}>UK</span>
              
              
       </div>
     </div>
     
</div>

<div className='max-w-[65%] grid grid-cols-3 gap-4 mx-auto  border-t  border-[#d1d1d1] mb-[15px]'>
  <div className='col-start-2'><button className={`mx-auto block  px-[20px] py-[12px] bg-[black] text-[white] border border-[white]  hover:bg-[white] hover:text-[black] hover:border-[black] hover:border`}  onClick={show} > {!flag?<i className="fa-solid fa-plus mr-[5px] "></i>:<i className="fa-solid fa-xmark mr-[5px] "></i>}  ADVANCE FILTER</button></div>   
   <div className='col-end justify-self-end self-center'><span ><i className="fa-solid fa-rotate-left"></i> RESET SEARCH</span> </div>
   </div>

   <div className='max-w-[65%] flex  mx-auto mb-[15px]'>
      <div className='ml-auto'>
        <input className='border border-[#ddd] min-w-[280px]  rounded' type="text" placeholder='Search by diamond or Certificate ID' /><span className=' px-[5px] inline-block border border-[#ddd]'><i className="fa-solid fa-magnifying-glass"></i></span> 
        {/* */}
      </div>
   </div>

   <div className='max-w-[65%] flex  mx-auto mb-[50px]'>
   <div className='mr-auto'>Change: <i className="fa-solid fa-list"></i>  <i className="fa-solid fa-grip"></i></div>
      <div className='ml-auto'>
      <span className=' px-[5px] inline-block '>Sort By:</span><select className='min-w-[188px] py-[5px]'>
        <option>Price: Low-to-High</option>
        <option>Price: High-to-Low</option>
        <option>Carat: Low-to-High</option>
        <option>Carat: High-to-Low</option>
        <option>Color: Low-to-High</option>
        <option>Color: High-to-Low</option>
        <option>Clarity: Low-to-High</option>
        <option>Clarity: High-to-Low</option>
        <option>Cut: Low-to-High</option>
        <option>Cut: High-to-Low</option>
        </select>
        {/* */}
      </div>
   
   </div>
   <div className="max-w-[65%] mx-auto grid grid-cols-2 gap-4">
  <div className='flex '>
    <button className={`block  px-[20px] py-[8px] bg-[black] text-[white] border border-[white] mb-[15px]`}>RECORDS ({response.total_records})</button>
    <button className={`block  px-[20px] py-[8px] bg-[black] text-[white] border border-[white] mb-[15px]`}>RECENTLY VIEWED (1)</button>
    <button className={`block  px-[20px] py-[8px] bg-[black] text-[white] border border-[white] mb-[15px]`}> COMPARE </button>
  </div>

  <div></div>
</div>



   {/* <div className="grid grid-cols-4 gap-x-9 gap-y-2.5 w-[65%] mx-auto">
 {sp}
</div> */}
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
  loader={<h4>Loading...</h4>}
>
<div className="grid grid-cols-4 gap-x-9 gap-y-2.5 w-[65%] mx-auto">
{response.diamonds.map((item) => 
<div key={item.stock_num} className=' border-[#dddddd] border hover:border hover:border-[black]'>
  {item.image_url?<div className={` ${turnn?"relative  flip-card":"relative"}`}><div className={`${turnn?"flip-card-inner ":"flip-card-inner"}`}><div className={`${turnn?"flip-card-front":"flip-card-front"}`}><img src={item.image_url} alt="hh" className='h-[245px] w-[100%] object-cover' /><i className="fa-regular fa-heart absolute top-[5px] right-[5px]"></i></div><div className={`${turnn?" flip-card-back ":" flip-card-back"}`}>asdafa</div></div></div>:<div className='relative'><img src={Data.shape.includes("round")?"https://flawlessfinejewelry.com/wp-content/plugins/ring-builder/images/diamond_new_icons/new/round.jpg":Data.shape.includes("princess")?"https://flawlessfinejewelry.com/wp-content/plugins/ring-builder/images/diamond_new_icons/new/princess.jpg":Data.shape.includes("cushion")?"https://flawlessfinejewelry.com/wp-content/plugins/ring-builder/images/diamond_new_icons/new/cushion.jpg":Data.shape.includes("asscher")?"https://flawlessfinejewelry.com/wp-content/plugins/ring-builder/images/diamond_new_icons/new/asscher.jpg":Data.shape.includes("marquise")?"https://flawlessfinejewelry.com/wp-content/plugins/ring-builder/images/diamond_new_icons/new/marquise.jpg":Data.shape.includes("oval")?"https://flawlessfinejewelry.com/wp-content/plugins/ring-builder/images/diamond_new_icons/new/oval.jpg":Data.shape.includes("radiant")?"https://flawlessfinejewelry.com/wp-content/plugins/ring-builder/images/diamond_new_icons/new/radiant.jpg":Data.shape.includes("pear")?"https://flawlessfinejewelry.com/wp-content/plugins/ring-builder/images/diamond_new_icons/new/pear.jpg":Data.shape.includes("emerald")?"https://flawlessfinejewelry.com/wp-content/plugins/ring-builder/images/diamond_new_icons/new/emerald.jpg":"https://flawlessfinejewelry.com/wp-content/plugins/ring-builder/images/diamond_new_icons/new/heart.jpg"} alt="hh" className='h-[245px] w-[100%] object-cover' /><i className="fa-regular fa-heart absolute top-[5px] right-[5px]"></i></div>}

  <div className='border-[#dddddd] border'>
    <div>{item.carat} carat {item.shape}</div>
    <div>{item.cut} {item.color} {item.clarity}</div> 
    <div className='flex justify-between' >
      <div>{item.supplier_net_price}</div>
      <div className='cursor-pointer' onMouseOver={turn} onMouseOut={turnout}>details+</div>
    </div>
    </div>
    </div>)}
</div>
</InfiniteScroll>
   </div>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://gems.netfillip.org/public/getfilter`)
  const ndata = await res.json()

  return { props: { ndata } }
}


