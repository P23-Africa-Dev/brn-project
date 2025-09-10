// services/countryService.ts
import axios from 'axios';

export interface Country {
    code: string;
    name: string;
}

interface ApiCountryInfo {
    country: string;
    region: string;
}

export async function getAfricanCountries(): Promise<Country[]> {
    try {
        const resp = await axios.get('https://api.first.org/data/v1/countries?region=africa&limit=3&pretty=true');
        // const resp = await axios.get('https://api.first.org/data/v1/countries?region=africa');

        // resp.data = { status, status-code, total, data: {DZ: {...}, ...} }
        const apiData = resp.data;

        console.log('API Response:', apiData); // Debugging line

        if (apiData?.status === 'OK' && apiData?.data) {
            const list = Object.entries(apiData.data as Record<string, ApiCountryInfo>).map(([code, info]) => ({
                code,
                name: info.country,
            }));
            return list;
        } else {
            throw new Error('Unexpected API format');
        }
    } catch (err: any) {
        console.error('Error fetching African countries:', err);
        throw new Error(err.message || 'Failed to fetch countries');
    }
}
