import React, { useEffect, useState } from 'react';
import ImageUploader from '../../util/ImageUploader';
import axios from 'axios';
import { upload } from '../../../Hooks/imageHandling';
import TextInput from '../../forms/FormFields/TextInput';
import { toast } from 'sonner';

const Amenity_Add = ({ fetchData, close, refreshData }) => {
    const [file, setFile] = useState('');
    const [amenTitle, setAmenTitle] = useState('');
    const [amenImg, setAmenImg] = useState('');
    const [previewImg, setPreviewImg] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (fetchData) {
            setAmenTitle(fetchData.Amenity_Title || '');
            setAmenImg(fetchData.Amenity_Img || '');
        }
    }, [fetchData]);

    const handleClick = async () => {
        setLoading(true);
        const imgUrl = file ? await upload(file) : amenImg;

        if(!amenTitle || !imgUrl) {
            toast.error('Please fill in all fields');
            setLoading(false);
            return;
        }
        try {
            fetchData
                ? await axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/api/amenities/${fetchData.Amenity_Id}`, {
                    Amen_Title: amenTitle,
                    Amen_Img: file ? imgUrl : amenImg,
                }, {
                    withCredentials: true,
                })
                : await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/amenities`, {
                    Amen_Title: amenTitle,
                    Amen_Img: imgUrl,
                });
            close()
            refreshData()
        } catch (err) {
            setLoading(false);
            toast.error(err.response.data.message);
        } finally {
         
            setLoading(false);
            toast.success(fetchData ? 'Amenity Updated' : 'Amenity Added');
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreviewImg(URL.createObjectURL(selectedFile));
        }
    };

    const removeSelectedImage = () => {
        if (amenImg) {
            setFile(null);
            setPreviewImg(null);
            setAmenImg('');
        } else if (file) {
            setPreviewImg(null);
            setFile(null);
        }
    };

    return (
        <div className="amenity-modal">
            {fetchData ? <h2>Edit Amenity</h2> : <h2>Add Amenity</h2>}
            <TextInput
                label="Amenity Title"
                containerClass="amenity-input"
                value={amenTitle}
                onChange={(e) => setAmenTitle(e.target.value)}
            />

            <ImageUploader
                file={file}
                previewImage={previewImg}
                handleImageChange={handleImageChange}
                removeSelectedImage={removeSelectedImage}
                existingImage={amenImg}
            />
            <div>
              
                {loading ? (
                    <span className="btn-loading btn disabled">{fetchData ? 'Updating' : 'Adding'}</span>
                ) : (
                    <span className="btn" onClick={handleClick}>
                        {fetchData ? 'Update' : 'Add'}
                    </span>
                )}
            </div>
        </div>
    );
};

export default Amenity_Add;
