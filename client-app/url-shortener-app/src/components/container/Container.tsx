import type { UrlData } from "../../interface/UrlData";
import { DataTable } from "../datatable/DataTable";
import { FormContainer } from "../formcontainer/FormContainer";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../helpers/Constants";
import { useEffect } from "react";


export interface IAppProps {
      
}

export function Container () {

const [data, setdata] = useState<UrlData[]>([]);
const [reload, setReload] = useState<boolean>(false);
const updateReloadState = () :void => {
    setReload(!reload);
}

const fetchTableData = async () => {
    const response = await axios.get(`${API_URL}/shortUrl`);
    console.log("Fetched Data:", response.data);
    setdata(response.data);

}

useEffect(() => {
fetchTableData();
},[reload])

  return (
    <>
    <FormContainer updateReloadState = {updateReloadState}/>
    <DataTable updateReloadState = {updateReloadState} data ={data} />
    </>
  );
}
