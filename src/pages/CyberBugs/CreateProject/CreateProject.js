import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect, useSelector, useDispatch } from "react-redux";
import { GET_ALL_PROJECT_CATEGORY_SAGA } from "../../../redux/constant/Cyberbugs/Cyberbugs";

function CreateProject(props) {
  //Lấy dữ liệu từ Redux (ProjectCategoryReducer.js) về component.
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );
  console.log("ket qua", arrProjectCategory);
  const dispatch = useDispatch();
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues, //Set 1 object
    setFieldValue, //Set 1 trường dữ liệu
  } = props;
  //Gọi API để lấy dữ liệu thẻ select khi vừa load trang
  useEffect(() => {
    //Dispatch lên action Saga > ProjectCategorySaga.js
    dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA });
  }, []);
  // Formik sử dụng lệnh setFieldValue để lấy giá trị bên ngoài hàm Formik (Thư viện TinyMCE)
  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
    console.log(props)
  };
  return (
    <div className="container m-5">
      <h3>CreateProject</h3>
      <form
        className="container"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <p>Name</p>
          <input className="form-control" name="projectName" />
        </div>
        <div className="form-group">
          <p>Description</p>
          <Editor
            name="description"
            init={{
              height: 500,
              menubar: false,
              selector: "textarea#myTextArea",
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
                          alignleft aligncenter alignright alignjustify | \
                          bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
        <div className="form-group">
          <select
            name="categoryId"
            className="form-control"
            onChange={handleChange}
          >
            {arrProjectCategory.map((item, index) => {
              return (
                <option value={item.id} key={index}>
                  {item.projectCategoryName}
                </option>
              );
            })}
          </select>
        </div>
        <button className="btn btn-outline-primary" type="submit">
          Create Project
        </button>
      </form>
    </div>
  );
}
const createProjectForm = withFormik({
  // enableReinitialize: mỗi lần render lại từ Redux thì yêu cầu mapPropsToValues lặp lại
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    console.log("propvalue", props);
    return {
      projectName: "",
      description: "",
      //Lấy giá trị đầu tiên của arrProjectCategory làm giá trị mặc định
      // ý nghĩa dấu ?: nếu có thì lấy id, nếu không có thì trả về undefined.
      categoryId: props.arrProjectCategory[0]?.id,
    };
  },
  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    //Gửi data về Back End
    console.log('props',values)
    props.dispatch({
      type: "CREATE_PROJECT_SAGA",
      newProject: values,
    });
  },
  displayName: "CreateProjectFormik",
})(CreateProject);
//Hàm lấy data từ Reducer, do createProjectForm viết dưới dạng HOC Formik nên không thể dùng useSelector.
const mapStateToProps = (state) => {
  return {
    arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory,
  };
};

export default connect(mapStateToProps)(createProjectForm);
