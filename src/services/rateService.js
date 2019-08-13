import axios from 'axios';

const RateService = {
    get: async () => {
        const response = await axios.get('/rates/all');
        return response.data.protocols;
    }
};

export default RateService;