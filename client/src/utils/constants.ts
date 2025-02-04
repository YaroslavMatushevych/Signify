import hello from '../assets/images/Hello.jpg';
import ily from '../assets/images/ILY.jpg';
import no from '../assets/images/No.jpg';
import ty from '../assets/images/TY.jpg';
import yes from '../assets/images/Yes.jpg';

// Guide Data
export const GUIDES = [
    { label: 'Hello', image: hello },
    { label: 'I Love You', image: ily },
    { label: 'No', image: no },
    { label: 'Thank You', image: ty },
    { label: 'Yes', image: yes },
];

// Gesture Label Map
export const LABEL_MAP = {
    1: { name: 'Hello', color: 'red' },
    2: { name: 'Thank You', color: 'yellow' },
    3: { name: 'I Love You', color: 'lime' },
    4: { name: 'Yes', color: 'blue' },
    5: { name: 'No', color: 'purple' },
};

// Navigation Links
export const NAV_LINKS = [
    { label: 'Guide', path: '/guide' },
    { label: 'About', path: '/about' },
    { label: 'Dashboard', path: '/dashboard', auth: true },
];
