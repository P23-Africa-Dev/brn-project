import { useState } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
interface Step3Props {
    onNext: (data: any) => void;
    onPrevious: () => void;
}
interface Skills {
    greatAt: string[];
    canHelpWith: string[];
}
const Step3: React.FC<Step3Props> = ({ onNext, onPrevious }) => {
    const [skills, setSkills] = useState<Skills>({
        greatAt: [],
        canHelpWith: [],
    });
    const availableSkills = ['Sales', 'Fundraising', 'Product', 'Strategy']; // Add more skills
    const handleSkillChange = (type: 'greatAt' | 'canHelpWith', skill: string) => {
        setSkills((prevSkills) => {
            const currentSkills = prevSkills[type];
            if (currentSkills.includes(skill)) {
                return {
                    ...prevSkills,
                    [type]: currentSkills.filter((s) => s !== skill),
                };
            } else {
                if (currentSkills.length < 3) {
                    return {
                        ...prevSkills,
                        [type]: [...currentSkills, skill],
                    };
                }
                return prevSkills; // Max 3 tags selected
            }
        });
    };
    const handleSubmit = () => {
        // Add validation logic here
        onNext(skills);
    };
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">What's your secret sauce?</h2>
            <p className="text-sm text-gray-500">Members will search for these skills!</p>
            <div>
                <h3 className="mb-2 text-lg font-semibold">I'm great at:</h3>
                <p className="mb-2 text-sm text-gray-500">select max 3 tags</p>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                    {availableSkills.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                            <Checkbox
                                id={`great-at-${skill}`}
                                checked={skills.greatAt.includes(skill)}
                                onCheckedChange={() => handleSkillChange('greatAt', skill)}
                            />
                            <label htmlFor={`great-at-${skill}`} className="text-sm text-gray-700">
                                {skill}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-4">
                <h3 className="mb-2 text-lg font-semibold">I can help others with:</h3>
                <p className="mb-2 text-sm text-gray-500">select max 3 tags</p>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                    {availableSkills.map((skill) => (
                        <div key={`help-${skill}`} className="flex items-center space-x-2">
                            <Checkbox
                                id={`help-with-${skill}`}
                                checked={skills.canHelpWith.includes(skill)}
                                onCheckedChange={() => handleSkillChange('canHelpWith', skill)}
                            />
                            <label htmlFor={`help-with-${skill}`} className="text-sm text-gray-700">
                                {skill}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={onPrevious}>
                    Previous
                </Button>
                <Button onClick={handleSubmit}>Proceed</Button>
            </div>
        </div>
    );
};
export default Step3;
