function hi(){
    console.log('Hi')
}


function introduce(a){
    a()
}
introduce(hi)
// Callback function -> hi 
// higher Order function -> introduce