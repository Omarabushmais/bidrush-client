import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styles from "./CreateEdit.module.css";
import { API_URL } from "../../Api/axios"; 
import { getAuctionById, updateAuction, deleteImage } from "../../Api/auctions";

function EditAuction() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [auctionTimes, setAuctionTimes] = useState({
        start: "",
        end: ""
    });

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        startingPrice: "",
        bidIncrement: "",
    });

    const [existingImages, setExistingImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [newPreviews, setNewPreviews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAuctionById(id);
                
                setAuctionTimes({
                    start: data.start_time,
                    end: data.end_time
                });

                setFormData({
                    title: data.title,
                    description: data.description,
                    category: data.category,
                    startingPrice: data.starting_price,
                    bidIncrement: data.bid_increment,
                });
                
                setExistingImages(data.images || []);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to load auction data.");
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        if (newImages.length === 0) {
            setNewPreviews([]);
            return;
        }
        const objectUrls = newImages.map((file) => URL.createObjectURL(file));
        setNewPreviews(objectUrls);
        return () => objectUrls.forEach((url) => URL.revokeObjectURL(url));
    }, [newImages]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        if (e.target.files) {
            const fileArray = Array.from(e.target.files);
            const totalImages = existingImages.length + newImages.length + fileArray.length;

            if (totalImages > 5) {
                setError("You can only have a maximum of 5 images.");
                return;
            }

            setNewImages(prev => [...prev, ...fileArray]);
            setError("");
        }
    };

    const handleDeleteExisting = async (imageId) => {
        if(!window.confirm("Are you sure you want to permanently delete this image?")) return;
        try {
            await deleteImage(imageId);
            setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
        } catch (err) {
            alert("Failed to delete image.");
        }
    };

    const handleRemoveNew = (index) => {
        setNewImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("category", formData.category);
            data.append("starting_price", formData.startingPrice);
            data.append("bid_increment", formData.bidIncrement);

            data.append("start_time", auctionTimes.start);
            data.append("end_time", auctionTimes.end);

            newImages.forEach((file) => {
                data.append("images", file);
            });

            await updateAuction(id, data);
            navigate("/my-auctions");
        } catch (err) {
            console.error(err);
            setError("Failed to update auction.");
        }
    };

    const formatDate = (dateString) => {
        if(!dateString) return "";
        return new Date(dateString).toLocaleDateString() + " " + new Date(dateString).toLocaleTimeString();
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <div className={styles.header}>
                <h1>Edit Auction</h1>
                <p>Edit your auction details.</p>
            </div>

            <div className="page">
                <div className={styles.container}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.field}>
                            <label className={styles.label}>Item Title</label>
                            <input required className={styles.input} type="text" name="title" value={formData.title} onChange={handleChange}/>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Description</label>
                            <textarea required className={styles.textarea} name="description" value={formData.description} onChange={handleChange}/>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Category</label>
                            <select required className={styles.select} name="category" value={formData.category} onChange={handleChange}>
                                <option value="">Select category</option>
                                <option value="electronics">Electronics</option>
                                <option value="fashion">Fashion</option>
                                <option value="collectibles">Collectibles</option>
                                <option value="vehicles">Vehicles</option>
                                <option value="sports">Sports</option>
                                <option value="toys">Toys</option>
                                <option value="business">Business</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Auction Schedule</label>
                            <div className={styles.readOnlyBox}>
                                <p><strong>Starts:</strong> {formatDate(auctionTimes.start)}</p>
                                <p><strong>Ends:</strong> {formatDate(auctionTimes.end)}</p>
                            </div>
                        </div>
                        
                        <div className={styles.field}>
                            <label className={styles.label}>Bid Increment</label>
                            <input required className={styles.input} type="number" name="bidIncrement" value={formData.bidIncrement} onChange={handleChange}/>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Starting Price ($)</label>
                            <div className={styles.readOnlyBox}>
                                <p>${Number(formData.startingPrice).toFixed(2)}</p>
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Manage Images 
                                <span className={styles.counter}>
                                    ({existingImages.length + newImages.length}/5)
                                </span>
                            </label>
                            
                            <input className={styles.file} type="file" multiple accept="image/*" onChange={handleImageChange}
                             disabled={(existingImages.length + newImages.length) >= 5}/>

                            <div className={styles.imageGrid}>
                                {existingImages.map((img) => (
                                    <div key={img.id} className={styles.imageBlock}>
                                        <img src={`${API_URL}${img.image_url}`} alt="Existing" />
                                        <button type="button" className={styles.deleteBtn} onClick={() => {handleDeleteExisting(img.id); setError("");}}>×</button>
                                    </div>
                                ))}

                                {newPreviews.map((src, index) => (
                                    <div key={index} className={styles.imageBlock}>
                                        <img src={src} alt="New Preview" />
                                        <button type="button" className={styles.deleteBtn} onClick={() => {handleRemoveNew(index); setError("");}}>×</button>
                                        <span className={styles.newBadge}>New</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {error && <p className={styles.errorText}>{error}</p>}

                        <div className={styles.actions}>
                            <Link to="/my-auctions" className={styles.cancel}>Cancel</Link>
                            <button className={styles.submit} type="submit">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditAuction;