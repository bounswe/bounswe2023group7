import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



export default function ImageUpload() {

    const axiosInstance = axios.create({
        baseURL: `http://${process.env.REACT_APP_API_URL}`,
    });

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            // Axios ile POST isteği yapılıyor
            const response = await axios.post('/external', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Dosya başarıyla yüklendi:', response.data);
        } catch (error) {
            console.error('Dosya yüklemede hata:', error);
        }
    };

    return (
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            Upload file
            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Button>
    );
}
