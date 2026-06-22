import { useAuth } from "../../hooks/useAuth";

import "../profile/ProfileCard.css";

const ProfileCard = () => {
  const { user } = useAuth();

  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-avatar">
          {user?.username?.charAt(0).toUpperCase()}
        </div>

        <div className="profile-info">
          <h1>{user?.username}</h1>

          <p>✉ usuario@prode.com</p>

          <span>Jugador del Prode Mundial 2026</span>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <span>🎯</span>

          <h3>0</h3>

          <p>Pronósticos</p>
        </div>

        <div className="stat-card">
          <span>🏆</span>

          <h3>0</h3>

          <p>Puntos</p>
        </div>

        <div className="stat-card">
          <span>✅</span>

          <h3>0</h3>

          <p>Aciertos</p>
        </div>

        <div className="stat-card">
          <span>👥</span>

          <h3>0</h3>

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

          <p>#--</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
