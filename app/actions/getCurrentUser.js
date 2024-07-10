import User from "@/models/User"; // Asegúrate de que la ruta a tu modelo de usuario sea correcta
import getSession from "./getSession";

const getCurrentUser = async () => {
  try {
    const session = await getSession();
    const db = await connectMongo();

    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await User.findById(session.user.id);

    if (!currentUser) {
      return null;
    }
    console.log('user current', currentUser)
    return currentUser;
  } catch (error) {
    console.error("Error al obtener el usuario actual:", error);
    return null;
  }
};

export default getCurrentUser;
