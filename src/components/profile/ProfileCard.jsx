import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import AvatarSelector from "./AvatarSelector";

import "../profile/ProfileCard.css";

const ProfileCard = () => {
  const { user, updateUser } = useAuth();

  const [showSelector, setShowSelector] = useState(false);

  const avatarUrl = user?.avatar
    ? `/avatars/${user.avatar.toLowerCase()}.png`
    : "/avatars/default.png";

  return (
    <div className="profile-card">
      <div className="profile-header">

        <div className="profile-avatar-container">

          <img src={avatarUrl} alt="avatar" />

          <button
            className="edit-avatar-btn"
            onClick={() => setShowSelector(true)}
          >
            ✏️
          </button>

        </div>

        <div className="profile-info">
          <h1>{user?.username}</h1>
          <p>✉ {user?.email}</p>
          <span>Jugador del Prode Mundial 2026</span>
        </div>

      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <span>🎯</span>
          <h3>{user?.cantidadPronosticos ?? 0}</h3>
          <p>Pronósticos</p>
        </div>

        <div className="stat-card">
          <span>🏆</span>
          <h3>{user?.puntosTotales ?? 0}</h3>
          <p>Puntos</p>
        </div>

        <div className="stat-card">
          <span>✅</span>
          <h3>{user?.plenosAcertados ?? 0}</h3>
          <p>Plenos</p>
        </div>

        <div className="stat-card">
          <span>👥</span>
          <h3>{user?.cantidadGrupos ?? 0}</h3>
          <p>Grupos</p>
        </div>
      </div>

      <div className="profile-extra">
        <div className="extra-card">
          <h3>⭐ Equipo favorito</h3>
          <p>Argentina</p>
        </div>

        <div className="extra-card">
          <h3>🏅 Ranking actual</h3>
          <p>#{user?.ranking ?? "--"}</p>
        </div>
      </div>

      {showSelector && (
        <AvatarSelector
          onClose={() => setShowSelector(false)}
          onAvatarChange={(newAvatar) => {
            updateUser({
              avatar: newAvatar
            });
          }}
        />
      )}

    </div>
  );
};

export default ProfileCard;