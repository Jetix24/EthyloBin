import User from "@/models/User"; // Asegúrate de que la ruta a tu modelo de usuario sea correcta
import getSession from "./getSession";

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    // Buscamos al usuario por su email en la base de datos
    const currentUser = await User.findOne({ email: session.user.email });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    console.error("Error al obtener el usuario actual:", error);
    return null;
  }
};

export default getCurrentUser;
