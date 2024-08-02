import React, {useState} from 'react';  
import './style.scss'; 
  
const ScrollButton = () =>{ 
  
  const [visible, setVisible] = useState(false) 
  
  const toggleVisible = () => { 
    const scrolled = document.documentElement.scrollTop; 
    if (scrolled > 150){ 
      setVisible(true) 
    }  
    else if (scrolled <= 150){ 
      setVisible(false) 
    } 
  }; 
  
  const scrollToTop = () =>{ 
    window.scrollTo({ 
      top: 0,  
      behavior: 'smooth',
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    }); 
  }; 
  
  window.addEventListener('scroll', toggleVisible); 
  
  return (
    <button className="scrollbutton" style={{display: visible ? 'inline' : 'none'}}> 
     <img className="scrollbuttonImg" src="up-arrow.png" onClick={scrollToTop} style={{display: visible ? 'inline' : 'none'}} /> 
    </button> 
  ); 
} 
  
export default ScrollButton; 