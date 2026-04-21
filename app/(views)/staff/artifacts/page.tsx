
// Full View
"use client";
import { LoadingSpinner } from '@/app/components/LoadingSpinner';
import { AddModal, DeleteModal, EditModal } from '@/app/(views)/staff/artifacts/Modal';
import { artifactAction } from '@/app/actions/artifactAction';
import { useState, useEffect } from 'react';
import { Alert } from '@/app/components/Alert';
import { embeddingAction } from '@/app/actions/embeddingAction';
import Link from 'next/link';
import { convertToFormData } from '@/app/utils/convertToFormData';
import { ArtifactsForm } from '@/@types/artifact';

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

    const [loadingAdd, setLoadingAdd] = useState(false);
    const [loadingSave, setLoadingSave] = useState(false);
    const [loadingTable, setLoadingTable] = useState(true);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error' | 'info' | 'nothing'>('nothing');

    // ################## Get all artifacts จาก Action ##################
    useEffect(() => {
        const loadArtifacts = async () => {
            setLoadingTable(true);
            try {
                const data = await artifactAction.getAllArtifactsAdmin();
                setGetArtifacts(data);
            } catch (error) {
                console.error('Failed to load artifacts:', error);
            } finally {
                setLoadingTable(false);
            }
        };
        loadArtifacts();
    }, []);

    // ################## Handlers ##################
    const embedding = async () => {
        if (loadingTable) return;
        setMessageType('nothing');
        setMessage('');

        try {
            setLoadingTable(true);
            const textResult = await embeddingAction.textEmbeddingAction();
            const imageResult = await embeddingAction.imageEmbeddingAction();
            if (textResult?.success && imageResult?.success) {
                setMessageType("success");
                setMessage("Both text and image embeddings were successful.");
            }
            else if (imageResult?.success && !textResult?.success) {
                // เคสที่คุณเจอ: Image ได้ แต่ Text แตก
                setMessageType("info");
                setMessage(`Image embedding succeeded, but text embedding failed: ${textResult?.message || 'Unknown Error'}`);
            }
            else if (textResult?.success && !imageResult?.success) {
                setMessageType("info");
                setMessage(`Text embedding succeeded, but image embedding failed: ${imageResult?.message || 'Unknown Error'}`);
            }
            else {
                setMessageType("info");
                setMessage("There are no new images or texts to embed at this time.");
            } console.log("Embedding Results:", { textResult, imageResult });

        } catch (error) {
            setMessageType('error');
            setMessage(`เกิดข้อผิดพลาดร้ายแรง: ${error}`);
        } finally {
            setLoadingTable(false);
        }
    }
    const [selectedArtifactData, setSelectedArtifactData] = useState<ArtifactsForm | null>(null);
    const handleEdit = async (item: any, e: React.FormEvent) => {
        e.stopPropagation();
        setEditArtifact(item.id);

        // แปลงข้อมูลจาก DB (snake_case) ให้เป็นรูปแบบ Form (camelCase)
        const formData = {
            title: item.title || '',
            art_style: item.art_style || '',
            current_location: item.current_location || '',
            location_found: item.location_found || '',
            description: item.description || '',
            material: item.material || '',
            era: item.era || '',
            category: item.category || '',
            lng: item.lng || '',
            lat: item.lat || '',
            image_file: item.image_file || null
        }
        setSelectedArtifactData(formData);
        setIsEditModalOpen(true);
    }
    const saveEdit = async (data: ArtifactsForm) => {
        if (editArtifact === null) return;

        setLoadingSave(true);
        try {
            const formData = convertToFormData(data);
            //editArtifact(id, data)
            const response = await artifactAction.editArtifact(editArtifact, formData);
            // หยิบ item มาไล่ดูทีละชื้นว่าตรงกับ id ที่ต้องการไหม ถ้าตรงก็ทับข้อมูลใหม่ไปเลย : ไม่ตรงก็คืนค่าเดิมกลับไป
            const updatedItem = response.data[0];
            setGetArtifacts(prev => prev.map(item =>
                item.id === editArtifact ? { ...item, ...updatedItem } : item));
            setEditArtifact(null);
            setMessageType('success');
            setMessage(`Artifact ID ${editArtifact} edited successfully!`);
        }
        catch (error) {
            setMessageType('error');
            setMessage('Failed to save edit!');
            console.error('Failed to save edit:', error);
        } finally {
            setLoadingSave(false);
            setIsEditModalOpen(false);
        }

    }

    const handleDelete = async (id: number, e: React.FormEvent) => {
        // หยุดการกระจายของ event เพื่อไม่ให้เกิดการทำงานอื่นๆ ที่ไม่ต้องการ (เช่น การเปิด modal ซ้อนกัน)
        e.stopPropagation()
        setIsDeleteModalOpen(true);
        // เก็บ ID ของ item ที่ต้องการลบไว้ใน state เพื่อใช้ในการยืนยันการลบ
        setDeleteArtifact(id);
    }

    const onDeleteSubmit = async () => {
        if (deleteArtifact !== null) {
            try {
                await artifactAction.deleteArtifact(deleteArtifact);
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

    const onAddSubmit = async (data: ArtifactsForm) => {
        setLoadingAdd(true);
        try {
            const formData = convertToFormData(data);
            await artifactAction.addArtifact(formData);
            setMessageType('success');
            setMessage('Artifact added successfully!');
            const updatedDataList = await artifactAction.getAllArtifactsAdmin();
            setGetArtifacts(updatedDataList);
        } catch (error) {
            setMessageType('error');
            setMessage('An error occurred while adding the artifact.');
        } finally {
            setLoadingAdd(false);
        }
    }

    return (
        <main className="flex flex-col gap-10 min-h-screen bg-linear-to-br from-slate-50 to-sky-100 p-6">
            {/* Back Button */}
            <div className="flex items-center justify-start">
                <Link href="/staff"
                    className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:shadow-md"                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    ย้อนกลับ</Link>
            </div>
            {/* Add Modal */}
            {
                isAddModalOpen ? (<AddModal
                    isLoading={loadingAdd}
                    isOpen={isAddModalOpen}
                    onClose={() => { setIsAddModalOpen(false); }}
                    onSubmit={onAddSubmit}
                />) : null
            }

            {/* Edit Modal */}
            {
                isEditModalOpen ? (
                    <EditModal
                        isLoading={loadingSave}
                        isOpen={isEditModalOpen}
                        onClose={() => { setIsEditModalOpen(false); setSelectedArtifactData(null); }}
                        onSubmit={async (data) => { await saveEdit(data); }}
                        initialData={selectedArtifactData ?? undefined}
                        itemName={getArtifacts.find(item => item.id === editArtifact)?.title || 'this artifact'}
                    />) : null
            }

            {/* Delete Confirmation Modal */}
            {
                isDeleteModalOpen ? (
                    <DeleteModal
                        isOpen={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onSubmit={onDeleteSubmit}
                        // หาชื่อ ID จาก getArtifacts เพื่อเปรียบเทียบกับ deleteArtifact แล้วเอาชื่อมาแสดงใน Modal
                        itemName={getArtifacts.find(item => item.id === deleteArtifact)?.title || 'this artifact'}
                    />
                ) : null
            }

            {/* ################## Artifacts Table ################## */}
            <section className=" mx-auto w-full max-w-8xl rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-lg backdrop-blur-sm">
                <header className="mb-5">
                    <h2 className="text-2xl font-bold text-slate-900">Artifacts Table</h2>
                    <p className="text-sm text-slate-500">List of artifacts from the database.</p>
                </header>
                <div className=' gap-10 flex mb-5'>
                    <button onClick={(e) => handleAdd(e)} className="cursor-pointer rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                        + Add Artifact
                    </button>
                    <input type="text"
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search artifacts..."
                        className=" rounded-xl border border-slate-300 px-4 py-2 text-sm text-black outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200" />
                    <div className='gap-4 flex-1 flex justify-end'>
                        <button disabled={loadingTable} onClick={async () => { await embedding(); setLoadingTable(false); }} className=' cursor-pointer rounded-md bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700'>
                            🧠 Embedding</button>
                    </div>

                </div>
                {messageType ? (<Alert
                    message={message}
                    messageType={messageType} />) : null}

                {loadingTable ? (<LoadingSpinner />)
                    : getArtifacts.length === 0 ? (<p className="text-sm text-slate-500">No artifacts found.</p>)
                        : (<div className="max-h-[50vh] overflow-y-auto pr-3 custom-scrollbar ">
                            <table className="text-slate-900 w-full text-left text-sm border-collapse">
                                <thead>
                                    <tr className="bg-slate-100">
                                        <th className="px-4 py-2 border border-slate-200">Updated at</th>
                                        <th className="px-4 py-2 border border-slate-200">ID</th>
                                        <th className="px-4 py-2 border border-slate-200">Title</th>
                                        <th className="px-4 py-2 border border-slate-200">Era</th>
                                        <th className="px-4 py-2 border border-slate-200">Material</th>
                                        <th className="px-4 py-2 border border-slate-200">Location Found</th>
                                        <th className="px-4 py-2 border border-slate-200">Current Location</th>
                                        {/* <th className="px-4 py-2 border border-slate-200">Description</th> */}
                                        <th className="px-4 py-2 border border-slate-200"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* ข้อมูลที่ค้นหาเจอ */}
                                    {fillteredArtifacts.map((item, index) => (
                                        <tr key={item.id || index} className="hover:bg-slate-50">
                                            <td className="px-4 py-2 border border-slate-200">{item.updated_at ? new Date(item.updated_at).toLocaleString() : '-'}</td>
                                            <td className="px-4 py-2 border border-slate-200">{item.id || '-'}</td>
                                            <td className="px-4 py-2 border border-slate-200">{item.title || '-'}</td>
                                            <td className="px-4 py-2 border border-slate-200">{item.era || '-'}</td>
                                            <td className="px-4 py-2 border border-slate-200">{item.material || '-'}</td>
                                            <td className="px-4 py-2 border border-slate-200">{item.location_found || '-'}</td>
                                            <td className="px-4 py-2 border border-slate-200">{item.current_location || '-'}</td>
                                            {/* <td className="px-4 py-2 border border-slate-200 max-w-xs truncate">{item.description || '-'}</td> */}
                                            <td className=" justify-center gap-4 flex px-4 py-2 border border-slate-200">
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
        </main >
    );
}
