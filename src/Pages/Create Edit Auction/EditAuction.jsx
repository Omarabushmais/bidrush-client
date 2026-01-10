import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./CreateEdit.module.css";
import myAuctionsMock from "../mock Data/myauction";

function EditAuction() {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        startingPrice: "",
        bidIncrement: "",
        duration: "",
        image: null,
    });

    useEffect(() => {
        const auction = myAuctionsMock.find(
            (a) => a.id === Number(id)
        );

        setFormData({
            title: auction.title || "",
            description: auction.description || "",
            category: auction.category || "",
            startingPrice: auction.startingPrice || "",
            bidIncrement: auction.bidIncrement || "",
            duration: auction.duration || "",
            image: null,
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();


    };

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
                                <option value="accessories">Accessories</option>
                                <option value="audio">Audio</option>
                                <option value="photography">Photography</option>
                                <option value="wearables">Wearables</option>
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
                            <input required className={styles.input} type="number" name="startingPrice" value={formData.startingPrice} onChange={handleChange}/>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Bid Increment</label>
                            <input required className={styles.input} type="number" name="bidIncrement" value={formData.bidIncrement} onChange={handleChange}/>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Change Image</label>
                            <input className={styles.file} type="file" accept="image/*" onChange={handleImageChange}/>
                        </div>

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
