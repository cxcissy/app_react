import Face from '../face'
import Target from '../target'
import Home from "../home";
import Search from "../search";
import Detail from "../detail";
import AudioPlay from '../audioPlay'
import Register from '../register'
import Login from "../login";
import VideoPlay from "../videoPlay";
import Comment from "../comment";
const Items=[
    {id:1,path:'/',exact:true,component:Face},
    {id:2,path:'/target',exact:true,component:Target},
    {id:3,path:'/home',exact:false,component:Home},
    {id:4,path:'/search',exact:false,component:Search},
    {id:5,path:'/detail/:id',exact:false,component:Detail},
    {id:6,path:'/audioPlay/:id/:playTime',exact:false,component:AudioPlay},
    {id:7,path:'/register',exact:false,component:Register},
    {id:8,path:'/login',exact:false,component:Login},
    {id:9,path:'/videoPlay/:id/:playTime',exact:true,component:VideoPlay},
    {id:10,path:'/comment/:id',exact:false,component:Comment},
]
export default Items
