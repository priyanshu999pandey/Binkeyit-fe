const ValidUrlConvert = (name)=>{
    // console.log("name",name)
    const url =name.toString().replaceAll(" ","-").replaceAll(",","-").replaceAll("&","-");
    // console.log(url);
    
    return url;
}
export default ValidUrlConvert