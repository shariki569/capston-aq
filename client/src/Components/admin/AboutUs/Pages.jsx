import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAboutPageData } from '../../../API/fetchPage';
import AboutSections from './AboutSections';
import SectionEditor from './SectionEditor';
import { upload } from '../../../Hooks/imageHandling';
import { toast } from 'sonner';

const Pages = () => {
    const [editMode, setEditMode] = useState(false);
    const { pageData, fetchAboutData } = useAboutPageData();
    const [editedData, setEditedData] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [editLoading, setEditLoading] = useState(false);

 
    const handleSectionChange = async (sectionIndex, field, value) => {
        try {
            const updatedSections = [...editedData];
            if (field === 'About_Img' && value) {
                await handleImageUpload(sectionIndex, value);
            } else {

                // Directly update the properties of the section object
                updatedSections[sectionIndex] = {
                    ...updatedSections[sectionIndex],
                    [field]: value,
                };

                setEditedData(updatedSections);
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleImageUpload = async (sectionIndex, file) => {
        try {
            const imgUrl = await upload(file);
            const updatedSections = [...editedData];
            updatedSections[sectionIndex].About_Img = imgUrl;

            // Clean up the previous object URL if it exists
            if (previewImages[sectionIndex]) {
                URL.revokeObjectURL(previewImages[sectionIndex]);
            }

            setPreviewImages((prevImages) => {
                const updatedImages = [...prevImages];
                updatedImages[sectionIndex] = URL.createObjectURL(file);
                return updatedImages;
            });

            setEditedData(updatedSections);
        } catch (error) {
            console.error(error);
        }
    };

    const handleImageSelection = (sectionIndex, e) => {
        const files = e.target.files;

        if (files.length > 0) {
            const selectedFile = files[0];
            handleImageUpload(sectionIndex, selectedFile);
        } else {
            // Handle the case where no file is selected.
        }
    };

    const handleUpdate = async () => {
        try {
            setEditLoading(true)
            // Transform the data for the PUT request
            const transformedData = transformDataForPut(editedData);
            console.log('Data to be sent:', transformedData);

            // Send the PUT request with the transformed data
            await axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/api/pages/update-about-us`, {
                sections: transformedData.sections,
            });
            toast.success('Page updated successfully!');
        } catch (err) {
            console.log(err);
        } finally {
            setEditMode(false)
            setEditLoading(false)
            fetchAboutData();
        }
    };

    const transformDataForPut = (data) => {
        return {
            sections: data.map((section) => ({
                About_Id: section.About_Id,
                SectionHeading: section.SectionHeading,
                SectionContent: section.SectionContent,
                SectionImage: section.About_Img,
            })),
        };
    };


    useEffect(() => {
        setEditedData(pageData);
    }, [pageData]);

    // useEffect(() => {
    //     fetchAboutData();
    // }, [pageData]);

    return (
        <div className="add">
            <div className="content">
                <div className="container">
                    <h2>Edit Page</h2>
                    <h1>About Us</h1>
                </div>
                <div className="container">
                    <h2>Sections</h2>
                    <div className="page-sections">
                        {editMode ? (
                            editedData?.map((section, index) => (
                                <SectionEditor
                                    key={index}
                                    index={index}
                                    section={section}
                                    // Change the function signature in SectionEditor
                                    onSectionChange={(index, field, value) => handleSectionChange(index, field, value)}

                                    previewImages={previewImages[index]}
                                    handleImageChange={(e) => handleImageSelection(index, e)}
                                />
                            ))
                        ) : (
                            <AboutSections data={pageData} />
                        )}
                    </div>
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Edit Page</h1>
                    <div className="buttons">
                        {editMode ? (
                            editLoading ? (

                                <>
                                    <button type="button" disabled className="btn btn-loading" onClick={handleUpdate}>
                                        Update
                                    </button>
                                    <button type="button" disabled className="btn" onClick={() => setEditMode(false)}>
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>

                                    <button type="button"  className="btn" onClick={handleUpdate}>
                                        Update
                                    </button>
                                    <button type="button"  className="btn btn-err" onClick={() => setEditMode(false)}>
                                        Cancel
                                    </button>
                                </>
                            )
                        ) : (
                            <button type="button" className="btn" onClick={() => setEditMode(true)}>
                                Edit
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pages;
