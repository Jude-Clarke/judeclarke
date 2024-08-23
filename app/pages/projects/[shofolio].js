import ProjectDetails from "../../components/ProjectDetails";
import { React, useState } from "react";

const [openModal, setOpenModal] = useState({ state: false, project: null });



const Shofolio = () => {
  return (
    <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
  )
}

export default Shofolio
