import React from 'react'
import { Link } from 'react-router-dom'

// const DataTable = ({ columns, data, actions }) => {
//   return (
//     <div>
//       <table className='full-width'>
//         <thead>
//           <tr>
//             {columns.map((column) => {
//               <th key={column.field}>{column.header}</th>
//             })}
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item) => (
//             <tr key={item.id}>
//               {columns.map((column) => {
//                 <td key={column.field}>
//                   {column.render ? column.render(item[column.field]) : item[column.field]}
//                 </td>

//               })}
//               {/* <td>{accomm.Accommodation_Title}</td>
//               <td><img src={`../../upload/${accomm.Accommodation_Img}`} alt="" /></td>
//               <td>{accomm.Accommodation_Type}</td>
//               <td className='description' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(accomm.Accommodation_Desc) }}></td>
//               <td>{accomm.Accommodation_Cap}</td>
//               <td>{accomm.Accommodation_Price}</td>
//               <td>{accomm.Accommodation_Unit}</td> */}
//               <td>
//                 <div className="crud-btn">
//                   {actions.map((action, index) => (
//                     <React.Fragment>
//                       {
//                         action.type === 'Link' ? (
//                           <Link to={action.url(item)}>{action.label}</Link>
//                         ) : (
//                           <button onClick={() => action.onClick(item)}>{action.label}</button>
//                         )
//                       }
//                     </React.Fragment>
//                   ))}

//                 </div>
//                 {/* <div className='crud-btn'>
//                   <button>View</button>
//                   <Link state={accomm} to={`/dashboard/accommodation-menu/write?edit=${accomm.Accommodation_Id}`}><button>Update</button></Link>
//                   <button onClick={() => handleDelete(accomm.Accommodation_Id)}>Delete</button>
//                 </div> */}
//               </td>
//             </tr>))}
//         </tbody>
//       </table>
//     </div>
//   )
// }
// const handleUpdate = (item) => {

//   history.push(`${editRoute}?edit=${item.id}`)
 
//   console.log('Updating item:', item);
 
//   if (updateData) {
//     updateData(item);
//   }
// };


// const DataTable = ({ columns, data, actions, updateData, editRoute }) => {
//   return (
//     <>
//       <table className='full-width'>
//         <thead>
//           <tr>
//             {columns.map((column) => (
//               <th key={column.field}>{column.header}</th>
//             ))}
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => (
//             <tr key={index}>
//               {columns.map((column) => (
//                 <td key={column.field}>
//                   {column.render ? column.render(item[column.field]) : item[column.field]}
//                 </td>
//               ))}
//               <td>
//                 <div className='crud-btn'>
//                   {actions.map((action, actionIndex) => (
//                     <React.Fragment key={actionIndex}>
//                       {typeof action.onClick === 'function' ? (
//                         <button onClick={() => action.onClick(item)}>{action.label}</button>
//                       ) : action.type === 'Link' ? (
//                         <Link to={action.url(item)}><button>{action.label}</button></Link>
//                       ) : action.type === 'Update' ? (
//                         <button onClick={() => handleUpdate(item)}>{action.label}</button>
//                       ) : (
//                        <span>{action.label}</span>
//                       )}
//                     </React.Fragment>
//                   ))}
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default DataTable


const DataTable = ({ columns, data, onEdit, onDelete }) => {
 

  const handleEdit = (item) => {
    if (onEdit) {
      onEdit(item);
    }
  };

  const handleDelete = (item) => {
    if (onDelete) {
      onDelete(item);
    }
  };

  return (
    <table className="full-width">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.field}>{column.header}</th>
          ))}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.field}>
                {column.render ? column.render(item[column.field]) : item[column.field]}
              </td>
            ))}
            <td>
              <div className="crud-btn">
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item)}>Delete</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
