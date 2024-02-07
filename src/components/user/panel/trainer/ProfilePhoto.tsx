import React, { useState, useEffect } from 'react';
import {isBlank} from "../../../../commons/Commons";

const imgStyle={maxWidth: '800px', height:'auto'}
const ProfilePhoto = (prop: {
    email: string | undefined
}) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {

        const fetchImage = async (mail: string | undefined) => {
            if(!isBlank(mail)) {
                try {
                    const response = await fetch(`${process.env.REACT_APP_USER_URL}/user/download`, {
                        method: 'GET',
                        // @ts-ignore
                        headers: {
                            'Content-Type': 'application/json',
                            Email: mail
                        },
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    setImageUrl(url);
                } catch (error) {
                    console.error('There was a problem with fetching the image:', error);
                }
            }
        };
        fetchImage(prop.email);
    }, [prop.email]);

    return (
        <div>
            {imageUrl ? <img style={imgStyle} src={imageUrl} alt="Pobrane zdjęcie" /> : <p>Ładowanie zdjęcia...</p>}
        </div>
    );
};

export default ProfilePhoto;
