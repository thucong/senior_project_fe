import { API_URL } from "./../constants/ApiUrl";
import axios from "axios";
import callApi from "../utils/apiCaller";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");
let ConsultationService = {
    createConsultation: (start, end, content, file, status, doctorId, patientId,date) => {
        return axios({
            method: 'POST',
            url: API_URL + "consultation",
            data: {
                "start": start,
                "end": end,
                "content": content,
                "file": file,
                "status": status,
                "doctorId": doctorId,
                "patientId": patientId,
                "date": date
            },
            headers: { Authorization: `Bearer ${token}` }
        })
    },
    deleteConsultation: (id) => {
        return callApi('consultation/' + id, 'DELETE')
    },
    updateConsultation: (id, content, file) => {
        return callApi('consultation/'+ id, 'PUT', {"content": content, "file": file})
    },
    updateStatus : (id, reply, reason, linkCall, note) => {
        return callApi('consultation/'+ id, 'PUT', {"status": reply, "reasonOfReject": reason, "linkCall": linkCall, "note":note})
    }
}
export default ConsultationService;