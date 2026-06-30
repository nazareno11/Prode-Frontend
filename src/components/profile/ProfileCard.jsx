import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AvatarSelector from "./AvatarSelector";

import {
  FaBullseye,
  FaTrophy,
  FaCheckCircle,
  FaUsers,
  FaCamera,
  FaChartLine
} from "react-icons/fa";

import "../profile/ProfileCard.css";

const ProfileCard = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [showSelector, setShowSelector] = useState(false);

  const getAvatarUrl = (avatar) => {
    if (!avatar) return "/avatars/default.png";

    if (avatar.startsWith("/avatars/") || avatar.startsWith("http")) {
      return avatar;
    }

    return `/avatars/${avatar.toLowerCase()}.png`;
  };

  const avatarUrl = getAvatarUrl(user?.avatar);

  return (
    <div className="profile-card">
      <div className="profile-header">

        <div className="profile-avatar-container">

          <img src={avatarUrl} alt="avatar" className="profile-avatar-image" />

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
          <span>Jugador</span>
        </div>

      </div>

      <div className="profile-stats">
        <div
          className="stat-card stat-card--clickeable"
          onClick={() => navigate("/mis-pronosticos")}
          title="Ver mis pronósticos"
        >
          <FaBullseye className="stat-icon" />
          <h3>{user?.cantidadPronosticos ?? 0}</h3>
          <p>Ver mis pronósticos</p>
          
        </div>

        <div className="stat-card">
          <FaTrophy className="stat-icon" />
          <h3>{user?.puntosTotales ?? 0}</h3>
          <p>Puntos</p>
        </div>

        <div className="stat-card">
          <FaCheckCircle className="stat-icon" />
          <h3>{user?.plenosAcertados ?? 0}</h3>
          <p>Plenos</p>
        </div>

        <div
          className="stat-card stat-card--clickeable"
          onClick={() => navigate("/grupos")} 
          title="Ver mis grupos"
        >
          <FaUsers className="stat-icon" />
          <h3>{user?.cantidadGrupos ?? 0}</h3>
          <p>Ver mis grupos</p>
        </div>
      </div>

      <div className="profile-extra">
        <div className="extra-card">
          <h3>⭐ Equipo favorito</h3>
          <p>Argentina</p>
        </div>

        <div className="extra-card">
          <h3><FaChartLine /> Ranking actual</h3>
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