import { useState } from 'react';
import { Button } from './ui/button';
import { Toggle } from './ui/toggle';

interface Step4Props {
    onNext: (data: any) => void;
    onPrevious: () => void;
}

const Step4: React.FC<Step4Props> = ({ onNext, onPrevious }) => {
    const [visibility, setVisibility] = useState({
        activateSmartMatching: false,
        showProfileInSearches: false,
        displayDealInterests: false,
        hideActivityStatus: false,
    });

    const handleToggle = (name: keyof typeof visibility, pressed: boolean) => {
        setVisibility((prevVisibility) => ({ ...prevVisibility, [name]: pressed }));
    };

    const handleSubmit = () => {
        onNext(visibility);
    };

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Control your visibility</h2>
            <p className="text-sm text-gray-500">You can change these anytime.</p>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700">Activate Smart Matching</h3>
                        <p className="text-xs text-gray-500">We'll suggest 3-5 tailored networks weekly.</p>
                    </div>
                    <Toggle
                        pressed={visibility.activateSmartMatching}
                        onPressedChange={(pressed) => handleToggle('activateSmartMatching', pressed)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700">Show Profile in Searches</h3>
                        <p className="text-xs text-gray-500">Your name/industry will appear in results.</p>
                    </div>
                    <Toggle
                        pressed={visibility.showProfileInSearches}
                        onPressedChange={(pressed) => handleToggle('showProfileInSearches', pressed)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700">Display Deal Interests</h3>
                        <p className="text-xs text-gray-500">Helps partners identify collaboration potential.</p>
                    </div>
                    <Toggle pressed={visibility.displayDealInterests} onPressedChange={(pressed) => handleToggle('displayDealInterests', pressed)} />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700">Hide Activity Status</h3>
                        <p className="text-xs text-gray-500">When ON, others won't see when you're online.</p>
                    </div>
                    <Toggle pressed={visibility.hideActivityStatus} onPressedChange={(pressed) => handleToggle('hideActivityStatus', pressed)} />
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

export default Step4;
