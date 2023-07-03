import React from 'react'
import { useDispatch } from 'react-redux'
import Login from '../Login/Login';
import Register from '../Register/Register';
import SlideDown from '../../HOC/Modal/SlideDown';
export default function DemoHOCModal() {
    //Khai báo dưới dạng thẻ
    const LoginWithSlideDown = new SlideDown(Login);
    // Khai báo dưới dạng thẻ: const RegisterWithSlideDown = new SlideDown(Register);
    //Khai báo dưới dạng function:
    const RegisterWithSlideDown = function () {return new SlideDown(Register) }
    const dispatch = useDispatch();
  return (
    <div className='p-5'>      
    <button
      type="button"
      className="btn btn-primary btn-lg"
      data-toggle="modal"
      data-target="#modelId"
      onClick={ () => {
        dispatch ({
            type: 'OPEN_FORM',
            Component: <Login/>
        })}}> Đăng Nhập
    </button>
    <div className='pt-3'>
    <button
      type="button"
      className="btn btn-primary btn-lg"
      data-toggle="modal"
      data-target="#modelId"
      onClick={ () => {
        dispatch ({
            type: 'OPEN_FORM',
            Component: <Register/>
        })}} >Đăng ký
    </button>
    {/* Khai báo LoginWithSlideDown dưới dạng 1 object chứ ko phải 1 component vì component SlideDown return về 1 thẻ div  */}
    {LoginWithSlideDown}
    {/* {RegisterWithSlideDown} */}
    {/* Khai báo dưới dạng 1 component  */}
    <RegisterWithSlideDown/>
    </div>
    </div>
  )}
