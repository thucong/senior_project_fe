import { API_URL } from "./../constants/ApiUrl";
import axios from "axios";

let ConsultationService = {
    createConsultation: (start, end, content, file, status, doctorId, patientId,date) => {
        return axios({
            method: 'POST',
            url: API_URL + "consultation",
            data: {
                "start": start,
                "end": end,
                "reason": content,
                "file": file,
                "status": status,
                "doctorId": doctorId,
                "patientId": patientId,
                "date": date
            }
        })
    }
}
export default ConsultationService;