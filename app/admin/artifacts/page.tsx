
// // Full View
// "use client";
// import { LoadingSpinner } from '@/app/components/LoadingSpinner';
// import { AddModal, DeleteModal, EditModal } from '@/app/components/Modal';
// import { artifactAction } from '@/app/actions/artifactAction';
// import { useState, useEffect } from 'react';
// import { Alert } from '@/app/components/Alert';

// export default function ManagerArtifactsPage() {
//     const [query, setQuery] = useState('');
//     const [deleteArtifact, setDeleteArtifact] = useState<number | null>(null);
//     const [editArtifact, setEditArtifact] = useState<number | null>(null);
//     const [getArtifacts, setGetArtifacts] = useState<any[]>([]);
//     const fillteredArtifacts = getArtifacts.filter(item =>
//         item.title?.toLowerCase().includes(query.toLowerCase()) || item.art_style?.toLowerCase().includes(query.toLowerCase()) ||
//         item.material?.toLowerCase().includes(query.toLowerCase()) || item.id?.toString().includes(query)
//     )
//     //Modal
//     const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);

//     // Form Fields
//     const [title, setTitle] = useState('');
//     const [artStyle, setArtStyle] = useState('');
//     const [location, setLocation] = useState('');
//     const [locationFound, setLocationFound] = useState('');
//     const [description, setDescription] = useState('');
//     const [imageFile, setImageFile] = useState<File | null>(null);
//     const [material, setMaterial] = useState('');
//     // Edit
//     const [editTitle, setEditTitle] = useState('');
//     const [editArtStyle, setEditArtStyle] = useState('');
//     const [editLocation, setEditLocation] = useState('');
//     const [editLocationFound, setEditLocationFound] = useState('');
//     const [editDescription, setEditDescription] = useState('');
//     const [editImageFile, setEditImageFile] = useState<File | null>(null);;
//     const [editMaterial, setEditMaterial] = useState('');
//     // Clear Form
//     const clearForm = () => {
//         setTitle('');
//         setArtStyle('');
//         setLocation('');
//         setLocationFound('');
//         setDescription('');
//         setImageFile(null);
//         setMaterial('');
//     }
//     const [loadingAdd, setLoadingAdd] = useState(false);
//     const [loadingSave, setLoadingSave] = useState(false);
//     const [loadingTable, setLoadingTable] = useState(true);
//     const [message, setMessage] = useState('');
//     const [messageType, setMessageType] = useState<'success' | 'error' | 'info' | 'nothing'>('nothing');

//     // ################## Get all artifacts จาก Action ##################
//     useEffect(() => {
//         const loadArtifacts = async () => {
//             setLoadingTable(true);
//             try {
//                 const data = await artifactAction.getAllArtifacts();
//                 setGetArtifacts(data);
//             } catch (error) {
//                 console.error('Failed to load artifacts:', error);
//             } finally {
//                 setLoadingTable(false);
//             }
//         };
//         loadArtifacts();
//     }, []);

//     // ################## Handlers ##################
//     const embedding = async () => {
//         if (loadingTable) return;
//         try {
//             setLoadingTable(true);
//             const result = await artifactAction.embeddingAction();
//             if (result?.success) {
//                 setMessageType("success");
//                 setMessage(result?.success);
//                 // ตรงนี้ถ้าใช้ Server Action ระบบจะ Revalidate หน้าให้อัตโนมัติอยู่แล้ว
//             } else {
//                 setMessageType("info");
//                 setMessage(result?.message);
//             }
//         }
//         catch (error) {
//             setMessage(`Failed to Embedding:${error}`);
//             setMessageType('error');
//         } finally {
//             setLoadingTable(false);
//         }
//         console.log(messageType);
//     }

//     const handleEdit = async (item: any, e: React.FormEvent) => {
//         e.stopPropagation();
//         setEditArtifact(item.id);

//         // เมื่อกด edit ให้เอาข้อมูลของ item ที่กดมาใส่ใน state ของ form edit เพื่อให้แสดงใน modal
//         setEditTitle(item.title || '');
//         setEditArtStyle(item.art_style || '');
//         setEditLocation(item.location || '');
//         setEditLocationFound(item.location_found || '');
//         setEditDescription(item.description || '');
//         setEditImageFile(item.image_file || null);
//         setEditMaterial(item.material || '');

//         setIsEditModalOpen(true);
//     }
//     const saveEdit = async () => {
//         if (editArtifact === null) return;

//         setLoadingSave(true);
//         try {
//             const formData = new FormData();

//             formData.append('title', editTitle);
//             formData.append('description', editDescription);
//             formData.append('material', editMaterial);
//             formData.append('art_style', editArtStyle);
//             formData.append('location', editLocation);
//             formData.append('location_found', editLocationFound);
//             // ตรวจสอบว่า editImageFile เป็น File Object หรือไม่ (ถ้าผู้ใช้เลือกไฟล์ใหม่)
//             if (editImageFile instanceof File) {
//                 formData.append("image_file", editImageFile);
//             }
//             //editArtifact(id, data)
//             const response = await artifactAction.editArtifact(editArtifact, formData);
//             // หยิบ item มาไล่ดูทีละชื้นว่าตรงกับ id ที่ต้องการไหม ถ้าตรงก็ทับข้อมูลใหม่ไปเลย : ไม่ตรงก็คืนค่าเดิมกลับไป
//             const updatedItem = response.data[0];
//             setGetArtifacts(prev => prev.map(item => item.id === editArtifact ? { ...item, ...updatedItem } : item));
//             setIsEditModalOpen(false);
//             setEditArtifact(null);
//         }
//         catch (error) {
//             console.error('Failed to save edit:', error);
//         } finally {
//             setLoadingSave(false);
//         }

//     }

//     const handleDelete = async (id: number, e: React.FormEvent) => {
//         // หยุดการกระจายของ event เพื่อไม่ให้เกิดการทำงานอื่นๆ ที่ไม่ต้องการ (เช่น การเปิด modal ซ้อนกัน)
//         e.stopPropagation()
//         setIsDeleteModalOpen(true);
//         // เก็บ ID ของ item ที่ต้องการลบไว้ใน state เพื่อใช้ในการยืนยันการลบ
//         setDeleteArtifact(id);
//     }

//     const confirmDelete = async () => {
//         if (deleteArtifact !== null) {
//             try {
//                 await artifactAction.deleteArtifact(deleteArtifact);
//                 // อัปเดต UI หลังลบสำเร็จ
//                 setGetArtifacts(prev => prev.filter(item => item.id !== deleteArtifact))
//                 setIsDeleteModalOpen(false);
//                 setDeleteArtifact(null);
//             } catch (error) {
//                 console.error('Failed to delete artifact:', error);
//             }
//         }
//     }

//     const handleAdd = async (e: React.FormEvent) => {
//         // ป้องกันการรีเฟรชหน้าเมื่อ submit form
//         e.preventDefault();
//         setIsAddModalOpen(true)
//     }

//     const add = async () => {
//         setLoadingAdd(true);
//         setMessage('');
//         try {
//             const formData = new FormData();
//             // 1. ใส่ข้อมูล Text ทั่วไป
//             formData.append('title', title);
//             formData.append('description', description);
//             formData.append('material', material);
//             formData.append('art_style', artStyle);
//             formData.append('location', location);
//             formData.append('location_found', locationFound);
//             if (imageFile) {
//                 formData.append('image_file', imageFile);
//                 console.log("Attached file to FormData:", imageFile.name);
//             }
//             else {
//                 console.log("No file selected!");
//             }
//             await artifactAction.addArtifact(formData);

//             // Reset form
//             // setMessageType('success');
//             // setMessage('Artifact added successfully!');
//             clearForm();
//             //
//             const updatedData = await artifactAction.getAllArtifacts();
//             setGetArtifacts(updatedData);
//         } catch (error) {
//             setMessageType('error');
//             setMessage('An error occurred while adding the artifact.');
//         } finally {
//             setLoadingAdd(false);
//         }
//     }

//     return (
//         <main className="flex flex-col gap-10 min-h-screen bg-gradient-to-br from-slate-50 to-sky-100 p-6">
//             {/* Add Modal */}
//             {isAddModalOpen ? (<AddModal
//                 isLodading={loadingAdd}
//                 isOpen={isAddModalOpen}
//                 onClose={() => { setIsAddModalOpen(false); clearForm(); }}
//                 onConfirm={add}
//                 // message={message}
//                 // messageType={messageType}

//                 title={title}
//                 artStyle={artStyle}
//                 location={location}
//                 locationFound={locationFound}
//                 description={description}
//                 imageFile={imageFile}
//                 material={material}

//                 setTitle={setTitle}
//                 setArtStyle={setArtStyle}
//                 setLocation={setLocation}
//                 setLocationFound={setLocationFound}
//                 setDescription={setDescription}
//                 setImageFile={setImageFile}
//                 setMaterial={setMaterial}
//             />) : null}

//             {/* Edit Modal */}
//             {isEditModalOpen ? (<EditModal
//                 isLodading={loadingSave}
//                 isOpen={isEditModalOpen}
//                 onClose={() => setIsEditModalOpen(false)}
//                 onConfirm={saveEdit}
//                 itemName={getArtifacts.find(item => item.id === editArtifact)?.title || 'this artifact'}
//                 // ส่ง props ของข้อมูลที่ต้องการแก้ไขไปให้ EditModal เพื่อแสดงใน form และให้ user แก้ไข
//                 title={editTitle}
//                 artStyle={editArtStyle}
//                 location={editLocation}
//                 locationFound={editLocationFound}
//                 description={editDescription}
//                 imageFile={editImageFile}
//                 material={editMaterial}
//                 // ส่ง setState ไปให้ EditModal เพื่อให้สามารถแก้ไข state ของ form ได้จากภายใน Modal
//                 setTitle={setEditTitle}
//                 setArtStyle={setEditArtStyle}
//                 setLocation={setEditLocation}
//                 setLocationFound={setEditLocationFound}
//                 setDescription={setEditDescription}
//                 setImageFile={setEditImageFile}
//                 setMaterial={setEditMaterial}
//             />) : null}

//             {/* Delete Confirmation Modal */}
//             {isDeleteModalOpen ? (
//                 <DeleteModal
//                     isOpen={isDeleteModalOpen}
//                     onClose={() => setIsDeleteModalOpen(false)}
//                     onConfirm={confirmDelete}
//                     // หาชื่อ ID จาก getArtifacts เพื่อเปรียบเทียบกับ deleteArtifact แล้วเอาชื่อมาแสดงใน Modal
//                     itemName={getArtifacts.find(item => item.id === deleteArtifact)?.title || 'this artifact'}
//                 />
//             ) : null}

//             {/* ################## Artifacts Table ################## */}
//             <section className=" mx-auto w-full max-w-8xl rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-lg backdrop-blur-sm">
//                 <header className="mb-5">
//                     <h2 className="text-2xl font-bold text-slate-900">Artifacts Table</h2>
//                     <p className="text-sm text-slate-500">List of artifacts from the database.</p>
//                 </header>
//                 <div className=' gap-10 flex mb-5'>
//                     <button onClick={(e) => handleAdd(e)} className="cursor-pointer rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
//                         + Add Artifact
//                     </button>
//                     <input type="text"
//                         onChange={(e) => setQuery(e.target.value)}
//                         placeholder="Search artifacts..."
//                         className=" rounded-xl border border-slate-300 px-4 py-2 text-sm text-black outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200" />
//                     <div className='flex-1 flex justify-end'>
//                         <button disabled={loadingTable} onClick={async () => { await embedding(); setLoadingTable(false); }} className=' cursor-pointer rounded-md bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700'>
//                             🧠 Embedding</button>
//                     </div>

//                 </div>
//                 {messageType === 'info' ? (<Alert
//                     message={message}
//                     messageType={messageType} />) : null}

//                 {loadingTable ? (<LoadingSpinner />)
//                     : getArtifacts.length === 0 ? (<p className="text-sm text-slate-500">No artifacts found.</p>)
//                         : (<div className="overflow-x-auto">
//                             <table className="text-slate-900 w-full text-left text-sm border-collapse">
//                                 <thead>
//                                     <tr className="bg-slate-100">
//                                         <th className="px-4 py-2 border border-slate-200">ID</th>
//                                         <th className="px-4 py-2 border border-slate-200">Title</th>
//                                         <th className="px-4 py-2 border border-slate-200">Art Style</th>
//                                         <th className="px-4 py-2 border border-slate-200">Material</th>
//                                         <th className="px-4 py-2 border border-slate-200">Location Found</th>
//                                         <th className="px-4 py-2 border border-slate-200">Location</th>
//                                         {/* <th className="px-4 py-2 border border-slate-200">Description</th> */}
//                                         {/* <th className="px-4 py-2 border border-slate-200">Created</th> */}
//                                         <th className="px-4 py-2 border border-slate-200"></th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {/* ข้อมูลที่ค้นหาเจอ */}
//                                     {fillteredArtifacts.map((item, index) => (
//                                         <tr key={item.id || index} className="hover:bg-slate-50">
//                                             <td className="px-4 py-2 border border-slate-200">{item.id || '-'}</td>
//                                             <td className="px-4 py-2 border border-slate-200">{item.title || '-'}</td>
//                                             <td className="px-4 py-2 border border-slate-200">{item.art_style || '-'}</td>
//                                             <td className="px-4 py-2 border border-slate-200">{item.material || '-'}</td>
//                                             <td className="px-4 py-2 border border-slate-200">{item.location_found || '-'}</td>
//                                             <td className="px-4 py-2 border border-slate-200">{item.location || '-'}</td>
//                                             {/* <td className="px-4 py-2 border border-slate-200 max-w-xs truncate">{item.description || '-'}</td> */}
//                                             {/* <td className="px-4 py-2 border border-slate-200">{item.created_at ? new Date(item.created_at).toLocaleString() : '-'}</td> */}
//                                             <td className=" justify-center gap-4 flex px-4 py-2 border border-slate-200">
//                                                 <button className="cursor-pointer rounded-md bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
//                                                     onClick={(e) => handleEdit(item, e)}>
//                                                     Edit
//                                                 </button>
//                                                 <button className="cursor-pointer rounded-md bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700"
//                                                     onClick={(e) => handleDelete(item.id, e)}>
//                                                     Delete
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                             {/* <div className='flex'>
//                                 <button className='cursor-pointer rounded-md bg-gray-200 px-3 py-1 text-sm font-medium text-black hover:bg-gray-300'
//                                     disabled={currentPageNumber >= allPage} onClick={goOnNextPage}>Next</button>
//                                 <span className='text-black'>{currentPageNumber} of {allPage}</span>
//                                 <button className='cursor-pointer rounded-md bg-gray-200 px-3 py-1 text-sm font-medium text-black hover:bg-gray-300'
//                                     disabled={currentPageNumber === 1}
//                                     onClick={goOnPrevPage}>
//                                     Prev</button>
//                             </div> */}
//                         </div>
//                         )}
//             </section>
//         </main>
//     );
// }
