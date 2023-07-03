
import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { Layout,} from 'antd';
const {  Sider, Content } = Layout;

export const UserLoginTemplate = (props) => {
    
    const [{width,height},setSize] = useState ({width:Math.round(window.innerWidth), height:Math.round(window.innerHeight)});
    //Chỉ sửa giao diện 1 lần đầu load trang => component did mount
    useEffect (()=> {
        window.onresize= () => {
            setSize ({
                width: Math.round(window.innerWidth),
                height: Math.round(window.innerHeight),
            })
        }
    },[])
    let {Component, ...restRoute } = props;
    // {...restRoute} là exact path name 
    return <Route {...restRoute} render =  {(propsRoute)=> {
        return<>
            <Layout>
                <Sider width={width/2} style={{height:height, backgroundImage:'url(/img/love1.jpg', backgroundSize:'100%'}}></Sider>
                <Content>
                {/*...propsRoute Truyền các thuộc tính từ Route vào component  */}
                <Component {...propsRoute}/>
                </Content>
            </Layout>
        </>
    }}/>
} 