// import React, { useState } from 'react'

// const EditableText = ({initialContent}) => {

//     const [isEditable, setIsEditable] = useState(false);
//     const [content, setContent] = useState(initialContent);

//     const handleContentClick = () => {
//         setIsEditable(true);
//     };

//     const handleContentBlur = () => {
//         setIsEditable(false);
//     };

//     const handleContentChange = (event) => {
//         setContent(event.target.textContent);
//     };

//   return (
//     <div>
//        <h1 contentEditable={isEditable}
//        onClick={handleContentClick}
//        onBlur={handleContentBlur}
//        onInput={handleContentChange}>
//         {content}
//        </h1>
//     </div>
//   )
// }

// export default EditableText
