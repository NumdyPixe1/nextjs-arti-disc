
"use client";
import { LoadingSpinner } from '@/app/components/LoadingSpinner';
import { AddModal, DeleteModal, EditModal } from '@/app/components/Modal';
import { artifactService } from '@/app/services/artifactService';
import { useState, useEffect } from 'react';

export default function ManagerArtifactsPage() {
    const [query, setQuery] = useState('');
    const [deleteArtifact, setDeleteArtifact] = useState<number | null>(null);
    const [editArtifact, setEditArtifact] = useState<number | null>(null);
    const [getArtifacts, setGetArtifacts] = useState<any[]>([]);
    const fillteredArtifacts = getArtifacts.filter(item =>
        item.title?.toLowerCase().includes(query.toLowerCase()) || item.art_style?.toLowerCase().includes(query.toLowerCase()) ||
        item.material?.toLowerCase().includes(query.toLowerCase()) || item.id?.toString().includes(query)
    )
    //Modal 
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Form Fields
    const [title, setTitle] = useState('');
    const [artStyle, setArtStyle] = useState('');
    const [location, setLocation] = useState('');
    const [locationFound, setLocationFound] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [material, setMaterial] = useState('');
    // 
    const [editTitle, setEditTitle] = useState('');
    const [editArtStyle, setEditArtStyle] = useState('');
    const [editLocation, setEditLocation] = useState('');
    const [editLocationFound, setEditLocationFound] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editImageFile, setEditImageFile] = useState<File | null>(null);;
    const [editMaterial, setEditMaterial] = useState('');

    const [loading, setLoading] = useState(false);
    const [loadingSave, setLoadingSave] = useState(false);
    // เปิดมาก็โหลดเลย
    const [artifactsLoading, setArtifactsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

    // Get all artifacts
    useEffect(() => {
        const loadArtifacts = async () => {
            setArtifactsLoading(true);
            try {
                const data = await artifactService.getAllArtifacts();
                setGetArtifacts(data);
            } catch (error) {
                console.error('Failed to load artifacts:', error);
            } finally {
                setArtifactsLoading(false);
            }
        };
        loadArtifacts();
    }, []);

    // ################## Handlers ##################

    const handleEdit = async (item: any, e: React.FormEvent) => {
        e.stopPropagation();
        setEditArtifact(item.id);
        // เมื่อกด edit ให้เอาข้อมูลของ item ที่กดมาใส่ใน state ของ form edit เพื่อให้แสดงใน modal
        setEditTitle(item.title || '');
        setEditArtStyle(item.art_style || '');
        setEditLocation(item.location || '');
        setEditLocationFound(item.location_found || '');
        setEditDescription(item.description || '');
        setEditImageFile(item.image_url || '');
        setEditMaterial(item.material || '');

        setIsEditModalOpen(true);
    }
    const saveEdit = async () => {
        if (editArtifact === null) return;
        setLoadingSave(true);
        try {
            const updatedData = {
                title: editTitle,
                art_style: editArtStyle,
                location: editLocation,
                location_found: editLocationFound,
                description: editDescription,
                image: editImageFile,
                material: editMaterial
            }
            //editArtifact(id, data)
            await artifactService.editArtifact(editArtifact, updatedData);
            // หยิบ item มาไล่ดูทีละชื้นว่าตรงกับ id ที่ต้องการไหม ถ้าตรงก็ทับข้อมูลใหม่ไปเลย : ไม่ตรงก็คืนค่าเดิมกลับไป
            setGetArtifacts(prev => prev.map(item => item.id === editArtifact ? { ...item, ...updatedData } : item));
            setIsEditModalOpen(false);
            setEditArtifact(null);
        }
        catch (error) {
            console.error('Failed to save edit:', error);
        } finally {
            setLoadingSave(false);
        }

    }

    const handleDelete = async (id: number, e: React.FormEvent) => {
        // หยุดการกระจายของ event เพื่อไม่ให้เกิดการทำงานอื่นๆ ที่ไม่ต้องการ (เช่น การเปิด modal ซ้อนกัน)
        e.stopPropagation()
        setIsDeleteModalOpen(true);
        // เก็บ ID ของ item ที่ต้องการลบไว้ใน state เพื่อใช้ในการยืนยันการลบ
        setDeleteArtifact(id);
    }

    const confirmDelete = async () => {
        if (deleteArtifact !== null) {
            try {
                await artifactService.deleteArtifact(deleteArtifact);
                // อัปเดต UI หลังลบสำเร็จ
                setGetArtifacts(prev => prev.filter(item => item.id !== deleteArtifact))
                setIsDeleteModalOpen(false);
                setDeleteArtifact(null);
            } catch (error) {
                console.error('Failed to delete artifact:', error);
            }
        }
    }

    const handleAdd = async (e: React.FormEvent) => {
        // ป้องกันการรีเฟรชหน้าเมื่อ submit form
        e.preventDefault();
        setIsAddModalOpen(true)
    }

    const add = async () => {
        const formData = new FormData();
        setLoading(true);
        setMessage('');
        // 1. ใส่ข้อมูล Text ทั่วไป
        formData.append('title', title);
        formData.append('description', description);
        formData.append('material', material);
        formData.append('art_style', artStyle);
        formData.append('location', location);
        formData.append('location_found', locationFound);

        try {
            if (imageFile) {
                formData.append('image_file', imageFile);
                console.log("Attached file to FormData:", imageFile.name);
            }
            else {
                console.log("No file selected!");
            }
            await artifactService.addArtifact(formData);

            // Reset form
            setMessageType('success');
            setMessage('Artifact added successfully!');
            setTitle('');
            setArtStyle('');
            setLocation('');
            setLocationFound('');
            setDescription('');
            setImageFile(null);
            setMaterial('');

            // 
            const updatedData = await artifactService.getAllArtifacts();
            setGetArtifacts(updatedData);
        } catch (error) {
            setMessageType('error');
            setMessage('An error occurred while adding the artifact.');
        } finally {
            setLoading(false);
        }
    }

    // const handleUploadImage = (file: any) => {
    //     if () {

    //     }
    // }
    return (
        <main className="flex flex-col gap-10 min-h-screen bg-gradient-to-br from-slate-50 to-sky-100 p-6">
            {/* Add Modal */}
            {isAddModalOpen ? (<AddModal
                isLodading={loadingSave}
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onConfirm={add}
                message={message}
                messageType={messageType}
                //
                title={title}
                artStyle={artStyle}
                location={location}
                locationFound={locationFound}
                description={description}
                imageFile={imageFile}
                material={material}

                setTitle={setTitle}
                setArtStyle={setArtStyle}
                setLocation={setLocation}
                setLocationFound={setLocationFound}
                setDescription={setDescription}
                setImageFile={setImageFile}
                setMaterial={setMaterial}
            />) : null}

            {/* Edit Modal */}
            {isEditModalOpen ? (<EditModal
                isLodading={loadingSave}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onConfirm={saveEdit}
                itemName={getArtifacts.find(item => item.id === editArtifact)?.title || 'this artifact'}
                //   ส่ง props ของข้อมูลที่ต้องการแก้ไขไปให้ EditModal เพื่อแสดงใน form และให้ user แก้ไข
                title={editTitle}
                artStyle={editArtStyle}
                location={editLocation}
                locationFound={editLocationFound}
                description={editDescription}
                imageFile={editImageFile}
                material={editMaterial}
                // ส่ง setState ไปให้ EditModal เพื่อให้สามารถแก้ไข state ของ form ได้จากภายใน Modal
                setTitle={setEditTitle}
                setArtStyle={setEditArtStyle}
                setLocation={setEditLocation}
                setLocationFound={setEditLocationFound}
                setDescription={setEditDescription}
                setImageFile={setEditImageFile}
                setMaterial={setEditMaterial}
            />) : null}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen ? (
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                    // หาชื่อ ID จาก getArtifacts เพื่อเปรียบเทียบกับ deleteArtifact แล้วเอาชื่อมาแสดงใน Modal
                    itemName={getArtifacts.find(item => item.id === deleteArtifact)?.title || 'this artifact'}
                />
            ) : null}

            {/* ################## Artifacts Table ################## */}
            <section className=" mx-auto w-full max-w-8xl rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-lg backdrop-blur-sm">
                <header className="mb-5">
                    <h2 className="text-2xl font-bold text-slate-900">Artifacts Table</h2>
                    <p className="text-sm text-slate-500">List of artifacts from the database.</p>
                </header>
                <div className='gap-10 flex'>
                    <button onClick={(e) => handleAdd(e)} className="cursor-pointer rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                        Add Artifact
                    </button>
                    <input type="text"
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search artifacts..."
                        className="mb-5 rounded-xl border border-slate-300 px-4 py-2 text-sm text-black outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200" />
                </div>

                {artifactsLoading ? (<LoadingSpinner />)
                    : getArtifacts.length === 0 ? (<p className="text-sm text-slate-500">No artifacts found.</p>)
                        : (<div className="overflow-x-auto">
                            <table className="text-slate-900 w-full text-left text-sm border-collapse">
                                <thead>
                                    <tr className="bg-slate-100">
                                        <th className="px-4 py-2 border border-slate-200">ID</th>
                                        <th className="px-4 py-2 border border-slate-200">Title</th>
                                        <th className="px-4 py-2 border border-slate-200">Art Style</th>
                                        <th className="px-4 py-2 border border-slate-200">Material</th>
                                        <th className="px-4 py-2 border border-slate-200">Location Found</th>
                                        <th className="px-4 py-2 border border-slate-200">Location</th>
                                        {/* <th className="px-4 py-2 border border-slate-200">Description</th> */}
                                        <th className="px-4 py-2 border border-slate-200">Created</th>
                                        <th className="px-4 py-2 border border-slate-200"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* ข้อมูลที่ค้นหาเจอ */}
                                    {fillteredArtifacts.map((item, index) => (
                                        <tr key={item.id || index} className="hover:bg-slate-50">
                                            <td className="px-4 py-2 border border-slate-200">{item.id || '-'}</td>
                                            <td className="px-4 py-2 border border-slate-200">{item.title || '-'}</td>
                                            <td className="px-4 py-2 border border-slate-200">{item.art_style || '-'}</td>
                                            <td className="px-4 py-2 border border-slate-200">{item.material || '-'}</td>
                                            <td className="px-4 py-2 border border-slate-200">{item.location_found || '-'}</td>
                                            <td className="px-4 py-2 border border-slate-200">{item.location || '-'}</td>
                                            {/* <td className="px-4 py-2 border border-slate-200 max-w-xs truncate">{item.description || '-'}</td> */}
                                            <td className="px-4 py-2 border border-slate-200">{item.created_at ? new Date(item.created_at).toLocaleString() : '-'}</td>
                                            <td className="gap-4 flex px-4 py-2 border border-slate-200">
                                                <button className="cursor-pointer rounded-md bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
                                                    onClick={(e) => handleEdit(item, e)}>
                                                    Edit
                                                </button>
                                                <button className="cursor-pointer rounded-md bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700"
                                                    onClick={(e) => handleDelete(item.id, e)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        )}
            </section>
        </main>
    );
}
