export const handleFontSizeByLength = ( (titleLength:number) =>{
    let value;
  titleLength  >= 40 ? value= '160%' : titleLength  >= 29 ? value='180%' :  value='200%'
    return value
  } )


  export const handleMovieDetailsFontSizeByLength = ( (titleLength:number) =>{
    let value;
  titleLength  >= 40 ? value= '150%' : titleLength  >= 29 ? value='180%' :  value='200%'
    return value
  } )