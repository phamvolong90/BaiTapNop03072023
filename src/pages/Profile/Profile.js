import React from 'react'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
export default function Profile(props) {
    //Demo bảo mật trang Profile đơn giản nhất
    //Nếu đăng nhập thành công thì mới load trang Profile
    if (localStorage.getItem('userLogin')) {
        return (
            <div>
                Profile
            </div>
          )
    //Nếu không Login mà gõ link http://localhost:3000/profile thì ko load trang Profile.
    } else {
        alert ('Please log in ');
        return <Redirect to ="./login"/>
    }
}
