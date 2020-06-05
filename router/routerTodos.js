(function(){
    //初始化
        // 每次刷新都回到all的界面
        function handleHashchange(){
            window.location.hash=""
            app.checkMiddle="all"
        }
        let routerHash = [{pash:"all"},{pash:"active"},{pash:"finish"}]
        window.addEventListener("hashchange", function () {
            let checkMiddle = window.location.hash.replace("#/", "")
            let index = routerHash.findIndex((v,i)=>{
                if(v.pash === checkMiddle){
                    return true
                }
            })
            if(index === -1){
                window.location.hash = ""
                app.checkMiddle = "all"
            }else{
                app.checkMiddle = checkMiddle
            }
        })
        handleHashchange()
})()