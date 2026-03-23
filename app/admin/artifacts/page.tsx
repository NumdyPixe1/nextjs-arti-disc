
"use client";
import { LoadingSpinner } from '@/app/components/LoadingSpinner';
import { DeleteConfirmationModal, EditModal } from '@/app/components/Modal';
import { artifactService } from '@/app/services/artifactService';
import { s } from 'motion/react-client';
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

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Form Fields
    const [title, setTitle] = useState('');
    const [artStyle, setArtStyle] = useState('');
    const [location, setLocation] = useState('');
    const [locationFound, setLocationFound] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [material, setMaterial] = useState('');

    // 
    const [editTitle, setEditTitle] = useState('');
    const [editArtStyle, setEditArtStyle] = useState('');
    const [editLocation, setEditLocation] = useState('');
    const [editLocationFound, setEditLocationFound] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editImageUrl, setEditImageUrl] = useState('');
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
        setEditImageUrl(item.image_url || '');
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
                image_url: editImageUrl,
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

    const handleSubmit = async (e: React.FormEvent) => {
        // ป้องกันการรีเฟรชหน้าเมื่อ submit form
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            await artifactService.createArtifact({
                // use state ที่ผูกกับ input form มาใส่ตรงนี้เลย
                title, art_style: artStyle, material,
                location_found: locationFound, location, description,
                image_url: imageUrl
            });
            // Reset form
            setMessageType('success');
            setMessage('Artifact added successfully!');
            setTitle('');
            setArtStyle('');
            setLocation('');
            setLocationFound('');
            setDescription('');
            setImageUrl('');
            setMaterial('');
            // Refresh artifacts list
            const updatedData = await artifactService.getAllArtifacts();
            setGetArtifacts(updatedData);
        } catch (error) {
            setMessageType('error');
            setMessage('An error occurred while adding the artifact.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex flex-col gap-10 min-h-screen bg-gradient-to-br from-slate-50 to-sky-100 p-6">
            <section className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-lg backdrop-blur-sm">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-900">Add New Artifact</h1>
                    <p className="mt-2 text-sm text-slate-600">Fill in the details below to register a new artifact in the collection.</p>
                </header>

                <form onSubmit={handleSubmit} className=" grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="grid gap-2">
                        <label htmlFor="title" className="text-sm font-medium text-slate-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-black outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                            placeholder="e.g., Golden Buddha Statue"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="artStyle" className="text-sm font-medium text-slate-700">Art Style</label>
                        <input
                            type="text"
                            id="artStyle"
                            value={artStyle}
                            onChange={(e) => setArtStyle(e.target.value)}
                            required
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-black outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                            placeholder="e.g., Impressionism"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="location" className="text-sm font-medium text-slate-700">Location</label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-black outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                            placeholder="e.g., Bangkok National Museum"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="locationFound" className="text-sm font-medium text-slate-700">Location Found</label>
                        <input
                            type="text"
                            id="locationFound"
                            value={locationFound}
                            onChange={(e) => setLocationFound(e.target.value)}
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-black outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                            placeholder="e.g., Ayutthaya"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="imageUrl" className="text-sm font-medium text-slate-700">Image URL</label>
                        <input
                            type="url"
                            id="imageUrl"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-black outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="material" className="text-sm font-medium text-slate-700">Material</label>
                        <input
                            type="text"
                            id="material"
                            value={material}
                            onChange={(e) => setMaterial(e.target.value)}
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-black outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                            placeholder="e.g., Bronze, Wood, Stone"
                        />
                    </div>

                    <div className="grid gap-2 md:col-span-2">
                        <label htmlFor="description" className="text-sm font-medium text-slate-700">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-black outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                            placeholder="Describe the artifact..."
                        />
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                        >
                            {loading ? 'Submitting...' : 'Submit Artifact'}
                        </button>
                        {message && (
                            <p className={`text-sm ${messageType === 'success' ? 'text-emerald-700' : 'text-rose-600'}`}>
                                {message}
                            </p>
                        )}
                    </div>
                </form>
            </section>
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
                imageUrl={editImageUrl}
                material={editMaterial}
                // ส่ง setState ไปให้ EditModal เพื่อให้สามารถแก้ไข state ของ form ได้จากภายใน Modal
                setTitle={setEditTitle}
                setArtStyle={setEditArtStyle}
                setLocation={setEditLocation}
                setLocationFound={setEditLocationFound}
                setDescription={setEditDescription}
                setImageUrl={setEditImageUrl}
                setMaterial={setEditMaterial}
            />) : null}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen ? (
                <DeleteConfirmationModal
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
                <input type="text"
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search artifacts..."
                    className="mb-5 rounded-xl border border-slate-300 px-4 py-2 text-sm text-black outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200" />

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
