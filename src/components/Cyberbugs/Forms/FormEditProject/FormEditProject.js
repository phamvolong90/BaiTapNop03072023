import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import * as Yup from "yup";

function FormEditProject(props) {
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );
  const dispatch = useDispatch();
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setFieldValue,
  } = props;
  // const submitForm = (e) => {
  //     e.preventDefault();
  //     alert('submit edit');
  // }

  //componentdidmount
  useEffect(() => {
    //Gọi api load project category
    dispatch({ type: "GET_ALL_PROJECT_CATEGORY_SAGA" });
    //Load sự kiện submit lên drawer = nút submit
    dispatch({ type: "SET_SUBMIT_EDIT_PROJECT", submitFunction: handleSubmit });
  }, []);
  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };
  return (
    <form className="container-fuild" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project id</p>
            <input
              value={values.id}
              disabled
              className="form-control"
              name="id"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project name</p>
            <input
              value={values.projectName}
              className="form-control"
              name="projectName"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Category</p>
            <select
              className="form-control"
              name="categoryId"
              value={values.categoryId}
            >
              {arrProjectCategory?.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Description</p>
            <Editor
              name="description123"
              initialValue={values.description}
              value={values.description}
              init={{
                selector: "textarea#myTextArea",
                height: 500,
                menubar: false,
                plugins:
                  "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss",
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              }}
              onEditorChange={handleEditorChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
const EditProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectEdit } = props;
    return {
      id: projectEdit?.id,
      projectName: projectEdit.projectName,
      description: projectEdit.description,
      categoryId: projectEdit.categoryId,
    };
  },
  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    //Khi người dùng bấm submit => đưa dữ liệu về backend thông qua api
    // const action = {
    //     type:'UPDATE_PROJECT_SAGA',
    //     prjectUpdate:values
    // }
    //Gọi saga
    // console.log('values',values)
    props.dispatch({
      type: "UPDATE_PROJECT_SAGA",
      prjectUpdate: values,
    });
  },
  displayName: "EditProjectForm",
})(FormEditProject);
const mapStateToProps = (state) => ({
  projectEdit: state.ProjectReducer.projectEdit,
});
export default connect(mapStateToProps)(EditProjectForm);
