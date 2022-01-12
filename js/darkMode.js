let darkMode;

if(localStorage.getItem('darkMode')){
    darkMode = localStorage.getItem('darkMode')
}else{
    darkMode = "light"
}

localStorage.setItem('darkMode', darkMode)

$(() => {
    if(localStorage.getItem('darkMode') == "dark"){
        $('body').addClass('darkMode')
        $('#btnDarkMode').fadeOut("slow")
        $('#btnLightMode').fadeIn("slow")
    }else{
         $('#btnLightMode').fadeOut("slow")
    }

    $('#btnDarkMode').click(() =>{
        $('#btnDarkMode').fadeOut("slow")
        $('#btnLightMode').fadeIn("slow")

        $('body').addClass('darkMode')
        localStorage.setItem('darkMode', "dark")
    })

    $('#btnLightMode').click(() =>{
        $('#btnDarkMode').fadeIn("slow")
        $('#btnLightMode').fadeOut("slow")
       
        $('body').removeClass('darkMode')
        localStorage.setItem('darkMode', "light")
    })
})