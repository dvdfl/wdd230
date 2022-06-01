
// all images with data-src attribute
const images = document.querySelectorAll("img[data-src]");
// function that loads image
const loadImage = function(img) {
    // double checking image still has data-src atribute
    if(!img.hasAttribute("data-src")){
        return;
    }
    // get data-src attribute
    const dataSrc = img.getAttribute("data-src");
    // setting src attribute
    img.src = dataSrc;
    // removing data-src attribute
    img.onload = ()=> img.removeAttribute("data-src");
};

if(window.IntersectionObserver) {
    //observer options
    const observerOptions = { rootMargin: '0px', threshold: .15};
    //observer 
    let imagesObserver = new IntersectionObserver((items, imagesObserver) => {
        //loop through each item  (image) being observed
        items.forEach(item=>{
            // if item is showing (intersection) image can be loaded
            if(item.isIntersecting) {
                //calling function that loads image
                loadImage(item.target);
                //image removed from the observed items list
                imagesObserver.unobserve(item.target);
            }
        })
    }, observerOptions)

    //adding each one of the images to observer
    images.forEach(item=>{
        imagesObserver.observe(item);
    })  
}
else{
    // fallback code if Intersection observer isn't supported images are loaded immediately
    images.forEach(item=>{
        loadImage(item);
    })
}