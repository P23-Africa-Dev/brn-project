import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Step1Props {
    onNext: (data: any) => void;
}

const Step1: React.FC<Step1Props> = ({ onNext }) => {
    // Defined states to hold form data
    const [formData, setFormData] = useState({
        fullName: '',
        position: '',
        password: '',
        confirmPassword: '',
    });

    const [profilePicture, setProfilePicture] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            // @ts-ignore
            [`${name}`]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // Create a URL for the selected image and update the state
            setProfilePicture(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        // Add validation logic here
        onNext(formData);
    };

    return (
        <div className="mt-[8%] ml-16 flex flex-col gap-7">
            <div className="w-[442px] gap-[5px]">
                <h2 className="text-4xl font-extrabold text-[#0B1727]">First, the essentials</h2>
                <p className="text-[20px] font-normal text-gray-500">This helps members recognize and trust you.</p>
            </div>

            <div className="relative space-y-2">
                <label htmlFor="fullName" className="absolute top-[-12px] left-8 bg-white px-3.5 pt-0.5 text-[16px] font-light text-gray-700">
                    Full Name
                </label>
                <Input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Name Surname"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-[29rem] pl-11.5"
                />
            </div>

            <div className="relative space-y-2">
                <label htmlFor="position" className="absolute top-[-12px] left-8 bg-white px-3.5 pt-0.5 text-[16px] font-light text-gray-700">
                    Position
                </label>
                <Input
                    type="email"
                    id="position"
                    name="position"
                    placeholder="username@gmail.com"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-[29rem] pl-11.5"
                />
            </div>

            <div className="relative space-y-2">
                <label htmlFor="password" className="absolute top-[-12px] left-8 bg-white px-3.5 pt-0.5 text-[16px] font-light text-gray-700">
                    Password
                </label>
                <Input
                    type="password"
                    id="password"
                    name="password"
                    // placeholder="username@gmail.com"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-[29rem] pl-11.5"
                />
            </div>

            <div className="relative space-y-2">
                <label htmlFor="confirmpassword" className="absolute top-[-12px] left-8 bg-white px-3.5 pt-0.5 text-[16px] font-light text-gray-700">
                    Confirm Password
                </label>
                <Input
                    type="password"
                    id="confirmpassword"
                    name="confirmpassword"
                    // placeholder="username@gmail.com"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-[29rem] pl-11.5"
                />
            </div>

            <div className="ml-10 flex items-center gap-10">
                {/* Profile Picture Section */}
                <div className="flex items-center gap-4">
                    {/* File input is hidden */}
                    <input id="profilePictureInput" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />

                    <label
                        htmlFor="profilePictureInput"
                        className="relative flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full border-gray-400"
                    >
                        {profilePicture ? (
                            // Display the selected image if one exists
                            <img src={profilePicture} alt="Profile" className="h-full w-full object-cover" />
                        ) : (
                            <img src="/add-pic-icon.png" alt="" className="h-20 w-20" />
                        )}
                    </label>
                </div>

                <div className="flex w-[278px] flex-col text-sm">
                    <span className="text-[16px] font-semibold">Add a profile picture</span>
                    <span className="text-[13px] font-[300] text-gray-500">Builds trust, personalizes experience, and enhances engagement.</span>
                </div>
            </div>
            <Button
                className="absolute bottom-10 h-[4rem] w-[29rem] rounded-2xl bg-[#2ABFBB] text-xl font-semibold hover:bg-[#0B1C33]"
                onClick={handleSubmit}
            >
                Proceed
            </Button>
        </div>
    );
};

export default Step1;
