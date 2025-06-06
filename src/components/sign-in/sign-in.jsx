import React from "react";
import { useHistory, NavLink } from "react-router-dom";

import { getUser, loginUser } from "../../utils/api";
import { UserContext } from "../../utils/context";

import logoIcon from "../../images/logo.svg";

import { FormContainer } from "../ui/form-container/form-container";
import { Input } from "../ui/input/input";
import { ButtonForm } from "../ui/button-form/button-form";

import styles from "./sign-in.module.css";

export const SignIn = ({ extraClass = "" }) => {
  const [userData, setUserData] = React.useState({});
  const [user, setUser] = React.useContext(UserContext);
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
    return true;
  };

  const handleSubmit = () => {
    errorLogin && setErrorLogin("");
    errorPassword && setErrorPassword("");

    checkValid() &&
      loginUser(userData.username, userData.password)
        .then((res) => {
          if (res && res.auth_token) {
            getUser().then((res) => {
              if (res && res.id) {
                setUser({ id: res.id });
                history.replace({ pathname: "/" });
              }
            });
          }
        })
        .catch((err) => {
          if (err.non_field_errors) {
            setErrorPassword("Nombre de usuario o contraseña incorrectos");
          } else {
            setErrorPassword("Error del servidor");
          }
        });
  };

  return (
    <section className={`${styles.content} ${extraClass}`}>
      <img className={`${styles.logo} mb-16`} src={logoIcon} alt="Logo" />
      <h1
        className={`text text_type_h1 text_color_primary mb-10 ${styles.title}`}
      >
        Iniciar sesión
      </h1>
      <p
        className={`text text_type_medium-20 text_color_input mb-20 ${styles.subtitle}`}
      >
        󠀰¡Inicia sesión para acceder a Kittygram!
      </p>
      <FormContainer>
        <form className={styles.form}>
          <Input
            name="username"
            type="text"
            id={1}
            placeholder="Username"
            onChange={onChangeInput}
            error={errorLogin}
          />
          <Input
            name="password"
            type="password"
            id={2}
            placeholder="Password"
            onChange={onChangeInput}
            error={errorPassword}
          />
          <ButtonForm
            extraClass={styles.btn}
            text="Iniciar sesión"
            onClick={handleSubmit}
          />
          <p className="text text_type_small text_color_input mt-5 mb-5">o</p>
        </form>
        <div className={styles.footer}>
          <NavLink
            to="/signup"
            className={`text text_type_medium-16 text_color_link ${styles.nav}`}
          >
            󠀰¿No tienes cuenta? Regístrate
          </NavLink>
        </div>
      </FormContainer>
    </section>
  );
};
