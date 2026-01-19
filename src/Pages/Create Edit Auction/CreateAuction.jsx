import React, { useState, useRef, useEffect } from 'react' 
import styles from "./CreateEdit.module.css"
import { Link, useNavigate } from 'react-router-dom';
import { createAuction } from '../../Api/auctions';

function CreateAuction() {

    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        startingPrice: "",
        bidIncrement: "",
        duration: "",
    });

    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        if (images.length === 0) {
            setPreviews([]);
            return;
        }

        const newPreviews = images.map(file => URL.createObjectURL(file));
        setPreviews(newPreviews);

        return () => newPreviews.forEach(url => URL.revokeObjectURL(url));
    }, [images]);

    useEffect(() => {
        if (fileInputRef.current) {
            const dataTransfer = new DataTransfer();
            
            images.forEach((file) => {
                dataTransfer.items.add(file);
            });

            fileInputRef.current.files = dataTransfer.files;
        }
    }, [images]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleImageChange = (e) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);

            if (images.length + newFiles.length > 5) {
                setError("You can only upload a maximum of 5 images.");
                return;
            }

            setImages(prev => [...prev, ...newFiles]);
            setError("");
        }
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try{
            const startDate = new Date();
            const endDate = new Date();

            endDate.setDate(startDate.getDate() + parseInt(formData.duration));

            const data = new FormData();

            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("category", formData.category);
            data.append("starting_price", formData.startingPrice);
            data.append("bid_increment", formData.bidIncrement);
            data.append("start_time", startDate.toISOString());
            data.append("end_time", endDate.toISOString());
            
            images.forEach((file) => {
                data.append("images", file); 
            });

            await createAuction(data);
            navigate("/my-auctions");

        }catch(err){
            console.error(err);
            setError("Failed to create auction. Please try again.");
        }

    };

    return (
        <div>
            <div className={styles.header}>
                <h1>Create Auction</h1>
                <p>Add a new item and start accepting bids.</p>
            </div>
            <div className="page">
                <div className={styles.container}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.field}>
                            <label className={styles.label}>Item Title</label>
                            <input required className={styles.input} type="text" name="title" placeholder="Enter item title" value={formData.title} onChange={handleChange}/>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Description</label>
                            <textarea required className={styles.textarea} name="description" placeholder="Describe your item, condition, and details" 
                            value={formData.description} onChange={handleChange}/>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Category</label>
                            <select required className={styles.select} name="category" value={formData.category} onChange={handleChange}>
                                <option value="">Select category</option>
                                <option value="electronics">Electronics</option>
                                <option value="fashion">Fashion</option>
                                <option value="home">Home</option>
                                <option value="collectibles">Collectibles</option>
                                <option value="vehicles">Vehicles</option>
                                <option value="sports">Sports</option>
                                <option value="toys">Toys</option>
                                <option value="business">Business</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Auction Duration</label>
                            <select required className={styles.select} name="duration" value={formData.duration} onChange={handleChange}>
                                <option value="">Select duration</option>
                                <option value="1">1 Day</option>
                                <option value="3">3 Days</option>
                                <option value="5">5 Days</option>
                                <option value="7">7 Days</option>
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Starting Price ($)</label>
                            <input required className={styles.input} type="number" name="startingPrice" placeholder="Enter starting bid amount" 
                            value={formData.startingPrice} onChange={handleChange}/>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Bid Increment</label>
                            <input required className={styles.input} type="number" name="bidIncrement" placeholder="Enter bid increment amount" 
                            value={formData.bidIncrement} onChange={handleChange}/>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>
                                Item Images 
                                <span className={styles.counter}>
                                    ({images.length}/5)
                                </span>
                            </label>
                            <input ref={fileInputRef} className={styles.file} type="file" multiple accept="image/*" required onChange={handleImageChange} disabled={images.length >= 5}/>

                            <div className={styles.imageGrid}>
                                {previews.map((src, index) => (
                                    <div key={index} className={styles.imageBlock}>
                                        <img src={src} alt={`preview-${index}`} />
                                        <button type="button" className={styles.deleteBtn} onClick={() => {removeImage(index); setError("");}}>×</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {error && <p className={styles.errorText}>{error}</p>}
                        <div className={styles.actions}>
                            <Link to="/my-auctions" className={styles.cancel}>Cancel</Link>
                            <button className={styles.submit} type="submit">Create Auction</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateAuction