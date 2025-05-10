import { findStatus } from "../repository/status";
import { statusData } from "../types/status";


export const getAllstatus = async () => {
    const status = await findStatus();
    return status;
};
