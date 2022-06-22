
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import Cuts from './Cuts'
import Label from './Label'



function OptionSlider(props){


    return(
        <div className=' md:flex md:justify-between md:mt-[30px] md:w-[100%]  '>
        <div className="md:w-[20%] px-[10px] py-[15px] md:px-[0px] md:py-[0px] border border-[black] md:border-none">{props.name}</div>
        <div className='hidden md:block w-[100%]'>
          <div className='relative  '>
                <Nouislider 
                  snap={props.flag==='op'?true:false}
                  range={props.range}
                  start={[props.data[props.left], props.data[props.right]]}
                  onChange = {(e) => props.click(`${props.left}`,`${props.right}`,e) }
                  step={1} 
                  margin={props.flag!=='op' ? 1: null}
                  connect 
          />
          
            <Cuts p={props.kut}/>
      
          </div>
          <Label k={props.flag} d={props.data} l={props.left} r={props.right} o={props.options} h={props.handleclick}/>
        </div>
      </div>
    )
}

export default OptionSlider

