import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select-old';
interface Step2Props {
    onNext: (data: any) => void;
    onPrevious: () => void;
}
interface FormData {
    companyName: string;
    companyDescription: string;
    industry: string;
    interestedIndustries: string[];
}
const Step2: React.FC<Step2Props> = ({ onNext, onPrevious }) => {
    const [formData, setFormData] = useState<FormData>({
        companyName: '',
        companyDescription: '',
        industry: '',
        interestedIndustries: [],
    });
    const industries = ['Business', 'Engineering', 'Tech', 'Finance', 'Agriculture', 'Music'];
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleIndustryChange = (value: string) => {
        setFormData((prevData) => ({ ...prevData, industry: value }));
    };
    const handleInterestedIndustryChange = (industry: string) => {
        setFormData((prevData) => {
            if (prevData.interestedIndustries.includes(industry)) {
                return {
                    ...prevData,
                    interestedIndustries: prevData.interestedIndustries.filter((i) => i !== industry),
                };
            } else {
                return {
                    ...prevData,
                    interestedIndustries: [...prevData.interestedIndustries, industry],
                };
            }
        });
    };
    const handleSubmit = () => {
        // Add validation logic here
        onNext(formData);
    };
    return (
        <div className="mt-[5%] flex flex-col gap-7">
            <div className="w-[533px] gap-[5px]">
                <h2 className="text-4xl font-extrabold text-[#0B1727]">Tell us about your company</h2>
                <p className="text-[20px] font-normal text-gray-500">We'll use this to find your perfect matches.</p>
            </div>
            <div className="relative space-y-2">
                <label htmlFor="companyName" className="absolute top-[-12px] left-8 bg-white px-3.5 pt-0.5 text-[16px] font-light text-gray-700">
                    Company Name
                </label>
                <Input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-[29rem] pl-11.5"
                />
            </div>
            <div className="relative space-y-2">
                <label
                    htmlFor="companyDescription"
                    className="absolute top-[-12px] left-8 bg-white px-3.5 pt-0.5 text-[16px] font-light text-gray-700"
                >
                    What does your company do
                </label>
                <Input
                    type="text"
                    id="companyDescription"
                    name="companyDescription"
                    value={formData.companyDescription}
                    onChange={handleChange}
                    className="w-[29rem] pl-11.5"
                />
            </div>
            <div className="relative space-y-2">
                <label htmlFor="industry" className="absolute top-[-12px] left-8 bg-white px-3.5 pt-0.5 text-[16px] font-light text-gray-700">
                    Select interested industry
                </label>
                <Select onValueChange={handleIndustryChange}>
                    <SelectTrigger className="w-[29rem]">
                        <SelectValue placeholder="" className="" />
                    </SelectTrigger>
                    <SelectContent>
                        {industries.map((industry) => (
                            <SelectItem key={industry} value={industry} className="cursor-pointer">
                                {industry}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex w-[29rem] flex-col gap-3 px-10">
                <p className="mb-2 text-[13px] font-normal text-gray-500">Select from 5 broad categories</p>
                <div className="flex flex-wrap gap-4">
                    {industries.map((industry) => (
                        <div
                            key={industry}
                            className="flex cursor-pointer items-center space-x-2 rounded-full border-gray-300 bg-white px-8 py-3 shadow-md shadow-gray-300 transition-all hover:border-[#0B1727]"
                            onClick={() => handleInterestedIndustryChange(industry)}
                        >
                            <img
                                src={formData.interestedIndustries.includes(industry) ? '/badge-checked.svg' : '/badge-unchecked.svg'}
                                alt={industry}
                                className="h-6 w-6" // Adjust size as needed
                            />
                            <label
                                htmlFor={`interested-${industry}`}
                                className={`font-gt-walsheim text-[16px] font-normal ${
                                    formData.interestedIndustries.includes(industry) ? 'text-[#0B1727]' : 'text-gray-400'
                                } cursor-pointer`}
                            >
                                {industry}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* <div className="flex justify-between">
                 <Button variant="outline" onClick={onPrevious}>
                     Previous
                 </Button>
                 <Button onClick={handleSubmit}>Proceed</Button>
             </div> */}

            <Button
                className="absolute bottom-10 h-[4rem] w-[29rem] rounded-2xl bg-[#2ABFBB] text-xl font-semibold hover:bg-[#0B1C33]"
                onClick={handleSubmit}
            >
                Proceed
            </Button>
        </div>
    );
};
export default Step2;
