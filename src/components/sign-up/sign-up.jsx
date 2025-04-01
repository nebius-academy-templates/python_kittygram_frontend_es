import React from "react";
import { useHistory, NavLink } from "react-router-dom";

import { registerUser } from "../../utils/api";

import logoIcon from "../../images/logo.svg";

import { FormContainer } from "../ui/form-container/form-container";
import { Input } from "../ui/input/input";
import { ButtonForm } from "../ui/button-form/button-form";

import styles from "./sign-up.module.css";

export const SignUp = ({ extraClass = "" }) => {
  const [userData, setUserData] = React.useState({});
  const [errorDoublePassword, setErrorDoublePassword] = React.useState("");
  const [errorPassword, setErrorPassword] = React.useState("");
  const [errorLogin, setErrorLogin] = React.useState("");

  const history = useHistory();

  const onChangeInput = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const checkValid = () => {
    if (!userData.username) {
      setErrorLogin("El campo 'nombre' es obligatorio");
      return false;
    }
    if (!userData.password) {
      setErrorPassword("El campo 'contraseña' es obligatorio");
      return false;
    }
    if (!userData.password2) {
      setErrorDoublePassword("El campo 'contraseña' es obligatorio");
      return false;
    }
    if (userData.password !== userData.password2) {
      setErrorDoublePassword("Las contraseñas no coinciden");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    errorDoublePassword && setErrorDoublePassword("");
    errorLogin && setErrorLogin("");
    errorPassword && setErrorPassword("");

    checkValid() &&
      registerUser(userData.username, userData.password)
        .then((res) => {
          if (res && res.username) {
            history.replace({ pathname: "/signin" });
          }
        })
        .catch((err) => {
          if (typeof err.username === "object") {
            setErrorLogin("Este nombre de usuario pertenece a otra cuenta");
          } else if (typeof err.password === "object") {
            setErrorPassword(
              "La contraseña debe tener al menos 8 caracteres y contener tanto números como letras"
            );
          } else {
            setErrorDoublePassword("Error del servidor");
          }
        });
  };

  return (
    <section className={`${styles.content} ${extraClass}`}>
      <img className={`${styles.logo} mb-16`} src={logoIcon} alt="Logo" />
      <h1
        className={`text text_type_h1 text_color_primary mb-20 ${styles.title}`}
      >
        󠀰Sign up
      </h1>
      <p
        className={`text text_type_medium-20 text_color_input mb-10 ${styles.subtitle}`}
      >
        󠀰Sign up to access Kittygram!
      </p>
      <FormContainer>
        <form className={styles.form}>
          <Input
            onChange={onChangeInput}
            name="username"
            type="text"
            id={1}
            placeholder="Sign up"
            error={errorLogin}
          />
          <Input
            onChange={onChangeInput}
            name="password"
            type="password"
            id={2}
            placeholder="Password"
            error={errorPassword}
          />
          <Input
            onChange={onChangeInput}
            name="password2"
            type="password"
            id={3}
            placeholder="Repeat the password"
            error={errorDoublePassword}
          />
          <p
            className={`text text_type_small text_color_input ${styles.agreement}`}
          >
            󠀰Al registrarte en nuestro sitio web, juras solemnemente publicar solo 
            gatos; no se permiten perros.
          </p>
          <ButtonForm text="Registrarse" onClick={handleSubmit} />
          <p className="text text_type_small text_color_input mt-5 mb-5">o</p>
        </form>
        <div className={styles.footer}>
          <NavLink
            to="/signin"
            className={`text text_type_medium-16 text_color_link ${styles.nav}`}
          >
            󠀰¿Ya tienes cuenta? Iniciar sesión
          </NavLink>
        </div>
      </FormContainer>
    </section>
  );
};
