import React from 'react';
import { withFormik } from 'formik';
import { Editor } from '@tinymce/tinymce-react';
import ReactHtmlParser from "html-react-parser";
import { connect } from 'react-redux';
import { sgaJiraDetailModalDeleteComment, sgaJiraDetailModalUpdateComment } from '../../../../redux/actions/JiraDetailModalSagaActions';
import { actJiraDetailModalDisplayEditCommentEditor, actJiraDetailModalHideEditCommentEditor } from '../../../../redux/actions/JiraDetailCommentActions';

function JiraTaskCommentItem(props) {
    const {
        errors,
        handleSubmit,
        setFieldValue,
        commentData,
        dispatch,
        userData,
        editBtnEditorData
    } = props;

    const renderActionButton = (commentId) => {
        const jsxActionButton = (
            <p className="fw-bold">
                <span className="text-success jiraComment__action" onClick={() => {
                    dispatch(actJiraDetailModalDisplayEditCommentEditor(commentId));
                    setFieldValue('contentComment', commentData.contentComment);
                }}
                >Edit</span>
                <i className="fas fa-circle mx-1" style={{ fontSize: 3, verticalAlign: 'middle' }} />
                <span className="text-danger jiraComment__action" onClick={() => dispatch(sgaJiraDetailModalDeleteComment(commentData.id))}>Delete</span>
            </p>
        );
        return userData?.id === commentData.userId ? jsxActionButton : '';
    };

    const handleEditorChange = (content, editor) => setFieldValue('contentComment', content);

    const renderEditorCondition = () => {
        const jsxWithEditor = (
            <form onSubmit={handleSubmit}>
                <Editor
                    name="contentComment"
                    initialValue={commentData.contentComment}
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
                { errors.contentComment && <div className="text-danger" id="feedback">{errors.contentComment}</div>}
                <div className="col-12">
                    <button className="btn btn-sm btn-primary m-2" type="submit" onSubmit={handleSubmit}>Update</button>
                    <button className="btn btn-sm btn-danger" onClick={() => dispatch(actJiraDetailModalHideEditCommentEditor())}>Cancel</button>
                </div>
            </form>
        );
        const jsxNormal = (
            <>
                {ReactHtmlParser(commentData.contentComment)}
                {renderActionButton(commentData.id)}
            </>
        );
        return commentData.id === editBtnEditorData.commentId ? jsxWithEditor: jsxNormal;
    }

    const renderCommentData = () => {
        const jsxNormal = (
            <div className="row contaner-fluid p-0 mt-3">
                <div className="col-1 px-0 text-center">
                    <img className="w-75 rounded-circle" src={commentData.user.avatar} alt={commentData.user.avatar} />
                </div>
                <div className="col-10 ps-1">
                    <p className="fw-bold mb-1">{commentData.user.name} <span className="fw-normal fst-italic ms-2">{commentData.id + 1} hours ago</span></p>
                    {ReactHtmlParser(commentData.contentComment)}
                    {renderActionButton(commentData.id)}
                </div>
            </div>
        );
        const jsxEditor = (
            <div className="row contaner-fluid p-0 mt-3">
                <div className="col-1 px-0 text-center">
                    <img className="w-75 rounded-circle" src={commentData.user.avatar} alt={commentData.user.avatar} />
                </div>
                <div className="col-10 ps-1">
                    <p className="fw-bold mb-1">{commentData.user.name} <span className="fw-normal fst-italic ms-2">{commentData.id + 1} hours ago</span></p>
                    {renderEditorCondition()}
                </div>
            </div>
        );
        return editBtnEditorData.visibleEditBtnEditor ? jsxEditor : jsxNormal;
    };

    return (
        <>
            {renderCommentData()}
        </>
    )
}

const JiraTaskCommentItemFormik = withFormik({
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
        const {commentData, dispatch} = props;
        dispatch(sgaJiraDetailModalUpdateComment({ id: commentData.id, contentComment: values.contentComment }));
        dispatch(actJiraDetailModalHideEditCommentEditor());
    },
    displayName: 'Post new comment',
})(JiraTaskCommentItem);
const mapStateToProps = state => ({
    userData: state.JiraUserLoginedReducer.loginedData.userData,
    editBtnEditorData: state.JiraDetailTaskCommentReducer.editBtnEditorData
})
export default connect(mapStateToProps)(JiraTaskCommentItemFormik);