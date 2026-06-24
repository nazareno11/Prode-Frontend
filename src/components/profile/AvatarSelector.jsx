import { useEffect, useState } from "react";

import { getAvatars, updateAvatar } from "../../api/userService";
import { useAuth } from "../../hooks/useAuth";

const AvatarSelector = ({ onClose }) => {

  const [avatars, setAvatars] = useState([]);

  const { user, setUser } = useAuth();

  useEffect(() => {

    const loadAvatars = async () => {

      const data = await getAvatars();

      setAvatars(data);
    };

    loadAvatars();

  }, []);

    const handleSelectAvatar = async (avatar) => {
    await updateAvatar(avatar.name);

    updateUser({
        avatar: avatar.name
    });

    onClose();
    };

  return (
    <div className="avatar-modal">

      <div className="avatar-modal-content">

        <h2>Elegí tu avatar</h2>

        <div className="avatar-grid">

          {avatars.map((avatar) => (

            <img
              key={avatar.name}
              src={avatar.url}
              alt={avatar.name}
              className="avatar-option"
              onClick={() => handleSelectAvatar(avatar)}
            />

          ))}

        </div>

        <button onClick={onClose}>
          Cerrar
        </button>

      </div>

    </div>
  );
};

export default AvatarSelector;