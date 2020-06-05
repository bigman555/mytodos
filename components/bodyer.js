(function (Vue) {
    Vue.component("bobyer-todos", {
        watch: {
            todos: {
                handler(todos) {
                    window.mytodos.storageFunc.save(todos);
                },
                deep: true
            }
        },
        computed: {
            tips: function () {
                let tips = [];// 存下拉框提示的
                this.todos.forEach((v, i) => {
                    if (v.content.indexOf(this.inputVal) != -1) {
                        tips.push(v.content);
                    }
                })
                return tips;
            },
            filterTodos: function () {
                if (this.checkMiddle == "all") {
                    return this.todos
                } else if (this.checkMiddle == "active") {
                    return this.todos.filter(function (v, i) {
                        return !v.completed
                    })
                } else {
                    return this.todos.filter(function (v, i) {
                        return v.completed
                    })
                }
            },
            allChecked: function () {
                let allChecked = true;
                this.todos.map(function (v, i) {
                    if (!v.completed) {
                        allChecked = false
                    }
                })
                this.allcheckLabel = allChecked
                return allChecked
            },
            raming: function () {
                let raming = this.todos.filter((v, i) => {
                    return !v.completed
                })
                return raming
            },
            checkMiddle:function(){
                return this.$root.checkMiddle;
            } 
        },
        data:function() {
            return {
                inputting: false,
                allcheckLabel: false,
                inputVal: "",          //输入框的值      
                todos:window.mytodos.storageFunc.fetch(),
                edit_index: -1,       // -1 代表没有在编辑的项
                content_canche: "",  //编辑缓存的内容  
            }
        },
        driectives: {
            "foucs": {
                inserted: function (el, binding) {
                    el.foucs();
                }
            }
        },
        methods: {
            addTodoFromTip: function (tip) {
                this.todos.push({
                    content: tip,
                    id: Date.now(),
                    completed: false
                })
                this.inputting = false;
            },
            showtips: function () {
                this.inputting = true;
            },
            delAll: function (index) {
                let delFinsh = this.todos.filter((v, i) => {
                    return !v.completed
                })
                this.todos = delFinsh
            },
            removeTodo: function (index) {
                this.todos.splice(index, 1)
            },
            cancelEditTodo(index) {
                this.todos[index].content = this.content_canche;
                this.content_canche = "";  //清空编辑内容的缓存
                this.edit_index = -1
            },
            saveEditTodo: function (index) {
                if (!this.todos[index].content) {
                    this.todos.splice(index, 1)
                }
                this.edit_index = -1         //取消编辑的状态
            },
            editTodo: function (index) {
                this.edit_index = index,
                    this.content_canche = this.todos[index].content;
            },
            saveNewTodo: function () {
                if (!this.inputVal.trim()) {
                    alert("不能白努力");
                    return
                }
                this.todos.push({
                    id: Date.now(),
                    content: this.inputVal,
                    completed: false
                })
                this.inputVal = "";
            },
            allCheckEvent: function () {
                this.todos.forEach((v, i) => {
                    v.completed = !this.allcheckLabel;
                })
                this.allcheckLabel = !this.allcheckLabel;
            }
        },
        template: `
            <section>
            <section class="app-content">
            <section class="app-content-top">
                <section :class="['left',{allcheck:allChecked}]" @click="allCheckEvent">></section>
                <section class="right">
                    <input type="text" v-model="inputVal" @input="showtips" @keyup.13="saveNewTodo"
                        placeholder="你今天的计划呢？" />
                        <ul :class='["hidden",{show:inputting}]'>
                            <li v-for="tip,index in tips"
                            @click.stop="addTodoFromTip(tip)"
                            >{{tip}}</li>
                        </ul>
                </section>
            </section>
            <section class="app-content-list">
                <section class="app-content-listItem" v-for="item,index in filterTodos">
                    <section class="left">
                        <input type="checkbox" class="tui-checkbox" name="" id="" v-model="item.completed">
                    </section>
                    <section @dblclick.stop="editTodo(index)" :class="['middle',{completed:item.completed,
                        hidden:edit_index==index}]">
                        {{item.content}}
                    </section>
                    <section :class="['middle','hidden',{show:edit_index==index}]">
                        <input type="text" v-model="item.content" @keyup.13="saveEditTodo(index)"
                            @blur="saveEditTodo(index)" @keyup.esc="cancelEditTodo(index)">
                    </section>
                    <section class="right" @click="removeTodo(index)">
                        X
                    </section>
                </section>
            </section>
        </section>
        <section class="app-buttom">
            <section class="left">
                剩下{{raming.length}}项
            </section>
            <section class="moddle">
                <a href="#/all" :class="['middelLeft',{active:checkMiddle=='all'}]">All</a>
                <a href="#/active" :class="['middelMiddle',{active:checkMiddle=='active'}]">激活</a>
                <a href="#/finish" :class="['middelRight',{active:checkMiddle=='finish'}]">完成</a>
            </section>
            <section class="right" @click="delAll">清除已完成</section>
        </section>
            </section>
        `

    })
})(Vue)