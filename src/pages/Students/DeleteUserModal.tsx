import { MdDelete } from "react-icons/md";
import { Modal } from "../../components/Modal/Modal";
import { Toast } from "../../components/Toast/Toast";
import { showToast } from "../../components/Toast/toastMethods";
import { getFirebaseDoc } from "../../api/getFirebaseDoc/getFirebaseDoc";
import { deleteFirebaseDoc } from "../../api/deleteFirebaseDoc/deleteFirebaseDoc";
import { getFirebaseDocs } from "../../api/getFirebaseDocs/getFirebaseDocs";
import { Curso } from "../../components/gestion_cursos/curso.interface";

interface DeleteUserProps {
  id: string;
  getUsers: (targetPage: number) => Promise<void>;
}

function DeleteUser({ id, getUsers }: DeleteUserProps) {
  const handleDelete = async () => {
    const courses = await getFirebaseDocs(`Cursos`);
    const user = await getFirebaseDoc(`/Usuarios/${id}`);
    const data = courses as Curso[];
    var enrolled = false;
    for (let index = 0; index < data.length; index++) {
      const curso = data[index];
      if (curso.matriculados && curso.matriculados.length > 0) {
        if (curso.matriculados.includes(id)) {
          enrolled = true;
          break;
        }
      }
      if (curso.aprobados && curso.aprobados.length > 0) {
        if (curso.aprobados.includes(id)) {
          enrolled = true;
          break;
        }
      }
      if (curso.reprobados && curso.reprobados.length > 0) {
        if (curso.reprobados.includes(id)) {
          enrolled = true;
          break;
        }
      }
      if (curso.postulados && curso.postulados.length > 0) {
        if (curso.postulados.includes(id)) {
          enrolled = true;
          break;
        }
      }
    }
    if (user) {
      if (user && enrolled === false) {
        await deleteFirebaseDoc(`/Usuarios/${id}`);
        getUsers(1);
        setTimeout(() => {
          showToast("delete-modal-user");
        }, 500);
      } else {
        setTimeout(() => {
          showToast("unable-to-delete-modal-user");
        }, 500);
      }
    }
  };

  return (
    <>
      <Modal
        id={`user-section-modal-delete-${id}`}
        buttonStyle={"btn btn-danger"}
        modalTitle="Notificación"
        buttonName={<MdDelete />}
        modalName={"Eliminar"}
        body={"¿Está seguro que desea eliminar este Usuario?"}
        secondaryButtonText={"Cancelar"}
        primaryButtonText={"Aceptar"}
        classSecondaryButton="btn btn-secondary"
        classPrimaryButton="btn btn-danger"
        functionButtonOption={() => {
          handleDelete();
        }}
      />

      <Toast
        id="delete-modal-user"
        message="¡Usuario eliminado con éxito!"
        title="Sección de avisos"
      />

      <Toast
        id="unable-to-delete-modal-user"
        message="¡El usuario seleccionado posee cursos matriculados y no puede ser borrado!"
        title="Sección de avisos"
      />
    </>
  );
}

export default DeleteUser;
