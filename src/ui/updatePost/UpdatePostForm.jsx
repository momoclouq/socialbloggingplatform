import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import NormalLoader from "../../components/loader/NormalLoader";
import ErrorMessage from "../../components/typo/error-message/ErrorMessage";
import FormLabel from "../../components/typo/form-label/FormLabel";
import { hasErrorUpdatePost, isUpdatingPost, selectErrorMessage, selectUpdatePostSuccess, turnOffUpdatePostSuccess } from "../../features/slices/post/managePostSlice";

const UpdatePostForm = ({post, submitAction}) => {
    const [titleVal, setTitleVal] = useState(post.title);
    const [subtitleVal, setSubtitleVal] = useState(post.subtitle);

    const updatingPost = useSelector(isUpdatingPost);
    const errorUpdatePost = useSelector(hasErrorUpdatePost);
    const errorMessage = useSelector(selectErrorMessage);
    const updatePostSuccessState = useSelector(selectUpdatePostSuccess);
    const dispatch = useDispatch();


    const editorRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        let published = event.target.published.value === "true" ? true : false;

        let data = {
            title: event.target.title.value,
            subtitle: event.target.subtitle.value,
            content: editorRef.current.getContent(),
            published: published
        }

        submitAction(data);
    }

    const onChangeTitle = (e) => {
        setTitleVal(e.target.value);
    }

    const onChangeSubtitle = (e) => {
        setSubtitleVal(e.target.value);
    } 

    useEffect(() => {
        if(editorRef.current) editorRef.current.setContent(post.content);
    }, [editorRef.current])

    useEffect(() => {
        setTimeout(() => {
            dispatch(turnOffUpdatePostSuccess());
        }, 2000);
    }, [updatePostSuccessState])

    return(
        <form className="mt-3" onSubmit={handleSubmit}>
            {
                updatingPost ? <NormalLoader message="Updating post"/> : ""
            }
            {
                errorUpdatePost ? <ErrorMessage error={errorMessage}/> : ""
            }
            {
                updatePostSuccessState ? <div className="box has-background-success">Post updated</div> : ""
            }
            <div className="title">Update the post</div>
            <div className="field">
                <FormLabel text="Title"/>
                <div className="control">
                    <input className="input is-medium is-link" name="title" onChange={onChangeTitle} type="text" value={titleVal}/>
                </div>
            </div>

            <div className="field">
                <FormLabel text="Subtitle"/>
                <div className="control">
                    <input className="input is-medium is-link" name="subtitle" onChange={onChangeSubtitle} type="text" value={subtitleVal} />
                </div>
            </div>

            <div className="field">
                <FormLabel text="Content" />
                <Editor
                    apiKey="utyf2dgcuevdc7238kyr6hiikehbsxqcu5nos9r1aa0t6ddv"
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue="<p>This is the initial content of the editor.</p>"
                    init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
            </div>

            <div className="field">
                <div className="select is-primary">
                    <select name="published">
                        <option value="true">Published</option>
                        <option value="false">Private</option>
                    </select>
                </div>
            </div>
           
            <div className="is-flex is-justify-content-flex-end is-align-content-center">
                <button className="button is-success">Update post</button>
            </div> 
        </form>
    )
}

export default UpdatePostForm;