var isProduction ='';
if (typeof window !== 'undefined') {
    isProduction = window.location.hostname != 'localhost';
}
const urlService = {};
urlService.clientUrl = true ? 'https://capstone-team-4-1-front.vercel.app' : 'http://localhost:3000';
urlService.serverUrl = true ? 'https://capstone-team-4-1-backend.vercel.app' : 'http://localhost:3001';
export default urlService;