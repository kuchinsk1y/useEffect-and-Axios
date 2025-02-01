import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(1); // ID користувача, який будемо отримувати

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        setUser(response.data);
      } catch (err) {
        setError("Помилка завантаження даних.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // Виконуємо запит щоразу при зміні userId

  return (
    <div>
      <h2>Інформація про користувача</h2>
      <button onClick={() => setUserId((prev) => (prev < 10 ? prev + 1 : 1))}>
        Завантажити іншого користувача
      </button>

      {loading && <p>Завантаження...</p>}
      {error && <p>{error}</p>}
      {user && (
        <div>
          <p>Ім'я: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Телефон: {user.phone}</p>
        </div>
      )}
    </div>
  );
};

export default UserList;
