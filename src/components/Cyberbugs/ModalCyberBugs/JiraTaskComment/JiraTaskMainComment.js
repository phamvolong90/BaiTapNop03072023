import React, {useEffect} from 'react';
import { withFormik } from 'formik';
import { Editor } from '@tinymce/tinymce-react';
import { connect } from 'react-redux';
import { sgaJiraDetailModalPostNewComment } from '../../../../redux/actions/JiraDetailModalSagaActions';
import { actJiraDetailModalDisplayMainCommentEditor, actJiraDetailModalHideMainCommentEditor } from '../../../../redux/actions/JiraDetailCommentActions';
import {
    SGA_JIRA_DETAIL_MODAL_GET_ALL_COMMENT_BY_TASKID
} from "../../../../redux/constant/Cyberbugs/JiraDetailCommentsConsts";

function JiraTaskMainComment(props) {

    const { userData } = props.JiraUserLoginedReducer.loginedData;
    const {
        errors,
        handleSubmit,
        setFieldValue,
        visibleMainCommentEditor,
        dispatch
    } = props;


    const handleEditorChange = (content, editor) => setFieldValue('contentComment', content);
    const renderMainCommentEditor = () => {
        const normalJsx = (
            <div className="row contaner-fluid p-0">
                <div className="col-1 px-0 text-center">
                    <img className="w-75 rounded-circle" src={userData?.avatar} alt={userData?.avatar} />
                </div>
                <div className="col-10 ps-1">
                    <textarea className="form-control mb-1" placeholder="Leave a comment here..." style={{ height: 45, resize: 'none', cursor: 'pointer' }} onClick={() => dispatch(actJiraDetailModalDisplayMainCommentEditor())} />
                    <p><span className="fw-bold">Pro tip:</span> press <span className="fw-bold bg-warning px-1 rounded">M</span> to comment</p>
                </div>
            </div>
        );
        const EditorJsx = (
            <form className="row contaner-fluid p-0" onSubmit={handleSubmit}>
                <div className="col-1 px-0 text-center">
                    <img className="w-75 rounded-circle" src={userData?.avatar} alt={userData?.avatar} />
                </div>
                <div className="col-10 ps-1">
                    <Editor
                        name="contentComment"
                        init={{
                            height: 170,
                            menubar: true,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
                        }}
                        onEditorChange={handleEditorChange}
                    />
                    {errors.contentComment && <div className="text-danger" id="feedback">{errors.contentComment}</div>}
                    <div className="col-12">
                        <button className="btn btn-sm btn-primary m-2" type="submit" onSubmit={handleSubmit}>Comment</button>
                        <button className="btn btn-sm btn-danger" onClick={() => dispatch(actJiraDetailModalHideMainCommentEditor())}>Cancel</button>
                    </div>
                </div>
            </form>
        );
        return visibleMainCommentEditor ? EditorJsx : normalJsx;
    };

    return (
        <>
            {renderMainCommentEditor()}
        </>
    )
};

const JiraTaskCommentFormik = withFormik({
    mapPropsToValues: () => ({ contentComment: '' }),

    // Custom sync validation
    validate: values => {
        const errors = {};

        if (!values.contentComment) {
            errors.contentComment = '*comment content is required!';
        }

        return errors;
    },

    handleSubmit: (values, { setSubmitting, props }) => {
        console.log('submit')
        const { dispatch, taskId } = props;
        dispatch(sgaJiraDetailModalPostNewComment({ taskId, contentComment: values.contentComment }));
        dispatch(actJiraDetailModalHideMainCommentEditor());
    },
    displayName: 'Post new comment',
})(JiraTaskMainComment);

const mapStateToProps = state => ({
    JiraUserLoginedReducer: state.JiraUserLoginedReducer,
    visibleMainCommentEditor: state.JiraDetailTaskCommentReducer.visibleMainCommentEditor
})

export default connect(mapStateToProps)(JiraTaskCommentFormik);