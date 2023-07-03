import React from "react";
import { Button, Input } from "antd";
import { withFormik,Formik,} from "formik";
import * as Yup from 'yup';
import {connect} from "react-redux";
import { signinCyberbugAction } from "../../../redux/actions/CyberBugsAction";

function LoginCyberBugs(props) {
  const { values, touched, errors, handleChange, handleSubmit, handleBlur } =
    props;
  return (
    <div style={{ paddingTop: "200px" }}>
      <h2 className="text-center pb-2">
        Welcome to Cyber Bugs - Jira Clone 
      </h2>
      <h3 className="text-center pb-2">Please login your account</h3>
      <form onSubmit={handleSubmit} className="container" >
    <div className='d-flex flex-column justify-content-center align-items-center' >
      <div className='d-flex mt-3 justify-content-center align-items-center '>
        <h4 className="mr-2">Email:</h4>
        <Input onChange={handleChange} style={{width:'100%', minWidth:300}} name ="email" placeholder="email"/>
      </div>
      <div className='text-danger'>{errors.email}</div>
      <div className='d-flex mt-3 justify-content-center align-items-center '>
      <h4 className="mr-2">Password:</h4>
        <Input onChange={handleChange} style={{width:'100%', minWidth:300}} name ="password" placeholder="password" type="password" />
      </div>
      <div className='text-danger'>{errors.password}</div>
      <Button htmlType="submit" className="mt-3" size="large" style={{minWidth:200, backgroundColor: 'rgb(102,117,223', color:'#fff'}} >Login</Button>
    </div>
    
      </form>
      <div className="social text-center mt-3 ">
        <span className="mr-3">
          <i
            className="fab fa-facebook"
            style={{ color: "rgb(59,89,152)", fontSize: 25 }}
          ></i>
        </span>
        
        <span>
          <i
            className="fab fa-google"
            style={{ color: "rgb(59,89,152)", fontSize: 24 }}
          ></i>
        </span>
      </div>
    </div>
  );
}

//Thư viện Formik: tạo ra 1 HOC nhận vào LoginCyberBug trả ra LoginCyberBug chứa thuộc tính Formik
const LoginCyberBugWithFormik = withFormik({
  //Điền vào các trường lấy dữ liệu
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  //Sử dụng thư viện Yup để Validation
  validationSchema: Yup.object().shape({
    email: Yup.string().required('Email is required!').email('email is invalid!'),
    password: Yup.string().min(6,'Password must have min 6 characters').max(32,'Password must have max 32 characters')
  }),
  handleSubmit: ({email,password}, {props, setSubmitting }) => {
    setSubmitting(true);
    props.dispatch(signinCyberbugAction(email,password, props.history));
  },
  // displayName: "Welcome to Cyber Bugs - Jira Clone",
})(LoginCyberBugs);
//Lấy redux bọc component LoginCyberBugWithFormik lại thì nó tạo ra được props đưa lên redux
export default connect() (LoginCyberBugWithFormik);
