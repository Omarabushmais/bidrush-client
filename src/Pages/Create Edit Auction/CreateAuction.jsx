import React, { useState } from 'react'
import styles from "./CreateEdit.module.css"
import { Link } from 'react-router-dom';

function CreateAuction() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        startingPrice: "",
        bidIncrement: "",
        duration: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleImageChange = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    };


    const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Auction Data:", formData);
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
                                <option value="collectibles">Collectibles</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Auction Duration</label>
                            <select required className={styles.select} name="duration" value={formData.duration} onChange={handleChange}>
                                <option value="">Select duration</option>
                                <option value="1">1 Day</option>
                                <option value="3">3 Days</option>
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
                            <label className={styles.label}>Item Image</label>
                            <input required className={styles.file} type="file" accept="image/*" onChange={handleImageChange} />
                        </div>


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