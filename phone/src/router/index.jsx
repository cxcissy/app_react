import {Switch,Route} from 'react-router-dom'
import Items from './items'
const Main=(props)=>{
    return(
        <Switch>
            {
                Items.map(el=>{
                   return <Route path={el.path}
                      exact={el.exact}
                      component={el.component}
                      key={el.id}
                   />
                })
            }
            <Route path="*" component={()=><h3>你访问的页面不存在</h3>}/>
        </Switch>
    )
}
export default Main
