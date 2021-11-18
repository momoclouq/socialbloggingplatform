import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import FormLabel from "../../components/typo/form-label/FormLabel";

const CreatePostForm = ({submitAction}) => {
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

    return (
        <form className="mt-3" onSubmit={handleSubmit}>
            <div className="field">
                <FormLabel text="Title"/>
                <div className="control">
                    <input className="input is-medium is-link" name="title" type="text" placeholder="The title of the post" />
                </div>
            </div>

            <div className="field">
                <FormLabel text="Subtitle"/>
                <div className="control">
                    <input className="input is-medium is-link" name="subtitle" type="text" placeholder="anything" />
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
                <button className="button is-success">Create post</button>
            </div> 
        </form>
    )
}


export default CreatePostForm;