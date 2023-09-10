export const handleFontSizeByLength = ( (titleLength:number) =>{
    let value;
  titleLength  >= 40 ? value= '120%' : titleLength  >= 29 ? value='150%' :  value='190%'
    return value
  } )