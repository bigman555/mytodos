(function(Vue){
    Vue.prototype.getUnipId=function(){
        return Date.now()
    }
    let storageKey = "mytodos"
    let mytodos = {}
        mytodos.storageFunc = {
            fetch: function () {
                return JSON.parse(localStorage.getItem(storageKey) || [])
            },
            save: function (todos) {
                localStorage.setItem(storageKey, JSON.stringify(todos))
            }
        }
        window.mytodos=mytodos
})(Vue)