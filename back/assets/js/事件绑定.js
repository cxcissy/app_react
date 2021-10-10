let ev={
    add:function(obj,name,fn) {     //添加事件
        if(obj.attachEvent){        //判断是否有IE事件
            obj.attachEvent('on'+name,fn)
        }else if(obj.addEventListener){     //非IE事件
            obj.addEventListener(name,fn,false)
        }else {                 //都不支持用DOM0级事件
            obj['on'+name]=fn;
        }
    },
    del:function (obj,name,fn) {//删除事件
        if(obj.attachEvent){
            obj.detachEvent('on'+name,fn)
        }else if(obj.addEventListener){
            obj.removeEventListener(name,fn,false)
        }else {
            obj['on'+name]=null;
        }
    },
    stopBubble:function(e){      //阻止冒泡
        e=e||event;
        if(e.stopPropagation){
            e.stopPropagation();
        }else{
            e.cancelBubble=true;
        }
    },
    //阻止事件代理
    agent:function (parentId,type,className,fun) {   //type事件名字  className类名
        let parent=document.getElementById(parentId);
        this.add(parent,type,function (e) {
            e=e||event;
            let target=e.target||e.srcElement;      //兼容IE和非IE
            let targetId=target.getAttribute('id');
            //如果没有找到目标并且当前目标不是祖先对象，继续找（循环）
            while(target.className!=className && targetId!=parentId){
                target=target.parentNode;       //寻找上一级父节点
                targetId=target.getAttribute('id');
            }
            if (target.className===className){      //找到了目标对象
                fun.call(target)        //回调，把fun这个函数绑定到target上，fun中的this就是target
                                        //call能把一个方法绑定到节点上
            }
        })
    },
    /*事件代理类名*/
    agent1:function (parentId,type,childName,fun) {   //type事件名字  className类名
        let parent=document.getElementById(parentId);
        this.add(parent,type,function (e) {
            e=e||event;
            let target=e.target||e.srcElement;      //兼容IE和非IE
            let targetId=target.getAttribute('id');
            //如果没有找到目标并且当前目标不是祖先对象，继续找（循环）
            while(target.nodeName.toLowerCase()!=childName && targetId!=parentId){
                target=target.parentNode;       //寻找上一级父节点
                targetId=target.getAttribute('id');
            }
            if (target.nodeName.toLowerCase()===childName){      //找到了目标对象
                fun.call(target)        //回调，把fun这个函数绑定到target上，fun中的this就是target
                                        //call能把一个方法绑定到节点上
            }
        })
    },
    /*代理父对象名*/
    agent2:function (parent,type,childName,fun) {   //type事件名字  className类名
        this.add(parent,type,function (e) {
            e=e||event;
            let target=e.target||e.srcElement;      //兼容IE和非IE
            //如果没有找到目标并且当前目标不是祖先对象，继续找（循环）
            while(target.nodeName.toLowerCase()!=childName && target.nodeName!=parent.nodeName){
                target=target.parentNode;       //寻找上一级父节点
            }
            if (target.nodeName.toLowerCase()===childName){      //找到了目标对象
                fun.call(target)        //回调，把fun这个函数绑定到target上，fun中的this就是target
                                        //call能把一个方法绑定到节点上
            }
        })
    },
    agent3:function (parentId,type,className,fun) {   //type事件名字  className类名
        let parent=document.getElementById(parentId);
        this.add(parent,type,function (e) {
            e=e||event;
            let target=e.target||e.srcElement;      //兼容IE和非IE
            let targetId=target.getAttribute('id');
            //如果没有找到目标并且当前目标不是祖先对象，继续找（循环）
            while(!target.classList.contains(className) && targetId!=parentId){
                target=target.parentNode;       //寻找上一级父节点
                targetId=target.getAttribute('id');
            }
            if (target.classList.contains(className)){      //找到了目标对象
                fun.call(target)        //回调，把fun这个函数绑定到target上，fun中的this就是target
                                        //call能把一个方法绑定到节点上
            }
        })
    },
    stopDefault:function (e) {          //阻止默认行为
        e=e||event;
        if(e.preventDefault){
            e.preventDefault();         //非IE
        }else{
            e.returnValue=false;        //IE
        }
    },
    remove:function (el) {           //函数方法删除子元素
        let toRemove=document.querySelector(el);
        toRemove.parentNode.removeChild(toRemove);
    },
    clearCls:function (els,className) {     //清空部分class
        for (let i=0;i<els.length;i++){
            if (els[i].classList.contains(className)){  //查询是否存在要删除的class的名字
                els[i].classList.remove(className);
            }
        }
    },
    getScroll:function (obj) {      //获取obj超出的大小,获取滚动条距离
        let top = 0;
            let left = 0;
            if (obj == document) {   //算窗口冒出去的距离
                top = obj.body.scrollTop || obj.documentElement.scrollTop;
                left = obj.body.scrollLeft || obj.documentElement.scrollLeft;
            } else {     //非窗口
                top = obj.scrollTop;
                left = obj.scrollLeft
            }
            return {
                left: left,
                top: top
            }
    },
    getWinWH:function () {       //窗口的高宽，不包含滚动条的窗口可视区的高宽
        let width=document.documentElement.offsetWidth||document.body.offsetWidth;
        let height=document.documentElement.offsetHeight||document.body.offsetHeight;
        return {width,height}
    },
    getWinInnerWH:function () {       //窗口的高宽，包含滚动条的窗口可视区
        let width=window.innerWidth;
        let height=window.innerHeight;
        return {width,height}
    },
    getDocWH:function () {          //文档的高宽
        let width=document.documentElement.scrollWidth||document.body.scrollWidth;
        let height=document.documentElement.scrollHeight||document.body.scrollHeight;
        return {width,height}
    }
}