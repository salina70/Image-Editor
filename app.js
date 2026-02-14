const filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"           // brightness uses percentage
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"           // contrast uses percentage
    },
    saturation: {
        value: 0,
        min: 0,
        max: 200,
        unit: "%"           // saturate uses percentage
    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"         // hue-rotate uses degrees
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px"          // blur uses pixels
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"           // grayscale uses percentage
    },
    opacity: {
        value: 50,
        min: 0,
        max: 100,
        unit: "%"           // opacity uses percentage
    }
};

    const img = new Image();

const filtersContainer = document.querySelector(".filters");
let imageCanva = document.querySelector("#image-canvas")
let canvasCtx = imageCanva.getContext("2d")
let imageInp = document.querySelector("#image-input")

function createFilter( name, unit="%", value, min, max){
    const div = document.createElement("div");
    div.classList.add("filter");
    const inp = document.createElement("input");
    inp.type = "range";
    inp.min = min
    inp.max = max
    inp.value = value
    inp.id = name
    const p = document.createElement("p");
    p.innerText = name
    div.appendChild(p)
    div.appendChild(inp)
inp.addEventListener("input", (e)=>{
   filters[name].value=inp.value;
   applyFilters()
})
    return div;
}
Object.keys(filters).forEach(key=>{
    const filterElement = createFilter(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max);
    filtersContainer.appendChild(filterElement);
})
imageInp.addEventListener("change", (e)=>{
    const file = e.target.files[0];
    const imgPlaceHolder = document.querySelector(".icon-div");
    imgPlaceHolder.style.display='none'
    img.src = URL.createObjectURL(file);
    img.onload=()=>{
      imageCanva.style.display='flex'
      imageCanva.width=400;
      imageCanva.height=400;
        canvasCtx.drawImage(img, 0,0, imageCanva.width, imageCanva.height);
      applyFilters()
      }
})

function applyFilters(){

   canvasCtx.clearRect(0, 0, imageCanva.width, imageCanva.height);

 canvasCtx.filter = `
  brightness(${filters.brightness.value}${filters.brightness.unit})
  contrast(${filters.contrast.value}${filters.contrast.unit})
  saturate(${filters.saturation.value}${filters.saturation.unit})
  hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
  blur(${filters.blur.value}${filters.blur.unit})
  grayscale(${filters.grayscale.value}${filters.grayscale.unit})
  opacity(${filters.opacity.value}${filters.opacity.unit})
`;

   canvasCtx.drawImage(
       img,
       0,
       0,
       imageCanva.width,
       imageCanva.height
   );
}
let dn = document.querySelector("#dn");
dn.addEventListener("click", function(){
   if(!imageInp){
      alert("select a image");
   }
   let link = document.createElement("a");
   link.href=imageCanva.toDataURL();
   link.download='edited-image.png';
   link.click();

})

let reset = document.querySelector("#reset");
reset.addEventListener("click", function(){
filters.brightness.value=100;
filters.contrast.value=100;
filters.saturation.value=0;
filters.hueRotation.value=0;
filters.blur.value=0;
filters.grayscale.value=0;
filters.opacity.value=50;

canvasCtx.clearRect(0, 0, img.width, img.height);
canvasCtx.filter='none';
canvasCtx.drawImage(img, 0, 0, img.width, img.height);

Object.keys(filters).forEach(key=>{
   let slider = document.getElementById(key);
   if(slider){
     slider.value=filters[key].value;
   }
})

})