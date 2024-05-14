import { MdDelete } from "react-icons/md";
import { Modal } from "../../components/Modal/Modal";
import { Toast } from "../../components/Toast/Toast";
import { showToast } from "../../components/Toast/toastMethods";
import { getFirebaseDoc } from "../../api/getFirebaseDoc/getFirebaseDoc";
import { deleteFirebaseDoc } from "../../api/deleteFirebaseDoc/deleteFirebaseDoc";

interface DeleteUserProps {
  id: string;
  getUsers: (targetPage: number) => Promise<void>;
}

function DeleteUser({ id, getUsers }: DeleteUserProps) {
  const handleDelete = async () => {
    const user = await getFirebaseDoc(`/Usuarios/${id}`);
    if (user) {
      if (user.cursos == undefined || user.cursos.length == 0) {
        await deleteFirebaseDoc(`/Usuarios/${id}`);
        getUsers(1);
        setTimeout(() => {
          showToast("delete-modal-user");
        }, 500);
      } else if (user.cursos.length > 0) {
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
