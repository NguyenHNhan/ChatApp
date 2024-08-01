import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaPen, FaPhone, FaVoicemail } from "react-icons/fa";
import Cookies from 'js-cookie';

const Profile = ({ closeProfile }) => {
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState('');
    const [avatar, setAvatar] = useState()
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const handleClick = () => {
        setEdit(!edit)
    }
    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('users_fullname', data.users_fullname);
            formData.append('users_phone', data.users_phone);
            formData.append('users_email', data.users_email);
            formData.append('avatar', data.avatar[0]);

            console.log(formData)
            const response = await fetch('http://localhost:3001/api/user/uploadavatar', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Failed to upload avatar');
            }
            const responseData = await response.json();
            console.log('Avatar uploaded successfully:', responseData);
        } catch (error) {
            console.error('Error uploading avatar:', error);
        }
    };

    useEffect(() => {
        reset({
            users_fullname: data.users_fullname,
            users_phone: data.users_phone,
            users_email: data.users_email
        });
    }, [reset]);
    const fetchMyProfile = useCallback(() => {
        fetch("http://localhost:3001/api/user/myprofile", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'token': Cookies.get('token') })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch messages');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [])
    useEffect(() => {
        console.log('123')
        fetchMyProfile();
    }, [fetchMyProfile]);
    const handleChangeAvt = (e) => {
        setAvatar(URL.createObjectURL(e.target.files[0]));
    }

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar)
        }
    }, [avatar]);
    return (
        <div className='profile'>
            {!edit ? (
                <>
                    <div className="nav-profile" > <FaArrowLeft onClick={closeProfile} /> <h2>Profile</h2> <FaPen onClick={handleClick} /> </div>
                    <img className="avt-profile" src="http://localhost:3001/api/images/avatars/default.jpg"></img>
                    <h4>{data.users_fullname}</h4>
                    <h5>@huunhan</h5>
                    <div className="d-flex flex-column w-100 border-top">
                        <div className="d-flex align-items-center"> <FaPhone className="mx-4" size={25} /> <div className="d-flex flex-column"> <span className="fw-bold" >0356701150 </span><span> Phone</span> </div> </div>
                        <div className="d-flex align-items-center"> <FaVoicemail className="mx-4" size={25} /> <div className="d-flex flex-column"> <span className="fw-bold" >{data.users_email} </span><span> Email</span> </div> </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="nav-profile" > <FaArrowLeft onClick={handleClick} /> <h2>Profile</h2> <div></div> </div>
                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" >
                        <img className="avt-profile" src={avatar ? "http://localhost:3001/api/images/avatars/" : 'http://localhost:3001/api/images/avatars/default.jpg'}></img>
                        <div className="d-flex flex-column w-100 border-top">
                            <input type="file" onChange={handleChangeAvt}
                                {...register('avatar', { required: true })}
                            />
                            <input className="input" type="text" placeholder="Họ và Tên"
                                defaultValue={data.users_fullname}
                                {...register('users_fullname', { required: true })}
                            />
                            <input className="input" type="text" placeholder="@huunhan"
                            // {...register('users_fullname', { required: true })}
                            />
                            <input className="input" type="text" placeholder="Number Phone"
                                defaultValue={data.users_phone}

                                {...register('users_phone', { required: true })}
                            />
                            <input className="input" type="text" placeholder="Email"
                                defaultValue={data.users_email}

                                {...register('users_email', { required: true })}
                            />
                        </div>
                        <button className="btn" type="submit">123</button>
                    </form>

                </>
            )}
        </div>

    )
}

export default Profile;