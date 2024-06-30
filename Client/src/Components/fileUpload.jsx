import { useState } from 'react';
import './CSS/uploader.css';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';

function Uploader({ onFileSelect }) {
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState("No selected file");

    return (
        <main style={{ display: "flex", flexDirection: "column", alignItems: "flexEnd" }}>
            <form
                onClick={() => document.querySelector(".input-field").click()}
            >
                <input type="file" accept='image/*' className='input-field' hidden
                    onChange={({ target: { files } }) => {
                        if (files[0]) {
                            setFileName(files[0].name);
                            setImage(URL.createObjectURL(files[0]));
                            onFileSelect(files[0]);
                        }
                    }}
                />

                {image ?
                    <p>{fileName}</p>
                    :
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <MdCloudUpload color='#1475cf' size={40} />
                        <p style={{ marginLeft: "20px" }}>Browse Files to upload</p>
                    </div>
                }
            </form>

            {image && (
                <section className='uploaded-row'>
                    <AiFillFileImage color='#1475cf' />
                    <span className='upload-content'>
                        {fileName} -
                        <MdDelete
                            onClick={() => {
                                setFileName("No selected File");
                                setImage(null);
                                onFileSelect(null);
                            }}
                        />
                    </span>
                </section>
            )}
        </main>
    );
}

export default Uploader;
