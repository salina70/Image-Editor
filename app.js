

let chooseImg = document.querySelector("#image-input");
chooseImg.addEventListener("change", (e)=>{
    console.log(e.target.files[0])
})

const img = new Image();
img.src=URL.createObjectURL(file);
img.onload = ()=>{
    
}