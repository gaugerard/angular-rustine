function backToTop(){
    window.scrollTo({top: 0, left : 0, behavior:"smooth"})
}

window.addEventListener('scroll', () => {
    var scrolled = window.scrollY;
    var divTop = document.getElementById('toTop');

    if(scrolled > 50){
        divTop.setAttribute('class','topVisible');
    }
    else{
        divTop.setAttribute('class','topInvisible');
    }
})
