import axios from 'axios';
const uri = process.env.REACT_APP_DEFI_API_URI;

const RateService = {
    get: async () => {
        const response = await axios.get(`${uri}/rates/all`);
        return response.data.protocols;
    }
};

export default RateService;